import mongoose from 'mongoose'

const Schema = mongoose.Schema

const diarySchema = new Schema(
  {
    title: {
      type: String,
      default: "Untitled Diary"
    },
    content: {
      type: String,
      required: true,
    },
    music:{
      type: String,
    },
    author: { type: Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const Diary = mongoose.model('Diary', diarySchema)

export { Diary }