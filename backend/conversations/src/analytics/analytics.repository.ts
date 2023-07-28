import { Injectable } from "@nestjs/common";
import { appendFile } from "node:fs";

const ANALYTICS_FILE_NAME = "./analytics.tmp.txt";

/**
 * The Analytics repository. The database is represented by a local file. New messages are
 * appended to the file.
 */
@Injectable()
export class AnalyticsRepository {
  async saveMessage(message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      appendFile(
        ANALYTICS_FILE_NAME,
        `${message}\n`,
        { encoding: "utf-8" },
        (err) => (err ? reject(err) : resolve()),
      );
    });
  }
}
