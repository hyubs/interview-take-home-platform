import { Module } from "@nestjs/common";
import { MessageSentListener } from "./listeners/message-sent.listener";
import { AnalyticsRepository } from "./analytics.repository";

@Module({
  providers: [AnalyticsRepository, MessageSentListener],
})
export class AnalyticsModule {}
