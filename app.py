from flask import Flask, request, jsonify
from model import analyze_text
from firebase_admin import credentials, firestore, initialize_app
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Initialize Firebase
cred = credentials.Certificate("firebase-key.json")  # 🔹 Replace with your Firebase key file path
initialize_app(cred)
db = firestore.client()

print("✅ Firebase Connected Successfully!")

# API Endpoint: Analyze text
@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        # Get the data from the request
        data = request.json
        user_text = data.get('text')
        user_id = data.get('user_id')  # User ID (you'll use Firebase Auth for this in the future)

        # Check if user text is provided
        if not user_text:
            return jsonify({"error": "Text is required"}), 400

        # Analyze sentiment using the AI model
        result = analyze_text(user_text)

        # Save the journal entry and sentiment analysis in Firebase Firestore
        db.collection('users').document(user_id).collection('entries').add({
            'text': user_text,
            'sentiment': result['sentiment'],
            'confidence': result['confidence'],
            'timestamp': firestore.SERVER_TIMESTAMP
        })

        # Return the sentiment analysis result
        return jsonify(result)

    except Exception as e:
        # Handle any errors that may occur
        return jsonify({"error": str(e)}), 500

# Home Route (For testing)
@app.route('/')
def home():
    return "Welcome to the Mental Health Tracker API!"

# Run Flask server
if __name__ == '__main__':
    # Allow external connections with `host='0.0.0.0'`
    app.run(host='0.0.0.0', port=5000, debug=True)
