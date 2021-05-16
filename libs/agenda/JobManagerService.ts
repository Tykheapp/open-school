import { AgendaJob } from './AgendaJob';
import { AgendaJobSchedule } from './AgendaJobSchedule';


export abstract class JobManagerService {
  async jobList(): Promise<AgendaJob[]> {
    throw 'Not implemented';
  }

  async createJob(agendaJobDefine: AgendaJob): Promise<AgendaJob> {
    throw 'Not implemented';
  }

  async updateJob(agendaJobDefine: AgendaJob): Promise<AgendaJob> {
    throw 'Not implemented';
  }

  async hasJob(jobName: string): Promise<boolean> {
    throw 'Not implemented';
  }

  async deleteJob(jobName: string): Promise<AgendaJob> {
    throw 'Not implemented';
  }

  async scheduleOnce(
    agendaJobSchedule: AgendaJobSchedule
  ): Promise<AgendaJobSchedule> {
    throw 'Not implemented';
  }

  async scheduleEvery(
    agendaJobSchedule: AgendaJobSchedule
  ): Promise<AgendaJobSchedule> {
    throw 'Not implemented';
  }

  async scheduleNow(
    agendaJobSchedule: AgendaJobSchedule
  ): Promise<AgendaJobSchedule> {
    throw 'Not implemented';
  }

  async scheduleCancel(name: string): Promise<AgendaJobSchedule> {
    throw 'Not implemented';
  }
}
