import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { Conversation, Diagram } from "@resources/interface";
import { DiagramAPIService } from "@/diagram-api/diagram-api.service";
import { SendMesssageRequestDTO } from "./dtos/send-message-request.dto";
import { SendMessageResponseDTO } from "./dtos/send-message-response.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MessageSentEvent } from "@resources/events";

// Renamed route path from "conversation" to "conversations" to follow REST API naming standards.
@Controller("conversations")
export class ConversationController {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly diagramAPIService: DiagramAPIService,
    private eventEmitter: EventEmitter2,
  ) {}

  /**
   * Create a conversation.
   * @returns Promise<Conversation>
   */
  @Post()
  async create(): Promise<Conversation> {
    return this.conversationService.create();
  }

  /**
   * Renamed to sendMessage(). Formerly, this was the interact() method.
   *
   * Changed the route signature from /conversation/:diagramID to
   * /conversations/:conversationID/messages. Diagram and conversation are 2 different domains.
   * It is better if we keep them separate so that both domains are not tightly coupled.
   * A new Diagrams API Service (./backend/diagrams) has been created and runs on port 4000.
   * The Conversations API Service interacts with it to retrieve the diagram.
   *
   * The route now has "/messages" to show the relationship that a conversation may contain
   * multiple messages.
   *
   * @param body SendMesssageRequestDTO
   * @returns Promise<SendMessageResponseDTO>
   */
  @Post("/:conversationID/messages")
  async sendMessage(
    @Body() body: SendMesssageRequestDTO,
  ): Promise<SendMessageResponseDTO> {
    /**
     * Emit an event containing the message. The event is consumed by a listener in the
     * analytics module and is processed separately. This allows the API to continue with the
     * rest of the main flow, thereby making the response time faster for the client.
     */
    const event: MessageSentEvent = { message: body.message };
    this.eventEmitter.emit("message.sent", event);

    /**
     * This is the main flow of this endpoint. It fetches the diagram, processes its contents to
     * get the replies, and responds to the client.
     *
     * All of the detailed logic are separated in the service classes.
     */
    const diagram = await this.diagramAPIService.getDiagram(body.diagramID);

    if (!diagram) {
      throw new HttpException(
        "Diagram not found.",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const replies = this.conversationService.getReplies(diagram as Diagram);
    return {
      reply: replies,
    };
  }
}
