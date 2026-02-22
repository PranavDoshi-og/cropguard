import os
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
import json
from pathlib import Path

# Configuration
DATASET_PATH = "../dataset"
MODEL_SAVE_PATH = "model/cropguard_model.keras"
IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 20

# Class names matching the dataset folder structure
CLASS_NAMES = [
    "Potato___Early_blight",
    "Potato___healthy",
    "Potato___Late_blight",
    "Tomato__Early_blight",
    "Tomato_healthy",
    "Tomato_Late_blight",
]

def create_dataset_from_directory():
    """Load images from directory structure"""
    print("Loading dataset from directory...")
    
    images = []
    labels = []
    
    for idx, class_name in enumerate(CLASS_NAMES):
        class_path = os.path.join(DATASET_PATH, class_name)
        if not os.path.exists(class_path):
            print(f"Warning: Class directory not found: {class_path}")
            continue
        
        print(f"Loading {class_name}...")
        for img_file in os.listdir(class_path):
            if img_file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif')):
                try:
                    img_path = os.path.join(class_path, img_file)
                    img = tf.keras.preprocessing.image.load_img(
                        img_path, 
                        target_size=IMAGE_SIZE
                    )
                    img_array = tf.keras.preprocessing.image.img_to_array(img)
                    img_array = img_array / 255.0  # Normalize
                    
                    images.append(img_array)
                    labels.append(idx)
                    
                    if len(images) % 50 == 0:
                        print(f"  Loaded {len(images)} images...")
                except Exception as e:
                    print(f"  Error loading {img_file}: {e}")
    
    print(f"Total images loaded: {len(images)}")
    return np.array(images), np.array(labels)

def create_model():
    """Create a model using transfer learning with MobileNetV2"""
    print("Creating model with transfer learning (MobileNetV2)...")
    
    # Load pre-trained MobileNetV2
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights='imagenet'
    )
    
    # Freeze base model
    base_model.trainable = False
    
    # Build the model
    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(len(CLASS_NAMES), activation='softmax')
    ])
    
    return model, base_model

def train_model():
    """Main training function"""
    print("=" * 50)
    print("Starting Model Training")
    print("=" * 50)
    
    # Load dataset
    X, y = create_dataset_from_directory()
    
    if len(X) == 0:
        print("Error: No images loaded. Check dataset directory structure.")
        return
    
    # Convert labels to one-hot encoding
    y_categorical = tf.keras.utils.to_categorical(y, num_classes=len(CLASS_NAMES))
    
    # Split into train and validation sets
    split_idx = int(0.8 * len(X))
    X_train, X_val = X[:split_idx], X[split_idx:]
    y_train, y_val = y_categorical[:split_idx], y_categorical[split_idx:]
    
    print(f"Training samples: {len(X_train)}")
    print(f"Validation samples: {len(X_val)}")
    
    # Create model
    model, base_model = create_model()
    
    # Compile
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    print("\nModel Summary:")
    model.summary()
    
    # Train
    print("\n" + "=" * 50)
    print("Training Model")
    print("=" * 50)
    
    history = model.fit(
        X_train, y_train,
        validation_data=(X_val, y_val),
        epochs=EPOCHS,
        batch_size=BATCH_SIZE,
        verbose=1
    )
    
    # Fine-tune: unfreeze last layers of base model and train
    print("\n" + "=" * 50)
    print("Fine-tuning Model")
    print("=" * 50)
    
    base_model.trainable = True
    # Freeze early layers
    for layer in base_model.layers[:-50]:
        layer.trainable = False
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    history = model.fit(
        X_train, y_train,
        validation_data=(X_val, y_val),
        epochs=10,
        batch_size=BATCH_SIZE,
        verbose=1
    )
    
    # Save model
    print("\n" + "=" * 50)
    print("Saving Model")
    print("=" * 50)
    
    os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
    model.save(MODEL_SAVE_PATH)
    print(f"Model saved to: {MODEL_SAVE_PATH}")
    
    # Save class names
    labels_path = os.path.join(os.path.dirname(MODEL_SAVE_PATH), "labels.json")
    with open(labels_path, 'w') as f:
        json.dump(CLASS_NAMES, f, indent=2)
    print(f"Labels saved to: {labels_path}")
    
    # Evaluate
    print("\n" + "=" * 50)
    print("Model Evaluation")
    print("=" * 50)
    
    val_loss, val_accuracy = model.evaluate(X_val, y_val, verbose=0)
    print(f"Validation Loss: {val_loss:.4f}")
    print(f"Validation Accuracy: {val_accuracy:.4f}")
    
    return model

if __name__ == "__main__":
    train_model()
