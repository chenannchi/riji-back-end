import { Profile } from "../models/profile.js"
import { Diary } from "../models/diary.js"

const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const diary = await Diary.create(req.body)
    // const profile = await Profile.findByIdAndUpdate(
    //   req.user.profile,
    //   { $push: { blogs: blog } },
    //   { new: true }
    // )
    // blog.author = profile
    res.status(201).json(diary)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const index = async (req, res) => {
  try {
    const diaries = await Diary.find({})
      .populate('author')
      .sort({ createdAt: 'desc' })
    res.status(200).json(diaries)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index,
}
