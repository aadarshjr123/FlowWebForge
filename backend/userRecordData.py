from pymongo import MongoClient
from flask import jsonify
import re

def format_text(text):

    # Split the text into sentences
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)

    # Concatenate the first two sentences with ellipsis
    concatenated_text = ' '.join(sentences[:2]) + '...'

    return concatenated_text

def get_user_records(tokenEmail):
    # Connect to MongoDB
    # Connect to MongoDB
    uri = f"mongodb+srv://teaminfinity:Teaminfinity@teaminfinity.pcppgcb.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(uri)
    db = client["teaminfinity"]
    collection = db['userrecorddata']

    # Query to get all documents with the email that is passed in the token
    query = {"email": tokenEmail}

    # Retrieve the document with the given user_id
    document = list(collection.find(query))

    # Close the connection when done
    client.close()

    if document:  # Check if document is not empty
        list_of_data = []
        for item in document:
            record = item["record"][0]
            text = record["name"]
            formatted_text = format_text(text)
            
            data_to_pass = {
                "name": formatted_text,
                "response": record["response"]
            }
            list_of_data.append(data_to_pass)
            
        return jsonify(list_of_data)
    else:
        return jsonify({'error': 'Document not found'}), 404
