import { Request } from 'express';

export interface IRequest extends Request {
  user: { token: string };
}
