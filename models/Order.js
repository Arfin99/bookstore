import mongoose from "mongoose";
import User from "./User.js";
import Book from "./Book.js";


const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  books: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Book,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  shippingAddress: {
    type: Object,
    required: true,
    properties: {
      fullName: {
        type: String,
        required: true,
      },
      addressLine: {
        type: String,
        required: true,
      },
    },
  },
  billingAddress: {
    type: Object,
    required: true,
    properties: {
        fullName: {
          type: String,
          required: true,
        },
        addressLine: {
          type: String,
          required: true,
        },
      },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  orderStatus: {
    type: String,
    enum: ["placed", "confirmed", "shipped", "delivered", "cancelled"],
    default: "placed",
  },
  totalPrice: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre("save", async function (next) {
  const order = this;
  let totalPrice = 0;

  for (const book of order.books) {
    const bookInfo = await Book.findById(book.bookId);
    totalPrice += bookInfo.price * book.quantity;
  }

  order.totalPrice = totalPrice;
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
