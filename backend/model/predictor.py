import tensorflow as tf
import numpy as np
from PIL import Image
import os

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "cropguard_model.keras"
)

_model = None  # singleton model


def get_model():
    global _model
    if _model is None:
        _model = tf.keras.models.load_model(
            MODEL_PATH,
            compile=False
        )
    return _model


CLASS_NAMES = [
    "Potato_Early_blight",
    "Potato_Healthy",
    "Potato_Late_blight",
    "Tomato_Early_blight",
    "Tomato_Healthy",
    "Tomato_Late_blight"
]


def preprocess_image(image_path):
    img = Image.open(image_path).convert("RGB")
    img = img.resize((224, 224))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    return img


def predict_disease(image_path):
    model = get_model()
    img = preprocess_image(image_path)

    preds = model.predict(img, verbose=0)[0]
    class_index = int(np.argmax(preds))
    confidence = float(preds[class_index])

    return CLASS_NAMES[class_index], confidence