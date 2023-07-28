export type Reply = TextReply | URLReply;

export interface TextReply {
  type: "text";
  text: string;
}

export interface URLReply {
  type: "url";
  url: string;
}
