import { Router } from 'express'
import { signup, login, note } from './controllers.js'
import { authMiddleware } from './middlerwares.js'

let allRouter = Router()
let authRouter = Router()
let notesRouter = Router()

authRouter
	.post('/signup', signup)
	.post('/login', login)

notesRouter
	.get("/", note.list)
	.get("/:id", note.detail)
	.post("/", note.create)
	.put("/:id", note.update)
	.delete("/:id", note.delete)

allRouter.use("/auth", authRouter)
allRouter.use("/notes", authMiddleware, notesRouter)

export default allRouter
