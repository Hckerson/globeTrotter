import { logger } from "../../lib/logger";
import { IItenerary } from "../../common/interface/models";
import { IteneraryRepository } from "../../repositories/itenerary.repositroy";
import { Types } from "mongoose";

export class IteneraryService {
  private iteneraryRepository: IteneraryRepository;
  constructor(){
    this.iteneraryRepository = new IteneraryRepository();
  }

  async createItenerary(itenerary: Partial<IItenerary>) {
    const {iteneraryItems, ...rest} = itenerary;
    try {
      const payload = {
        ...rest,
        iteneraryItems: iteneraryItems?.map((item) => {
          return {
            ...item,
            _id: new Types.ObjectId(),
          };
        }),
      };
      const response = await this.iteneraryRepository.createItenerary(itenerary);
      return response;
    } catch (error) {
      logger.error("Error creating itenerary", error);
      throw error;
    }
  }
}