import { Profile } from "../models/profile.js"
import { Diarybook } from "../models/diarybook.js"

const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    const diarybook = await Diarybook.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { diarybooks: diarybook } },
      { new: true }
    )
    diarybook.owner = profile
    res.status(201).json(diarybook)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const index = async (req, res) => {
  try {
    const diarybooks = await Diarybook.find({})
      .populate('owner')
      .sort({ createdAt: 'desc' })
    res.status(200).json(diarybooks)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index
}

export { }