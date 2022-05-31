import { Injectable } from '@nestjs/common';
import { Admin_Lock } from 'src/jobs/admin_lock';

@Injectable()
export class AdminService {
  postAdmin_Lock() {
    const admin = new Admin_Lock();
    return admin.handleCron();
  }
}
