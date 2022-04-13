# Bookshelf API

## Features

* Add book item
* Get book item
* Get book with params options
* Get book with id
* Update book item
* Delete book item

## Installation

```bash
npm install
```

## Running

```bash
npm run start-dev
```

Server is running on http://localhost:5000

## How to use

### Add book item

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "name": "Book Name Test",
    "year": "2022-04-13T07:35:19.546Z",
    "author": "Rama",
    "summary": "This is a test book",
    "publisher": "Test Publisher",
    "pageCount": 100,
    "readPage": 0,
    "reading": true
    }' http://localhost:5000/books
```

### Get book list

```bash
curl -X GET http://localhost:5000/books
```

### Get book with id
When get specific book, url is must contain `{id}` book target

```bash
curl -X GET http://localhost:5000/books/{id}
```

### Get specific book with parameter

| Params | Usage |
| ------ | ------ |
| name | "string" |
| reading | 1 or 0 |
| finished | 1 or 0 |

Status finished will be true if `readPage` is equal to `pageCount`

If the result is empty, it will return all books

```bash
curl -X GET -G 'http://localhost:5000/books' -d "name=Book Name Test"
```
```bash
curl -X GET -G 'http://localhost:5000/books' -d "reading=1"
```

### Update book item
When update book, url is must contain `{id}` book target

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
    "name": "Book Name Test Updated",
    "year": "2022-04-13T07:35:19.546Z",
    "author": "Rama Aditya",
    "summary": "This is a test book when updated",
    "publisher": "Dev Publisher",
    "pageCount": 100,
    "readPage": 100,
    "reading": true
    }' http://localhost:5000/books/{id}
```

### Delete book item
When delete book, url is must contain `{id}` book target

```bash
curl -X DELETE http://localhost:5000/books/{id}
```