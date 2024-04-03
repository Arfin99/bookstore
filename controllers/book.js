import Book from "../models/Book.js";

export const addBook = async (req, res) => {
  const { title, author, genre, publicationDate, price } = req.body;
  const { _id } = req.user;
  let book = new Book({
    title,
    author,
    genre,
    publicationDate,
    price,
    addedBy: _id,
  });
  await book.save();

  res.send(book);
};
