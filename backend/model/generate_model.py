import requests
import json
import os
import sys
import replicate

backend_folder = os.path.join(os.path.dirname(__file__), 'backend')
frontend_folder = os.path.join(os.path.dirname(__file__), 'frontend')

generated_file_path = os.path.join(frontend_folder, 'src', 'uploads', 'generated_story.json')

def generate_model(prompt, model, top_p=1, temperature=0.7, frequency_penalty=0, presence_penalty=1.25, repetition_penalty=1, top_k=0, max_tokens=2311):


    try:

        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer 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",
            },
            data=json.dumps({
                "model": f'{model}',  #"teknium/openhermes-2.5-mistral-7b", # Optional
                "messages": [
                {"role": "system", "content": f"{prompt}",}
      
                ],
                 "top_p": top_p,
                "temperature": temperature,
                "frequency_penalty": frequency_penalty,
                "presence_penalty": presence_penalty,
                "repetition_penalty": repetition_penalty,
                "top_k": top_k,
                "maxTokens": max_tokens,
            })
        )

        response.raise_for_status()  # Raise an exception for bad responses (4xx or 5xx)

        result = json.loads(response.text)

        # Extract content
        content = result['choices'][0]['message']['content']

        return content

    except requests.exceptions.RequestException as e:
        return None

if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(1)

    prompt_text = sys.argv[1]
    result = generate_model(prompt_text)
