import { Module } from "@nestjs/common";
import { DiagramAPIService } from "./diagram-api.service";

@Module({
  providers: [DiagramAPIService],
  exports: [DiagramAPIService],
})
export class DiagramAPIModule {}
