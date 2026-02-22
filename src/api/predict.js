const API_URL = "http://127.0.0.1:8000";

export async function predictImage(imageFile, city) {
  const formData = new FormData();
  formData.append("file", imageFile); // must match FastAPI
  formData.append("city", city);

  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return await response.json();
}