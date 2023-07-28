import { Injectable } from "@nestjs/common";
import type { Diagram, Diagrams } from "@resources/interface";
import diagramJSON from "@resources/data/diagram.json";

/**
 * A repository class to hold the database interface implementation for diagrams. In case we'd want
 * to migrate from a JSON file to an actual database, we do not need to modify diagram.service. We
 * only need to modify this class.
 */
@Injectable()
export class DiagramRepository {
  private readonly diagrams: Diagrams;

  constructor() {
    this.diagrams = diagramJSON as unknown as Diagrams;
  }

  /**
   * Get a diagram by ID from the JSON database.
   *
   * @param id string
   * @returns Promise<Diagram | null>
   */
  async findOne(id: string): Promise<Diagram | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.diagrams[id] || null);
      }, 50);
    });
  }
}
