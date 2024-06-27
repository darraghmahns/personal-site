# This is the Flask API script to serve the model and handle predictions.

from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import cv2

app = Flask(__name__)
model = tf.keras.models.load_model("mask_detector.model")

@app.route("/predict", methods=["POST"])
def predict():
    data = {"success": False}

    if request.files.get("image"):
        image = request.files["image"].read()
        image = np.fromstring(image, np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        image = cv2.resize(image, (224, 224))
        image = image.astype("float32")
        image = np.expand_dims(image, axis=0)

        preds = model.predict(image)
        data["predictions"] = preds.tolist()
        data["success"] = True

    return jsonify(data)

if __name__ == "__main__":
    app.run()