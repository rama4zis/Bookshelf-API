const {nanoid} = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {title, author, description, tags} = request.payload; // Basic Need Body

  const id = nanoid(16);
  const createdAt = new Date().toISOString(); //get Current Date
  const updatedAt = createdAt;

  const newBook = {
    title, author, description, tags, id, createdAt, updatedAt,
  };
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0; // Check if book is added

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Book success added',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Failed to add book',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = () => ({
  status: 'success',
  data: {
    books,
  },
});

const getBookByIdHandler = (request, h) => {
  const {id} = request.params;

  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Book not found',
  });
  response.code(500);
  return response;
};

const updateBookHandler = (request, h) => {
  const {id} = request.params;
  const {title, author, description, tags} = request.payload;
  const updatedAt = new Date().toISOString();

  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    book.title = title;
    book.author = author;
    book.description = description;
    book.tags = tags;
    book.updatedAt = updatedAt;

    const isSuccess = books.filter((b) => b.id === id)[0];

    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Book success updated',
        data: {
          bookId: id,
        },
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Error updating book',
    });
    response.code(500);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Book not found',
  });
  response.code(500);
  return response;
};

const deleteBookHandler = (request, h) => {
  const {id} = request.params;

  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    const index = books.findIndex((b) => b.id === id);
    books.splice(index, 1);

    const isSuccess = books.filter((b) => b.id === id).length === 0;

    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Book success deleted',
        data: {
          bookId: id,
        },
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Fail to delete book',
    });
    response.code(500);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Book not found',
  });
  response.code(500);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
};
