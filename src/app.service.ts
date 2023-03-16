import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMockMsg(): string {
    return 'Main page';
  }
}
