from fastapi import FastAPI

app = FastAPI()


@app.get("/")
@app.get("/home")
def home():
    return {"message": "You're on home page"}


@app.get("/about")
def about():
    return {"message": "You're on about page"}
