import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const createUserService = new CreateUserService();

    const { name, email, password } = request.body;

    const user = await createUserService.execute({ name, email, password });

    return response.json(user);
  }
}

export { CreateUserController };
