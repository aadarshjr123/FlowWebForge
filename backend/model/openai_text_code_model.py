from flask import Flask, request, jsonify
import openai

# Initialize OpenAI API
openai.api_key = "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"

# Initialize Flask app
app = Flask(__name__)

def generate_text(prompt, max_tokens=50, temperature=0.7):
    print(prompt)
    response = openai.chat.completions.create(
        model="openai/gpt-4-turbo-preview",
        messages=[
            {"role": "system", "content": f'{prompt}'},
        ],
        max_tokens=max_tokens,
        temperature=temperature
    )
    print(response)

    return response.choices[0].text.strip()

def generate_code(text_prompt, max_tokens=100, temperature=0.7):
    response = openai.chat.completions.create(
        model="openai/gpt-4-turbo-preview",
        messages=[
            {"role": "system", "content": f'{text_prompt}'},
        ],
        max_tokens=max_tokens,
        temperature=temperature
    )
    return response.choices[0].text.strip()