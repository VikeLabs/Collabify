import mongoose from 'mongoose';
import { Collections } from '../constants';

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  icon: { type: String },
  // Calendar slot times
  calendarMinTime: { type: String },
  calendarMaxTime: { type: String },
  // Array of event ids
  events: { type: Array },
  // Array of availability ids
  availabilities: { type: Array },
});

export const Group =
  mongoose.models.groups || mongoose.model(Collections.groups, GroupSchema);
