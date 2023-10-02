import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { EventsModule } from './events/events.module'
import { EventsGateway } from './events/events.gateway'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EventsModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
