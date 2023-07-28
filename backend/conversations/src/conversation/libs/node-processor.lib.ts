import { Node } from "@resources/interface";
import { TextReply } from "../interfaces/reply.interface";
import { Injectable } from "@nestjs/common";

/**
 * This class contains the logic how different Node types should be parsed in order
 * to return a reply. This was separated from the conversation.service.ts to make
 * it easy to support new Node types. We can also make changes to how each Node type
 * is processed without affecting the general Conversation logic.
 */
@Injectable()
export class NodeProcessor {
  /**
   * Process a text node and return a reply.
   *
   * @param node Node
   * @param variables Record<string, string>
   * @returns TextReply
   */
  text(node: Node, variables: Record<string, string>): TextReply {
    const { value, type } = node;
    const text =
      typeof value === "string"
        ? value
        : this.textArrayToString(value, variables);

    return { type, text };
  }

  /**
   * Converts a text array into a string. If the array element contains variables, it will do a
   * lookup from a record and retrieve the string value. Outputs a concatenated string of all
   * values.
   *
   * @param value Array<string | { variableID: string }>
   * @param variables Record<string, string>
   * @returns string
   */
  private textArrayToString(
    value: Array<string | { variableID: string }>,
    variables: Record<string, string>,
  ): string {
    return value
      .map((val) => {
        return typeof val === "string" ? val : variables[val.variableID];
      })
      .join("");
  }
}
