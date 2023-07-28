import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { MessageSentEvent } from "@resources/events";
import { AnalyticsRepository } from "../analytics.repository";

@Injectable()
export class MessageSentListener {
  constructor(private readonly analyticsRepository: AnalyticsRepository) {}

  /**
   * Listens for message.sent events and saves the message in the Analytics repository.
   *
   * @param event MessageSentEvent
   */
  @OnEvent("message.sent")
  handleMessageSentEvent(event: MessageSentEvent) {
    this.analyticsRepository.saveMessage(event.message);
  }
}
