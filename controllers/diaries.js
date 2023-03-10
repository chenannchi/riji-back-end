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

const show = async (req, res) => {
  try {
    const diary = await Diary.findById(req.params.id)
      .populate('author')
    res.status(200).json(diary)
  } catch (error) {
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const diary = await Diary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('author')
    res.status(200).json(diary)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteBlog = async (req, res) => {
  try {
    const diary = await Diary.findByIdAndDelete(req.params.id)
    // const profile = await Profile.findById(req.user.profile)
    // profile.blogs.remove({ _id: req.params.id })
    // await profile.save()
    res.status(200).json(diary)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteBlog as delete
}