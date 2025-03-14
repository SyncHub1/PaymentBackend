import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  userId: string;
  orderId: string;
  paymentId?: string;
  amount: number;
  currency: string;
  status: "pending" | "success" | "failed" | "refunded";
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema<ITransaction>(
  {
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, enum: ["pending", "success", "failed", "refunded"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
