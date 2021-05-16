import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import * as KeycloakConnect from 'keycloak-connect';
import { KEYCLOAK_INSTANCE } from '../constants';
import { Reflector } from '@nestjs/core';
import { KeycloakedRequest } from '../keycloaked-request';


declare module 'keycloak-connect' {
  interface GrantType {
    access_token?: KeycloakConnect.Token
    refresh_token?: string
    id_token?: string
    expires_in?: string
    token_type?: string
  }
}
/**
 * An authentication guard. Will return a 401 unauthorized when it is unable to
 * verify the JWT token or Bearer header is missing.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  logger = new Logger(AuthGuard.name);
  constructor(
    @Inject(KEYCLOAK_INSTANCE)
    private keycloak: KeycloakConnect.Keycloak,
    private reflector: Reflector
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: KeycloakedRequest<Request> = context.switchToHttp().getRequest();
    const isPublic = !!this.reflector.get<string>("public-path", context.getHandler());
    const roles = this.reflector.get<(string | string[])[]>("roles", context.getHandler());

    const jwt = this.extractJwt(request.headers);
    let grant: KeycloakConnect.Grant | undefined;
    
    // console.log("Headers : ", JSON.stringify(request.headers));
    // console.log("Body : ", JSON.stringify(request.body));
    // console.log("Session : ", request.session?.token);

    if (jwt) {
      try {
        // TODO: Remove below line when keycloak token validation issue is solved.
        return true;
        grant = await this.keycloak.grantManager.createGrant({
          "access_token": jwt
        });
      } catch (error) {
        if (!isPublic)
          throw new UnauthorizedException();
        this.logger.error(error);
      }
    } else if (request.session?.token) {
      try {
        grant = await this.keycloak.grantManager.createGrant(request.session.token);
      } catch (error) {
        if (!isPublic)
          throw new UnauthorizedException();
        this.logger.error(error);
      }
    } else if (isPublic === false) {
      throw new UnauthorizedException();
    }

    if (grant) {
      request.grant = (grant as any) as KeycloakConnect.GrantType;

      if (!grant.isExpired() && !request.session.authUser) {
        // Attach user info to the session
        const user = grant.access_token && await this.keycloak.grantManager.userInfo(grant.access_token);
        request.session.authUser = user;
      }

      request.user = request.session.authUser;

      if (roles && request.grant) {
        return roles.some(role => Array.isArray(role) ? role.every(innerRole => request.grant?.access_token?.hasRole(innerRole)) : request.grant?.access_token?.hasRole(role));
      }

      return true;
    }
    if (isPublic) {
      return true;
    }
    return false;
  }

  extractJwt(headers: Headers) {
    const auth = headers['authorization']?.split(' ');

    if (auth && auth[0] && auth[0].toLowerCase() === 'bearer') {
      return auth[1]
    }

    return null;
  }
}
// curl -X POST \
// -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4UkJWZmlCVkxtR1pHbXBfX0t3enlmdzBka0VqVW9VRi1iYVBEVy0zWElVIn0.eyJleHAiOjE1ODg2MDcxNjAsImlhdCI6MTU4ODYwNzEwMCwianRpIjoiNTgzNTJmNzYtZTMzYy00NjRkLTkxMTEtMmQxYTYxOTA2NTBlIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5NDAyL2F1dGgvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIzY2E3NWM3Yy05YmU4LTRlMmUtODUyMy04MzE3ZDY5NWRhYjMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJsaWZlLWFkbWluLXBhbmVsIiwic2Vzc2lvbl9zdGF0ZSI6Ijk4NGU4Nzc5LWYwOTctNDhkYS1iNTk2LWY4NGQ0M2RhNmFiYyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiTU9CSUxJTUFETSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QifQ.MUpQvsEcD1-TAroKkTooMz0bhG3llVsBtyR6acY39eAtIqBl1W0NrmfGnLPpA2uRn7rTsrP95wwHT-GRyV8sdEqqZSwqm7vaguqmiXDAdgIB8KiUq2m4c6lZKp4p4COtF2vGgHxF6zd0L49SQDRGi96jnbHQGDeHLWZE-IGqLX8qoTc9oJqntCFRjuwTQZjGmvYyrWAGHYtr6UawXZu4i7gXHAxAedMMaiinfbAvpnlkXKPtVkqJKxyHKJ72PhuVTRfB_SkpmOG4JlmMpjDs88YvEleOBgKl5Es2wUiRRxFxP_uC7A1WL7SPvpO000g0eEPupKYhqJgVzjBugw0Xuw' \
// -H 'Content-Type: application/json' \
// -d '{
//     "platform": "IOS",
//     "domainName": "string",
//     "userId": "string",
//     "companyName": "string",
//     "deviceToken": "string"
// }' \
// 'http://localhost:8080/api/v1/user'