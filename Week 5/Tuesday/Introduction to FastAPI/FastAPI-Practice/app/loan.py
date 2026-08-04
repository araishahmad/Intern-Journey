from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Application(BaseModel):
    age: int
    income: float
    loan_amount: float
    working_experience: int


@app.post("/predict")
def predict_loan(application: Application):

    if application.age >= 25 and application.working_experience > 2:
        decision = "Approved"
    else:
        decision = "Declined"

    return {"age": application.age, "decision": decision}
