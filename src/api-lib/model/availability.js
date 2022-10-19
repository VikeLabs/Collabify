import mongoose from 'mongoose'
import { Collections } from '../constants'

const AvailabilitySchema = new mongoose.Schema({
  week: {type: Number, required: true}, // The number of week it is in the year
  times: {type: Array, required: true},
  name: {type: String, required: true},
  number: {type: String, required: true}
})

export const Availability = mongoose.models.availabilities || mongoose.model(Collections.availabilities, AvailabilitySchema)