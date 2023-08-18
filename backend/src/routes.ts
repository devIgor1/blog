import { Router, Request, Response } from "express"
import { CreateUserController } from "./controllers/user/CreateUserController"
import { AuthUserController } from "./controllers/user/AuthUserController"
import { DetailUserController } from "./controllers/user/DetailUserController"
import { isAuthenticated } from "./middlewares/isAuthenticated"
import { UpdatedUserController } from "./controllers/user/UpdatedUserController"

const router = Router()

router.post("/register", new CreateUserController().handle)

router.post("/login", new AuthUserController().handle)

router.get("/me", isAuthenticated, new DetailUserController().handle)

router.put("/user/details", isAuthenticated, new UpdatedUserController().handle)

export { router }
