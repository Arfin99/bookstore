import Book from "../models/Book.js";

export const getBook = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const addBook = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const removeBook = async (req, res) => {
  try {
    const { book_id = "" } = req.body;
    let book_id_collection = book_id.split(",");

    let book = await Book.updateMany(
      {
        _id: { $in: [...book_id_collection] },
      },
      {
        isDeleted: true,
      }
    );

    if (!book) {
      return res.status(404).send("Book not found");
    }

    res.send(book);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const updateBook = async (req, res) => {
  try {
    const { book_id } = req.params;
    const updateObj = { ...req.body };

    if (
      Object.keys(updateObj).includes("_id") ||
      Object.keys(updateObj).includes("isDeleted") ||
      Object.keys(updateObj).includes("sequenceNumber")
    ) {
      return res.status(400).send("Bad Request");
    }

    const updatedBook = await Book.findByIdAndUpdate(book_id, updateObj);

    if (!updatedBook) {
      return res.status(404).send("Book not found");
    }

    res.send(updatedBook);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const searchBooks = async (req, res) => {
  try {
    const { search } = req.query;
    const query = {
      $or: [
        { title: { $regex: new RegExp(search, "i") } },
        { author: { $regex: new RegExp(search, "i") } },
        { genre: search },
      ],
    };

    const books = await Book.find(query);
    res.send(books);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};
