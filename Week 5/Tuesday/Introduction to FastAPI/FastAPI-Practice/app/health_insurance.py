from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Health_Insurance(BaseModel):
    name: str
    age: int
    organization: str
    income: int
    experience: int
    health_insurance_amount: int


record = []


@app.get("/")
def get_info():
    return {"Records": record}


@app.post("/predict")
def predict_insurance(health_ins: Health_Insurance):
    approved = (
        health_ins.age > 28 and health_ins.income >= 80000 and health_ins.experience > 2
    )

    record.append(
        {
            "name": health_ins.name,
            "age": health_ins.age,
            "organization": health_ins.organization,
            "income": health_ins.income,
            "experience": health_ins.experience,
            "loan_amount": health_ins.health_insurance_amount,
            "status": approved,
        }
    )

    return {
        "name": health_ins.name,
        "age": health_ins.age,
        "income": health_ins.income,
        "status": "approved" if approved else "not approved",
        "loan_amount": health_ins.health_insurance_amount,
    }


@app.put("/update/{user_name}")
def update_user(user_name: str, updated_info: Health_Insurance):
    for user in record:
        if user["name"] == user_name:
            user["age"] = updated_info.age
            user["organization"] = updated_info.organization
            user["income"] = updated_info.income
            user["experience"] = updated_info.experience
            user["loan_amount"] = updated_info.health_insurance_amount
            return {"message": f"{user_name} updated successfully"}

    return {"message": f"No user found with name {user_name}"}


@app.delete("/delete/{user_name}")
def delete_user(user_name: str):
    for user in record:
        if user["name"] == user_name:
            record.remove(user)
            return {"message": f"{user_name} removed successfully"}

    return {"message": f"No user found named {user_name}"}
