const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload; // Basic Need Body

  const id = nanoid(16);
  const createdAt = new Date().toISOString(); //get Current Date
  const updatedAt = createdAt;

  // check name body
  if (name === undefined || name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
    return response;
  }

  // if read page is larger than page count
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
    return response;
  }

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    createdAt, updatedAt,
  };
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0; // Check if book is added

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  }

};

const getAllBooksHandler = () => ({
  status: 'success',
  data: {
    books,
  },
});

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }


};

const updateBookHandler = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  // check name body
  if (name === undefined || name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
    return response;
  }

  // if read page is larger than page count
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
    return response;
  }

  const book = books.filter((b) => b.id === id)[0]; //seleclt book by id

  if (book !== undefined) {
    book.name = name;
    book.year = year;
    book.author = author;
    book.summary = summary;
    book.publisher = publisher;
    book.pageCount = pageCount;
    book.readPage = readPage;
    book.reading = reading;
    book.updatedAt = updatedAt;

    const isSuccess = books.filter((b) => b.id === id)[0]; 

    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
        // data: {
        //   bookId: id,
        // },
      });
      response.code(200);
      return response;
    }
  }else {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  
};

const deleteBookHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    const index = books.findIndex((b) => b.id === id);
    books.splice(index, 1);

    const isSuccess = books.filter((b) => b.id === id).length === 0;

    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
        // data: {
        //   bookId: id,
        // },
      });
      response.code(200);
      return response;
    }
  }else {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
}
