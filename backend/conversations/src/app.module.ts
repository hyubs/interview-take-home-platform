import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "node:path";
import { ConversationModule } from "./conversation/conversation.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../../..", "frontend"),
    }),
    ConversationModule,
  ],
})
export class AppModule {}
