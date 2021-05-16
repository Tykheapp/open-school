import { Module } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { JobManagerService } from './JobManagerService';

@Module({
  providers: [
    {
      provide: JobManagerService,
      useClass: AgendaService,
    },
  ],
  exports: [JobManagerService],
})
export class AgendaModule {}
