import mongoose from 'mongoose';
import { Collections } from '../constants';

const GroupPwSchema = new mongoose.Schema({
  password: String,
  group: String,
});

export const GroupPw =
  mongoose.models.groupPws ||
  mongoose.model(Collections.groupPw, GroupPwSchema);
