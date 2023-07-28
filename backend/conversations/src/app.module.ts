import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "node:path";
import { ConversationModule } from "./conversation/conversation.module";
import { AnalyticsModule } from "./analytics/analytics.module";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../../..", "frontend"),
    }),
    ConversationModule,
    AnalyticsModule,
    EventEmitterModule.forRoot(),
  ],
})
export class AppModule {}
