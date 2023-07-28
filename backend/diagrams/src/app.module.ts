import { Module } from "@nestjs/common";

import { DiagramModule } from "./diagram/diagram.module";

@Module({
  imports: [DiagramModule],
})
export class AppModule {}
