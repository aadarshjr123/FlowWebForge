from pymongo import MongoClient
from gridfs import GridFS
from urllib.parse import quote_plus
from flask import Flask, request

def add_sample_data_to_mongodb(sample_data,email):
    
    # Connect to MongoDB
    uri = f"mongodb+srv://teaminfinity:Teaminfinity@teaminfinity.pcppgcb.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(uri)
    db = client["teaminfinity"]
    collection = db['userrecorddata']

    # Append email to each document in sample_data
    for data in sample_data:
        data["email"] = email  # Append the email to the document
    
    # Insert the sample data into the collection
    for data in sample_data:
        collection.insert_one(data)

    print("Sample data added to MongoDB.")

