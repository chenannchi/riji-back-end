import { Profile } from "../models/profile.js"
import { Diary } from "../models/diary.js"
import { Diarybook } from "../models/diarybook.js"

const create = async (req, res) => {
  try {
    req.body.owner = [req.user.profile]
    // req.body.owner = req.user.profile
    const diarybook = await Diarybook.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { diarybooks: diarybook } },
      { new: true }
    )
    // diarybook.owner = profile
    res.status(201).json(diarybook)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const index = async (req, res) => {
  try {
    const diarybooks = await Diarybook.find({})
      // .populate('owner')
      .sort({ createdAt: 'desc' })
    res.status(200).json(diarybooks)
  } catch (error) {
    res.status(500).json(error)
  }
}

const show = async (req, res) => {
  try {
    const diarybook = await Diarybook.findById(req.params.id)
      .populate('owner')
      .populate('diaries')
    res.status(200).json(diarybook)
  } catch (error) {
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const diarybook = await Diarybook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('owner')
    res.status(200).json(diarybook)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteDiarybook = async (req, res) => {
  try {
    const diarybook = await Diarybook.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.diarybooks.remove({ _id: req.params.id })
    await profile.save()
    res.status(200).json(diarybook)
  } catch (error) {
    res.status(500).json(error)
  }
}

const addDiaryToDiarybook = async (req, res) => {
  try {
    const diary = await Diary.findById(req.params.diaryId)
    const diarybook = await Diarybook.findByIdAndUpdate(
      req.params.id,
      { $push: { diaries: diary } },
      { new: true }
    )
    res.status(201).json(diarybook)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteDiaryFromDiarybook = async (req, res) => {
  try {
    // const diarybook = await Diarybook.findByIdAndDelete(req.params.id)
    const diarybook = await Diarybook.findById(req.params.id)
    diarybook.diaries.remove({ _id: req.params.diaryId })
    await diarybook.save()
    res.status(200).json(diarybook)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteDiarybook as delete,
  addDiaryToDiarybook,
  deleteDiaryFromDiarybook
}