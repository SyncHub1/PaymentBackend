import mongoose, { Schema, Document } from "mongoose";

export interface ITeam extends Document {
  _id: string;
  teamName: string;
  leader: string;
  about: string;
  lookingFor: number;
  score: number;
  createdAt: Date;
  projects: string[];
}

const TeamSchema: Schema = new Schema<ITeam>(
  {
    teamName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    leader: {
      type: String,
      required: true,
      trim: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    lookingFor: {
      type: Number,
      required: true,
      min: 0,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    projects: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

TeamSchema.index({ score: -1 });

export default mongoose.model<ITeam>("Team", TeamSchema);
