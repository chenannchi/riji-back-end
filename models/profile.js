import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  diarybooks: [{ type: Schema.Types.ObjectId, ref: 'Diarybook' }]
}, {
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
