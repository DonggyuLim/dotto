import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { Admin_Balance } from 'src/jobs/admin_balance';
import { Admin_Counter } from 'src/jobs/admin_counter';
import { Admin_Draw } from 'src/jobs/admin_draw';
import { Admin_Lock } from 'src/jobs/admin_lock';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';

@Module({
  imports: [ScheduleModule.forRoot(), Admin_Lock],
  providers: [AdminResolver, AdminService, Admin_Lock],
})
export class AdminModule {}
