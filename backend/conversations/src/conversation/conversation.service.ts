import { Conversation, Diagram, Node } from "@resources/interface";
import { Injectable, Logger } from "@nestjs/common";
import { Reply } from "./interfaces/reply.interface";
import { NodeProcessor } from "./libs/node-processor.lib";
import { ConversationRepository } from "./conversation.repository";

@Injectable()
export class ConversationService {
  private readonly logger = new Logger(ConversationService.name);

  constructor(
    private readonly nodeProcessor: NodeProcessor,
    private readonly conversationRepository: ConversationRepository,
  ) {}

  /**
   * Create a conversation.
   *
   * @returns Promise<Conversation>
   */
  async create(): Promise<Conversation> {
    return this.conversationRepository.create();
  }

  /**
   * Parse a diagram and get a collection of formatted replies.
   * @param diagram Diagram
   * @returns Reply[]
   */
  getReplies(diagram: Diagram): Reply[] {
    const { variables, startNodeID, nodes } = diagram;

    let nextID: string | null = startNodeID;
    const replies = [];

    while (nextID) {
      const node: Node = nodes[nextID];

      switch (node.type) {
        case "text":
          replies.push(this.nodeProcessor.text(node, variables));
          break;
        default:
          this.logger.warn(`
            Node type '${node.type}' is not yet supported.
            Skipped preparing a reply for this node.
          `);
      }

      nextID = node.nextID || null;
    }

    return replies;
  }
}
