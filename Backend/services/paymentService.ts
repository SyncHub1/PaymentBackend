import Razorpay from "razorpay";
import crypto from "crypto";
import Transaction from "../models/transaction";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

// Create an order
export const createRazorpayOrder = async (userId: string, amount: number, currency: string, email: string, contact: string) => {
  const existingOrder = await Transaction.findOne({ userId, amount, status: "pending" });
  if (existingOrder) return { orderId: existingOrder.orderId, message: "Using existing pending order" };

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency,
    receipt: `receipt_${Date.now()}`,
  });

  await Transaction.create({
    userId,
    orderId: order.id,
    amount,
    currency,
    status: "pending",
    email,
    contact,
  });

  return order;
};

// Verify Payment
export const verifyRazorpayPayment = async (orderId: string, paymentId: string, signature: string) => {
  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
    .update(orderId + "|" + paymentId)
    .digest("hex");

  if (expectedSignature !== signature) {
    await Transaction.findOneAndUpdate({ orderId }, { status: "failed" });
    throw new Error("Invalid signature, possible fraud attempt");
  }

  await Transaction.findOneAndUpdate({ orderId }, { status: "success", paymentId });
  return { message: "Payment verified successfully" };
};
