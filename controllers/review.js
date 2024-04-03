import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const { bookId, rating, reviewText } = req.body;

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
    let query = {};
    if (review_id) {
      query = {
        _id: review_id,
      };
    }
    const reviews = await Review.find(query);
    res.send(reviews);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};
