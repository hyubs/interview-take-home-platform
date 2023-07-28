import { Module } from "@nestjs/common";
import { ConversationController } from "./conversation.controller";
import { ConversationService } from "./conversation.service";
import { DiagramAPIModule } from "../diagram-api/diagram-api.module";
import { NodeProcessor } from "./libs/node-processor.lib";
import { ConversationRepository } from "./conversation.repository";

@Module({
  controllers: [ConversationController],
  providers: [ConversationRepository, ConversationService, NodeProcessor],
  imports: [DiagramAPIModule],
})
export class ConversationModule {}
