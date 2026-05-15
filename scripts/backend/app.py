from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import os

app = Flask(__name__)
CORS(app)
DB_FILE = "scripts/backend/users.csv"
USER_DATA_DIR = "scripts/backend/userData"

if not os.path.exists(DB_FILE):
    os.makedirs(os.path.dirname(DB_FILE), exist_ok=True)
    with open(DB_FILE, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["email", "name", "password", "mobile"])

if not os.path.exists(USER_DATA_DIR):
    os.makedirs(USER_DATA_DIR)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get("email")
    
    with open(DB_FILE, "r") as f:
        reader = csv.DictReader(f)
        if any(row['email'] == email for row in reader):
            return jsonify({"status": "error", "message": "Email already registered"}), 400

    with open(DB_FILE, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([email, data.get("name"), data.get("password"), data.get("mobile")])
    
    return jsonify({"status": "success", "message": "Account created successfully!"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    
    if not os.path.exists(DB_FILE):
        return jsonify({"status": "error", "message": "No users registered yet"}), 404

    with open(DB_FILE, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['email'] == email and row['password'] == password:
                return jsonify({
                    "status": "success", 
                    "message": f"Welcome back, {row['name']}!",
                    "user": {"name": row['name'], "email": row['email']}
                }), 200
                
    return jsonify({"status": "error", "message": "Invalid email or password"}), 401


@app.route('/save_exam_data', methods=['POST'])
def save_exam_data():
    data = request.json
    email = data.get("currentUserEmail")
    if not email:
        return jsonify({"status": "error", "message": "User email required"}), 400
    
    filename = f"scripts/backend/userData/{email.replace('@', '_').replace('.', '_')}_data.csv"
    headers = list(data.keys())
    file_exists = os.path.exists(filename)

    with open(filename, "a", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        if not file_exists:
            writer.writeheader()
        writer.writerow(data)
    return jsonify({"status": "success", "message": "Registration data archived successfully!"}), 201

@app.route('/get_exam_history', methods=['GET'])
def get_exam_history():
    email = request.args.get("email")
    filename = f"scripts/backend/userData/{email.replace('@', '_').replace('.', '_')}_data.csv"
    if not os.path.exists(filename):
        return jsonify([]), 200
    
    history = []
    with open(filename, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            history.append(row)
    return jsonify(history), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)