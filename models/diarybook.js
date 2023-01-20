import mongoose from 'mongoose'

const Schema = mongoose.Schema

const diarybookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String
    },
    diaries: [{
      type: Schema.Types.ObjectId, ref: 'Diary'
    }],
    owner: [{ type: Schema.Types.ObjectId, ref: 'Profile' }]
  },
  { timestamps: true }
)

const Diarybook = mongoose.model('Blog', blogSchema)

export { Blog }