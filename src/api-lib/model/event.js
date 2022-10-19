import mongoose from 'mongoose'
import { Collections } from '../constants'

const EventSchema = new mongoose.Schema({
  time: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String}
})

export const Event = mongoose.models.events || mongoose.model(Collections.events, EventSchema)