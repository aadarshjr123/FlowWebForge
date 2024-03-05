from pymongo import MongoClient
from flask import jsonify
import base64

def retrive_user_data_from_mongodb(email): 
    # Connect to MongoDB
    
    uri = f"mongodb+srv://teaminfinity:Teaminfinity@teaminfinity.pcppgcb.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(uri)
    db = client["teaminfinity"]
    collection = db['userrecorddata']

    # Define the query to retrieve the document with the given user_id
    query = {"email": email}

    # Retrieve the document with the given user_id
    document = list(collection.find(query))

    # Close the connection when done
    client.close()

    if document:  # Check if document is not empty
        for item in document:
            # Remove the password field from the response
            item.pop('password', None)
            item["_id"] = str(item["_id"])  # Convert ObjectId to string
        return jsonify(document)
    else:
        return jsonify({'error': 'Document not found'}), 404

