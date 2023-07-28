import { Conversation, Diagram, Node } from "@resources/interface";
import { Injectable } from "@nestjs/common";
import { v4 as uuidV4 } from "uuid";

/**
 * A simple in-memory database using an array to represent the repository of conversations.
 *
 * Having a repository class keeps the business logic (found in service classes) separate from
 * the database interface. By doing so, we can implement business logic without worrying about
 * the technical details of database implementation.
 */
@Injectable()
export class ConversationRepository {
  private readonly conversations: Conversation[] = [];

  /**
   * Creates a conversation. Auto-generates an ID for the record.
   * @returns Promise<Conversation>
   */
  async create(): Promise<Conversation> {
    return new Promise((resolve) => {
      // Simulating an async call with latency before responding
      setTimeout(() => {
        const conversation: Conversation = {
          id: uuidV4(),
        };

        this.conversations.push(conversation);

        resolve(conversation);
      }, 50);
    });
  }
}
