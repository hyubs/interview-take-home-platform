import { Injectable } from "@nestjs/common";
import type { Diagram } from "@resources/interface";
import { DiagramRepository } from "./diagram.repository";

@Injectable()
export class DiagramService {
  constructor(private readonly diagramRepository: DiagramRepository) {}

  /**
   * Get a diagram by ID.
   *
   * @param diagramID string
   * @returns Promise<Diagram | null>
   */
  async getByID(diagramID: string): Promise<Diagram | null> {
    return this.diagramRepository.findOne(diagramID);
  }
}
