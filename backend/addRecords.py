from pymongo import MongoClient
from gridfs import GridFS
from urllib.parse import quote_plus
import os


def add_sample_data_to_mongodb(sample_data):
    
    # Connect to MongoDB
    uri = f"mongodb+srv://teaminfinity:Teaminfinity@teaminfinity.pcppgcb.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(uri)
    db = client["teaminfinity"]
    collection = db['userrecorddata']

    # Insert the sample data into the collection
    for data in sample_data:
        collection.insert_one(data)

    print("Sample data added to MongoDB.")

