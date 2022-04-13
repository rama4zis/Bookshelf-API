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

  const finished = pageCount === readPage;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString(); //get Current Date
  const updatedAt = insertedAt;

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
    finished,
    id,
    insertedAt, updatedAt,
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

const getAllBooksHandler = (request, h) => {

  const bookResult = [];

  // book name to lowercase
  if (request.query.name !== undefined) {
  const bookName = request.query.name;
  const bookNameLower = bookName.toLowerCase();
  const nameResult = books.filter((b) => b.name.toLowerCase().includes(bookNameLower));
  bookResult.push(...nameResult);
  }

  if (request.query.reading !== undefined) {
    const readingStatus = request.query.readingStatus;
    const readingStatusBoolean = readingStatus === 'true';
    const readingResult = books.filter((b) => b.reading == readingStatusBoolean);
    bookResult.push(...readingResult);
  }
  // const readingStatus = (request.query.readingStatus) ? this =  : false;
  if (request.query.finished) {
    const finishedStatus = request.query.finished;
    let finishedStatusBoolean;
    if(finishedStatus === '0') {
      finishedStatusBoolean = false;
    }else {
      finishedStatusBoolean = true;
    }
    // finishedStatusBoolean = finishedStatus === 'true';
    // console.log(finishedStatusBoolean);
    const finishedResult = books.filter((b) => b.finished == finishedStatusBoolean);
    bookResult.push(...finishedResult);
  }

  // check if bookName is in books data
  if (bookResult.length > 0) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditemukan',
      data: {
        books: bookResult.map((book) => {
          return {
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          };
        }),
      },
    }).code(200);
    return response;
  } else {
    const response = h.response({
      status: 'success',
      data: {
        // search: "Buku tidak ditemukan",
        books: books.map((book) => { // maping and get id.books, name.books, publisher.books
          return {
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          };
        }),
      },
    }).code(200);
    return response;
  }

};

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

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  // check name body
  if (name === undefined || name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
    return response;
  }

  // if read page is larger than page count
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
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
    book.finished = finished;
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
  } else {
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
  } else {
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
