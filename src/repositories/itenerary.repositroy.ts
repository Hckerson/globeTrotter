import { logger } from "../lib/logger";
import { Itenerary } from "../models/itenerary";
import { IItenerary } from "../common/interface/models";

export class IteneraryRepository {
  private itenerary: typeof Itenerary;
  constructor() {
    this.itenerary = Itenerary;
  }

  async createItenerary(itenerary: Partial<IItenerary>) {
    try {
      const response = await this.itenerary.create(itenerary);
      return response;
    } catch (error) {
      logger.error("Error creating itenerary", error);
      throw error;
    }
  }
}
