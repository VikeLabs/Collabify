import mongoose from 'mongoose';
import { Collections } from '../constants';

const GroupPwSchema = new mongoose.Schema({
  password: String,
  groupId: mongoose.ObjectId,
});

export const GroupPw =
  mongoose.models.groupPw || mongoose.model(Collections.groupPw, GroupPwSchema);
