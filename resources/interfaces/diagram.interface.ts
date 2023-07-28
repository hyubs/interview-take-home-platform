import type { Node } from "./node.interface";

export interface Diagram {
  variables: Record<string, string>;
  startNodeID: string;
  nodes: Record<string, Node>;
}

export type Diagrams = Record<string, Diagram>;
