from fastapi import FastAPI

app = FastAPI()

customers = {
    101: {"name": "araish", "risk": "low", "city": "lahore"},
    102: {"name": "hamza", "risk": "medium", "city": "karachi"},
    103: {"name": "sana", "risk": "high", "city": "islamabad"},
    104: {"name": "bilal", "risk": "low", "city": "lahore"},
    105: {"name": "ayesha", "risk": "medium", "city": "lahore"},
}


@app.get("/experience/{experience}/customers/{customer_id}")
def get_customer(experience: int, customer_id: int):
    if customer_id not in customers:
        return {"error": f"No customer found with id {customer_id}"}

    profile = customers[customer_id]

    return {
        "experience": experience,
        "user_name": profile["name"],
        "risk": profile["risk"],
        "city": profile["city"],
    }


@app.get("/customers")
def get_customers(risk: str = None, city: str = None, limit: int = 10): # by default kept limit to 10 to prevent the system to crash
    filtered = []

    for cust_id, profile in customers.items():
        if risk and profile["risk"] != risk:
            continue

        if city and profile["city"] != city:
            continue

        filtered.append({"id": cust_id, **profile})

    return filtered[:limit]
