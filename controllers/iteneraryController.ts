import { Response } from "express";
import { RequestWithUser } from "../types/req";
import { Itenerary } from "../models/itenerary";
import { IteneraryItem } from "../models/iteneraryItems";

export class IteneraryController {
  constructor() {}

  /**
   *
   * @param req -Request object to extract the new iteneray information
   * @param res
   */
  async CreateItenerary(req: RequestWithUser, res: Response) {
    const { title, description, sharedWith, iteneraryItems } = req.body;

    console.log("Creating itenerary with object", req.body);

    // if (iteneraryItems.length < 1) {
    //   return res.status(400).json({
    //     error: "Invalid payload",
    //     message: "iteneraryitems must contain at least one thing",
    //   });
    // }

    try {
      const userId = req.user?.id.toString();
      const newItenerary = new Itenerary({
        userId,
        title,
        description,
        sharedWith,
      });

      await newItenerary.save();

      const iteneraryId = newItenerary._id

      const bulkInsertOpts = iteneraryItems.map((item:Record<string,any>)=>({
        insertOne:{
          document:{
            iteneraryId,
            ...item
          }
        }
      }))

      await IteneraryItem.bulkWrite(bulkInsertOpts)

      return res.status(200).json({
        success: true,
        message: "Itenerary created successfully",
      });
    } catch (error) {
      console.error("Error creating itenerary");
      throw error;
    }
  }

}

export default new IteneraryController();
