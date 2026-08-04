from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Book_Info(BaseModel):
    id: int
    title: str
    author: str


books = []


@app.get("/")
@app.get("/home")
def home():
    return {"message": "You're on home page"}


@app.get("/book_info")
def get_books():
    return {"message": "Welcome to book management", "books": books}


@app.post("/add_book")
def add_book(info: Book_Info):
    books.append(info)
    return {
        "message": "Book added successfully",
        "book_id": info.id,
        "book_title": info.title,
        "book_author": info.author,
    }


@app.delete("/delete_book/{book_id}")
def delete_book(book_id: int):
    for book in books:
        if book.id == book_id:
            books.remove(book)
            return {"message": f"Book deleted successfully having id {book_id}"}

    return {"message": f"No book found having id {book_id}"}


@app.put("/update_book/{book_id}")
def update_book(book_id: int, updated_info: Book_Info):
    for book in books:
        if book.id == book_id:
            book.title = updated_info.title
            book.author = updated_info.author
            return {"message": f"Information of book having id {book_id} is updated"}

    return {"message": f"No book found having id {book_id}"}
