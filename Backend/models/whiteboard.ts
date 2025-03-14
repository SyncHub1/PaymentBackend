import mongoose, { Schema, Document } from "mongoose";

export interface IWhiteboard extends Document {
  teamId: string;
  content: string;
  createdAt: Date;
}

const WhiteboardSchema: Schema = new Schema<IWhiteboard>(
  {
    teamId: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IWhiteboard>("Whiteboard", WhiteboardSchema);
