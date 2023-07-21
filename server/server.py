from flask import Flask, request, jsonify
from flask_cors import CORS , cross_origin
import util

app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def home():
    util.load_saved_artifacts()
    return "Running fine"

@app.route('/predict_home_price', methods=['GET', 'POST'])
@cross_origin()
def predict_home_price():
    total_sqft = float(request.json['total_sqft'])
    location = request.json['location']
    bhk = int(request.json['bhk'])
    bath = int(request.json['bath'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location,total_sqft,bhk,bath)
    })

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()