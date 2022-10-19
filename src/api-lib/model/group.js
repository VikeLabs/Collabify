import mongoose from 'mongoose'
import { Collections } from '../constants'

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  description: {
    type: String
  },
  icon: {type: String},
  background: {type: String},
  // Array of event ids
  events: {type: Array},
  availabilities: {type: Array}
})

export const Group = mongoose.models.groups || mongoose.model(Collections.groups, GroupSchema)