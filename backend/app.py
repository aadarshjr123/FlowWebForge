from flask import Flask, request, jsonify
from names import extract_names
import bcrypt
import datetime
from flask_cors import CORS
import os
import jwt
import re
from pymongo import MongoClient
from generate_textDes import generate_story
from model.generate_model import generate_model
from addRecords import add_sample_data_to_mongodb
from functools import wraps
from bson.objectid import ObjectId
from model.openai_text_code_model import generate_text, generate_code
from retriveRecords import retrive_user_data_from_mongodb


app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'team_infinity'
app.config['DEBUG'] = True

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'bpmn'}

frontend_folder = os.path.join(os.path.dirname(__file__), 'frontend')

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# uri = f"mongodb+srv://teaminfinity:Teaminfinity@teaminfinity.pcppgcb.mongodb.net/?retryWrites=true&w=majority"

# Connect to MongoDB Atlas
client = MongoClient('mongodb+srv://teaminfinity:Teaminfinity@teaminfinity.pcppgcb.mongodb.net/?retryWrites=true&w=majority')
db = client['teaminfinity']
users_collection = db.users

# Decorator to check if the user is logged in
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        # Remove "Bearer " prefix
        cleaned_token = token[7:]

        try:
            print(token)
            data = jwt.decode(cleaned_token, app.config['SECRET_KEY'], algorithms=['HS256'])
            print("Data: ", data)
        except Exception as e:
            return jsonify({'error': 'Token is invalid'}), 401

        return f(*args, **kwargs)

    return decorated

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/test', methods=['GET'])
def deploy_test():
    return {'msg': 'deployment works'}

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    language = request.form.get('language')  # Retrieve the selected language
    model = request.form.get('model')  # Retrieve the selected model
    top_p = float(request.form.get('TopP', 1)) if 'TopP' in request.form else 1
    temperature = float(request.form.get('tempurature', 0.7)) if 'tempurature' in request.form else 0.7
    frequency_penalty = float(request.form.get('frequency_penalty', 0)) if 'frequency_penalty' in request.form else 0
    presence_penalty = float(request.form.get('presence_penalty', 1.25)) if 'presence_penalty' in request.form else 1.25
    repetition_penalty = float(request.form.get('repetition_penalty', 1)) if 'repetition_penalty' in request.form else 1
    top_k = int(request.form.get('top_k', 0)) if 'top_k' in request.form else 0
    max_tokens = int(request.form.get('token', 2311)) if 'token' in request.form else 2311

    print(language)
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file and file.filename.endswith('.xml'):

        xml_content = file.read().decode('utf-8')
        
        data_list = []
        names_data = extract_names(xml_content)
        for name_value in names_data:
            data_list.append(name_value)


        print(data_list)
        # Define a dictionary mapping user inputs to functions
        function_mapping = {
            "operhermes": "teknium/openhermes-2.5-mistral-7b",
            "gpt4": "openai/gpt-4-turbo-preview",
        }
        # print("result",result)
        try:

            if model in function_mapping:

                selected_function = function_mapping[model]
                print("model",selected_function)

                appendText_Array = f'convert this to text paragraph, {data_list}'



                generated_story = generate_model(
                    appendText_Array,
                    selected_function,
                    top_p=top_p if 'top_p' in locals() else 1,
                    temperature=temperature if 'temperature' in locals() else 0.7,
                    frequency_penalty=frequency_penalty if 'frequency_penalty' in locals() else 0,
                    presence_penalty=presence_penalty if 'presence_penalty' in locals() else 1.25,
                    repetition_penalty=repetition_penalty if 'repetition_penalty' in locals() else 1,
                    top_k=top_k if 'top_k' in locals() else 0,
                    max_tokens=max_tokens if 'max_tokens' in locals() else 2311)

                print(generated_story)

                appendText_Story = f'create an simple code snippets with the given paragraph in {language}, {generated_story}'

                generated_code = generate_model(appendText_Story,selected_function)

                print(generated_code)
                # Assuming the generated story is saved in a known location
                # generated_file_path = os.path.join(frontend_folder, 'bpmntocodesnippet-frnt', 'src', 'uploads', 'generated_story.json')

                result_dict = {
                    "data_list": data_list,
                    "generated_story": generated_story,
                    "generated_code": generated_code
                }

                # Convert the dictionary to JSON format using jsonify
                return result_dict

        except Exception as e:
            return jsonify(success=False, error=str(e)), 500

    # return jsonify({'error': 'Invalid file type'})

@app.route('/api/signup', methods=['POST'])
def sign_up():


    data = request.get_json()
    first_name = data.get('fname')
    last_name = data.get('lname')
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')



    print(first_name)
    print(last_name)
    print(username)
    print(password)
    print(email)
    
    if not username or not password or not email:
        return jsonify({'error': 'Username, email, and password are required'}), 400
    
    # Check if the username already exists
    if users_collection.find_one({'username': username}):
        return jsonify({'error': 'Username already exists'}), 400
    
    if not re.match(r'^[a-zA-Z0-9_]+$', username):
        return jsonify({'error': 'Username can only contain letters, numbers, and underscores'}), 400
    
    # Check if the email already exists
    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'Email already exists'}), 400
    
    if not re.match(r'^[\w\.-]+@[\w\.-]+$', email):
        return jsonify({'error': 'Invalid email address'}), 400
    
    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters long'}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
    # Insert the new user into the database
        users_collection.insert_one({'first_name': first_name, 'last_name': last_name, 'username': username, 'email': email, 'password': hashed_password})
    except Exception as e:
        print("Exception occured: ", e)
        return jsonify({'Error: ', e})
    
    return jsonify({'success': True, 'message': 'User created successfully'}), 201

@app.route("/api/updateUser", methods=["POST"])
def update_user():

    data = request.get_json() 

    print("data",data)
    for item in data:
        userid = item.get('userid')
        username = item.get('username')
        password = item.get('password')
        email = item.get('email')
        saveEnabled = item.get('saveEnabled')

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    print(type(userid))
    result = users_collection.update_one(
        {"userId": userid},
        {"$set": {"username": username, "email": email, "password": hashed_password,'saveEnabled': saveEnabled}}
    )

    print("result",result)
    if result.modified_count > 0:
        print("enter")
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "error": "User not found"})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    # Find the user in the database
    user = users_collection.find_one({'email': email})

    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    token = jwt.encode({'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)}, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({'success': True, 'message': token}), 200
    
@app.route('/api/logout', methods=['POST'])
@token_required
def logout():
    return jsonify({'success': True, 'message': 'Logged out successfully'}), 200

@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user_details(user_id):
    print(user_id)
    user = users_collection.find_one({'userID': str(user_id)})
    print(user)
    if user:
        del user['_id']  
        del user['password']  

        return jsonify({'success': True, 'user': user}), 200
    else:
        return jsonify({'success': False, 'message': 'User not found'}), 404


# Route to add sample data
@app.route('/api/addUserStories', methods=['POST'])
def add_sample_data():
    data = request.json  # Assuming the data is sent as JSON

    add_sample_data_to_mongodb(data)
    return "Sample data added to MongoDB."


@app.route('/api/retriveRecords/<int:user_id>', methods=['GET'])
def retrive_user_data(user_id):
    document = retrive_user_data_from_mongodb(user_id)
    return document

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
