import mongoose from "mongoose";
import User from "./User.js";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    indexes: [{ title: 1 }, { author: 1 }, { genre: 1 }],
  }
);

bookSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

bookSchema.pre("findOne", function () {
  this.where({ isDeleted: false });
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
