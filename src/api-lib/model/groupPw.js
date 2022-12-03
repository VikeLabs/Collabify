import mongoose from 'mongoose';
import { Collections } from '../constants';

const GroupPasswordSchema = new mongoose.Schema({
  password: String,
  group: mongoose.Types.ObjectId,
});

export const GroupPasswords =
  mongoose.models.GroupPasswords ||
  mongoose.model(Collections.groupPasswords, GroupPasswordSchema);
