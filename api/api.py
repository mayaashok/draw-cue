import os
import time
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

from dotenv import load_dotenv
load_dotenv()
gemini_api_key = os.getenv("GEMINI_API_KEY")

import google
from google import genai
client = genai.Client(api_key=gemini_api_key)

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/prompt')
def get_prompt():
    prompts = Prompt.query.all()
    prompts_list = [
        {
            "id": p.id,
            "text": p.text,
            "category": p.category,
            "complexity": p.complexity,
            "mood": p.mood,
        }
        for p in prompts
    ]
    return jsonify(prompts_list)
    # return {'text': 'Draw your go-to coffee order.'}

@app.route('/api/gen_prompt', methods=['POST'])
def generate_prompt():
    request_data = request.get_json()
    promptTopic = request_data.get('currTopic')
    promptComplexity = request_data.get('currComplexity')
    promptMood = request_data.get('currMood')
    response_prompt = f"Generate a drawing prompt of {promptComplexity} difficulty on the topic of {promptTopic} and mood of {promptMood}. Your response prompt should be one or two sentences long only but have enough detail for the user to know what to draw."
    response = client.models.generate_content(
        model="gemini-2.5-pro",
        contents=response_prompt
    )
    return_prompt = response.text
    return jsonify({
        "topic": promptTopic,
        "mood": promptMood,
        "complexity": promptComplexity,
        "prompt": return_prompt
    })

class Prompt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False) # Ex. 'Draw your go-to coffee order.'
    category = db.Column(db.String(50), nullable=False) # Ex. nature, animals, food
    complexity = db.Column(db.String(20), unique=True, nullable=False) # Ex. easy, medium, hard
    mood = db.Column(db.Integer) # Ex. whicmsical, serious, silly
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f'<Prompt {self.text[:30]}>'

