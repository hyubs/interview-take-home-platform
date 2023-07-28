export type Node = TextNode;

export interface TextNode {
  type: "text";
  value: NodeMarkup;
  nextID?: string;
}

export type NodeMarkup = string | Array<string | { variableID: string }>;
