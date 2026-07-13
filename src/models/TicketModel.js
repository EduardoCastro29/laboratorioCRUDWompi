import mongoose, { Schema, model } from "mongoose";

const ticketSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    quantity: {
      type: Number,
    },
    purchaseDate: {
      type: Date,
    },
    total: {
      type: Number,
    },
    paymentStatus: {
      type: String,
    },
    transactionId: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);
export default model("Ticket", ticketSchema);
