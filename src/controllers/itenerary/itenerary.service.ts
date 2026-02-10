import { logger } from "../../lib/logger";
import { IItenerary } from "../../common/interface/models";
import { IteneraryRepository } from "../../repositories/itenerary.repositroy";

export class IteneraryService {
  private iteneraryRepository: IteneraryRepository;
  constructor(){
    this.iteneraryRepository = new IteneraryRepository();
  }

  async createItenerary(itenerary: Partial<IItenerary>) {
    try {
      
      const response = await this.iteneraryRepository.createItenerary(itenerary);
      return response;
    } catch (error) {
      logger.error("Error creating itenerary", error);
      throw error;
    }
  }
}