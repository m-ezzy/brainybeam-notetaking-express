import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User, Note } from './models.js'

export const signup = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, email, password: hashedPassword })
    await user.save();
    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(200).json({ token, userId: user._id })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const note = {}

note.list = async (req, res, next) => {
	await Note.find()
		.then((notes) => {
			return res.status(200).json({ notes });
		})
		.catch((err) => {
			return res.status(500).json({ err });
		})
}
note.detail = (req, res, next) => {
	Note.find({ _id: req.body.note_id })
		.then((note) => {
			return res.status(200).json({ note })
		})
		.catch((err) => {
			return res.status(500).json({ err })
		})
}
note.create = async (req, res, next) => {
	const note = await Note.create(req.body)
	return res.status(200).json({ note_id: note._id })
}
note.update = async (req, res, next) => {
	const { id } = req.params

	const note = await Note.findOne({ _id: id })

	note.title = req.body.updatedNote.title
	note.content = req.body.updatedNote.content

	await note.save()

	return res.status(200).json({ status: true })
}
note.delete = async (req, res, next) => {
	await Note.deleteOne({ _id: req.body.note_id })
	return res.status(200).json({ status: true })
}
