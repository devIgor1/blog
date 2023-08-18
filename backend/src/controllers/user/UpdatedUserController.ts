import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

class UpdatedUserController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;
    const user_id = request.user_id;

    const updatedUserService = new UpdateUserService();

    const user = await updatedUserService.execute({ user_id, name });

    return response.json(user);
  }
}

export { UpdatedUserController };
