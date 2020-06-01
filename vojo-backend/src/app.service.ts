import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Vojo API is up and running! Have fun!!'
  }
}
