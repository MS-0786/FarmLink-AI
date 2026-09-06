from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("price_model.pkl")


@app.route("/predict-price", methods=["POST"])
def predict_price():
    data = request.json

    crop = data["crop"]
    location = data["location"]
    quantity = data["quantity"]
    demand = data["demand"]
    market_price = data["market_price"]

    input_data = pd.DataFrame([
        {
            "crop": crop,
            "location": location,
            "quantity": quantity,
            "demand": demand,
            "market_price": market_price,
        }
    ])

    prediction = model.predict(input_data)

    recommended_price = round(float(prediction[0]), 2)

    return jsonify({
        "recommended_price": recommended_price
    })


@app.route("/")
def home():
    return jsonify({
        "message": "FarmLink AI ML service is running"
    })


if __name__ == "__main__":
    app.run(port=8000, debug=True)