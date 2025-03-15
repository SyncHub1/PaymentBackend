import { Request, Response } from "express";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../services/paymentService";
import Transaction from "../models/transaction";

export const createOrder = async (req: Request, res: Response) => {
  const { amount, currency, email, contact } = req.body;
  try {
    const order = await createRazorpayOrder(
      req.user?.id,
      amount,
      currency,
      email,
      contact
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const { orderId, paymentId, signature } = req.body;
  try {
    const result = await verifyRazorpayPayment(orderId, paymentId, signature);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: "Payment verification failed", error });
  }
};
