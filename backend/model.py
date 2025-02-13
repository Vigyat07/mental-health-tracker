from transformers import pipeline

# Explicitly specify model and revision to avoid warnings
MODEL_NAME = "distilbert-base-uncased-finetuned-sst-2-english"
MODEL_REVISION = "714eb0f"  # The revision ID from the warning message

# Load a pre-trained sentiment analysis model
model = pipeline("text-classification", model=MODEL_NAME, revision=MODEL_REVISION)

def analyze_text(text):
    result = model(text)[0]
    return {
        "sentiment": result["label"],
        "confidence": result["score"]
    }

# Test the model directly when running the script
if __name__ == "__main__":
    print("Classifier loaded, now analyzing sentiment.")
    print("Sentiment Analysis Result:", analyze_text("I feel lonely and stressed lately."))
