import { Module } from "@nestjs/common";

import { DiagramController } from "./diagram.controller";
import { DiagramService } from "./diagram.service";
import { DiagramRepository } from "./diagram.repository";

@Module({
  controllers: [DiagramController],
  providers: [DiagramService, DiagramRepository],
})
export class DiagramModule {}
