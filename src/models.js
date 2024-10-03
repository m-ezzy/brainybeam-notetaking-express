import { Schema, model } from "mongoose"

export const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
});

export const User = model('User', userSchema)

export const noteSchema = Schema({
	title: {
		type: String,
		// required: true,
	},
	content: { //body
		type: String,
		// required: true,
		minlength: 0,
		// maxlength: 1000,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	updated_at: {
		type: Date,
		default: Date.now(),
	},
});

export const Note = model("Note", noteSchema)
