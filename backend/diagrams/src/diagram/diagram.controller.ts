import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { DiagramService } from "./diagram.service";
import type { Diagram } from "@resources/interface";

@Controller("diagrams")
export class DiagramController {
  constructor(private readonly diagramService: DiagramService) {}

  /**
   * Retieves a diagram using its ID.
   * @param diagramID string
   * @returns Promise<Diagram>
   */
  @Get(":diagramID")
  async get(@Param("diagramID") diagramID: string): Promise<Diagram> {
    const diagram = await this.diagramService.getByID(diagramID);

    if (!diagram) {
      throw new HttpException("Diagram not found.", HttpStatus.NOT_FOUND);
    }

    return diagram;
  }
}
