import Book from "../models/Book.js";
import Review from "../models/Review.js";
import User from "../models/User.js";

export const addReview = async (req, res) => {
  try {
    const { bookId, rating, reviewText } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).send("Rating must be between 1 to 5");
    }

    const review = new Review({
      userId: req.user._id,
      bookId,
      rating,
      reviewText,
    });

    await review.save();

    res.json({ message: "Review added successfully", reviewId: review._id });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const getReviewDetails = async (req, res) => {
  try {
    const { review_id } = req.query;

    const pipeline = [
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $unwind: "$user",
      },
      {
        $match: {
          ...(review_id && { _id: review_id }),
        },
      },
      {
        $project: {
          rating: 1,
          reviewText: 1,
          userId: 1,
          "book._id": 1,
          "book.title": 1,
          "book.author": 1,
          "book.genre": 1,
          "book.publicationDate": 1,
          "user.name": 1,
          "user.email": 1,
        },
      },
    ];

    const reviews = await Review.aggregate(pipeline);
    if (reviews.length > 0) {
      res.send(reviews);
    } else {
      res.status(404).send({ message: "Review not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
};
