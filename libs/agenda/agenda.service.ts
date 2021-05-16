import { Injectable } from '@nestjs/common';
import { JobManagerService } from 'core/jobmanager.service';
import { AgendaJob, AgendaJobSchedule } from 'core/agenda';
import requestPromise = require('request-promise');
import { JOB_MANAGER_API_URL } from 'app.module';

@Injectable()
export class AgendaService implements JobManagerService {
  // constructor() {}

  async jobList(): Promise<AgendaJob[]> {
    return await requestPromise.get(`${JOB_MANAGER_API_URL}/job`);
  }

  async createJob(agendaJobDefine: AgendaJob): Promise<AgendaJob> {
    return await requestPromise.post(`${JOB_MANAGER_API_URL}/job`, {
      body: agendaJobDefine,
      json: true,
    });
  }

  async hasJob(jobName: string) {
    return await requestPromise.get(`${JOB_MANAGER_API_URL}/job`).then((resp) => {
      const jobs: AgendaJob[] | undefined = JSON.parse(resp);
      return !!jobs?.some((job) => job.name === jobName)
    });
  }

  async updateJob(agendaJobDefine: AgendaJob): Promise<AgendaJob> {
    return await requestPromise.put(
      `${JOB_MANAGER_API_URL}/job/${agendaJobDefine.name}`,
      {
        body: agendaJobDefine,
        json: true,
      },
    );
  }

  async deleteJob(jobName: string): Promise<AgendaJob> {
    return await requestPromise.del(`${JOB_MANAGER_API_URL}/job/${jobName}`);
  }

  async scheduleOnce(
    agendaJobSchedule: AgendaJobSchedule,
  ): Promise<AgendaJobSchedule> {
    return await requestPromise.post(`${JOB_MANAGER_API_URL}/job/once`, {
      body: agendaJobSchedule,
      json: true,
    });
  }

  async scheduleEvery(
    agendaJobSchedule: AgendaJobSchedule,
  ): Promise<AgendaJobSchedule> {
    return await requestPromise.post(`${JOB_MANAGER_API_URL}/job/every`, {
      body: agendaJobSchedule,
      json: true,
    });
  }

  async scheduleNow(
    agendaJobSchedule: AgendaJobSchedule,
  ): Promise<AgendaJobSchedule> {
    return await requestPromise.post(`${JOB_MANAGER_API_URL}/job/now`, {
      body: agendaJobSchedule,
      json: true,
    });
  }

  async scheduleCancel(name: string): Promise<AgendaJobSchedule> {
    return await requestPromise.post(`${JOB_MANAGER_API_URL}/job/cancel`, {
      body: { name },
      json: true,
    });
  }
}
