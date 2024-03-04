import requests
import json
import os
import sys

backend_folder = os.path.join(os.path.dirname(__file__), 'backend')
frontend_folder = os.path.join(os.path.dirname(__file__), 'frontend')

generated_file_path = os.path.join(frontend_folder,'src', 'uploads', 'generated_story.json')

def generate_story(prompt):
    print(prompt)
    url = 'http://localhost:11434/api/generate'
    data = {
        "model": "openhermes",
        "prompt": f"convert this to text paragraph {prompt}",
        "stream": False,
    }

    try:
        response = requests.post(url, json=data)
        response.raise_for_status()  # Raise an exception for bad responses (4xx or 5xx)

        result = json.loads(response.text)
        result_response = result["response"]

        return result_response

    except requests.exceptions.RequestException as e:
        return None

if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(1)

    prompt_text = sys.argv[1]
    result = generate_story(prompt_text)
