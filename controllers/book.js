import Book from "../models/Book.js";

export const getBook = async (req, res) => {

  let book = await Book.find({isDeleted : 0});

  res.send(book);
};

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

export const removeBook = async (req, res) => {
  const { book_id } = req.body;
  let book_id_collection = book_id.split(",");

  let removeBook = await Book.updateMany(
    {
      _id: { $in: [...book_id_collection] },
    },
    {
      isDeleted: true,
    }
  );

  res.send(removeBook);
};
