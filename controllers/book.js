import Book from "../models/Book.js";

export const getBook = async (req, res) => {
  const { page, limit = 10, sort_order = 1 } = req.query;
  
  let paginationOption = {};
  let meta = {};

  const totalDocuments = await Book.countDocuments({ isDeleted: false });
  meta.totalDocuments = totalDocuments;

  if (page && limit) {
    paginationOption = {
      skip: (page - 1) * limit,
      limit,
    };

    meta.totalPages = Math.ceil(totalDocuments / limit);
  }

  let book = await Book.find({}, { isDeleted: 0 }, paginationOption).sort({
    sequenceNumber: sort_order == -1 ? -1 : 1,
  });

  let result = {
    book,
    meta,
  };

  res.send(result);
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
