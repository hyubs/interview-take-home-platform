import { Injectable } from "@nestjs/common";
import { Diagram } from "@resources/interface";
import Axios, { AxiosResponse } from "axios";

const DIAGRAM_API_BASE_URL = "http://localhost:4000";

/**
 * This is the class that directly interacts with the Diagram API. By separating this, we can
 * quickly apply changes without affecting conversation.service if ever Diagram API changes.
 */
@Injectable()
export class DiagramAPIService {
  private readonly axios;
  constructor() {
    this.axios = Axios.create({
      baseURL: DIAGRAM_API_BASE_URL,
    });
  }

  async getDiagram(diagramID: string): Promise<Diagram | null> {
    const response = await this.axios.get<undefined, AxiosResponse<Diagram>>(
      `/diagrams/${encodeURIComponent(diagramID)}`,
      {
        validateStatus: (status) => status < 500,
      },
    );

    if (response?.status === 404) {
      return null;
    }

    return response.data;
  }
}
