# API Documentation

Welcome to the **Speaktoo Project** API documentation. This document provides details about each available endpoint, request/response formats, and usage examples.

## Table of Contents
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
    - [User Endpoints](#user-endpoints)
        - [Get User](#get-user)
        - [Regsiter User](#register-user)
        - [Login User](#login-user)
        - [Change Username](#change-username)
        - [Reset Password](#reset-password)
        - [Change User Type](#change-user-type)
    - [Log Endpoints](#log-endpoints)
        - [Get Logs](#get-logs)
        - [Post Log](#post-log)
    - [Sentence Endpoints](#sentence-endpoints)
        - [Get Sentences By User](#get-sentence-by-user)
        - [Get Sentence Detail](#get-sentence-detail)
    - [Transcribe Endpoint](#transcribe-endpoint)
        - [Post Transcribe](#post-transcribe)
- [Error Handling](#error-handling)

---

## Getting Started

### Prerequisites
- **Node.js**
- **Database** (MySQL, Firebase Auth)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Matkul-Capstone/Cloud.git
   ```
2. Install dependencies:
    ```
    cd Cloud/src
    npm install
    ```
3. Set up environment variables:
- Create a ```.env``` file in the root directory.
- Add necessary variables such as database credentials, API keys, Firebase configuration, and any other required environment-specific settings.

```.env``` file template:
```
PORT=

API_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=

HOST=
USER=
PASS=
DATABASE=

ML_URL=
```
5. Start the server:
```
npm start
```

## API Endpoints
API link:
```
https://speaktoo-api-358856456862.asia-southeast1.run.app
```

### User Enpoints

#### Get User
- URL: /users/:uid

- Method: GET

- Description: Retrieves user data by user ID.

- Parameters:
    - uid : User ID

- Response:
```
'success': true,
'status': 200,
'message': 'Successfully get user.',
'data': {
    'user_id': String,
    'username': String,
    'user_email': String,
    'user_type': String
}
```

#### Register User
- URL: /users/register

- Method: POST

- Description: Register user data to database.

- Body:
```
'email' : String,
'password' : String,
'username' : String
```

- Response:
```
'success': true,
'status': 200,
'message': 'Successfully registered new user.',
'data': {
    'uid': String
}
```

#### Login User
- URL: /users/login

- Method: POST

- Description: Login to authenticate user data.

- Body:
```
'email' : String,
'password' : String
```

- Response:
```
'success': true,
'status': 200,
'message': 'Successfully login.',
'data': {
    'uid': String
}
```

#### Change Username
- URL: /:uid/username

- Method: PUT

- Description: Change username in user data.

- Parameters:
    - uid : User ID

- Body:
```
'newUsername' : String
```

- Response:
```
'success': true,
'status': 200,
'message': 'Successfully changed username.',
'data': {
    'uid': String,
    'newUsername': StringString
}
```

#### Reset Password
- URL: /:uid/password

- Method: PUT

- Description: Change password in user data.

- Parameters:
    - uid : User ID

- Body:
```
'email' : String
```

- Response:
```
'success': true,
'status': 200,
'message': 'Please check your email to reset your password.'
```

#### Change User Type
- URL: /:uid/type

- Method: PUT

- Description: Change user type in user data.

- Parameters:
    - uid : User ID

- Body:
```
'userType' : String
```

- Response:
```
'success': true,
'status': 200,
'message': 'Successfully changed username.',
'data': {
    'uid': String,
    'newUsername': String
}
```

#### Change User Score
- URL: /:uid/score/:type

- Method: PUT

- Description: Change user score in user data.

- Parameters:
    - uid : User ID
    - type : User Type

- Body:
```
'score' : Int
```

- Response:
```
'success': true,
'status': 200,
'message': 'Successfully changed user score.'
```

### Log Endpoints

#### Get Logs
- URL: /log/:uid

- Method: GET

- Description: Retrieves log data by user ID.

- Parameters:
    - uid : User ID

- Response:
```
'success': true,
'status': 200,
'message': 'Successfully get logs.',
'data': [
    {
        "log_id": INT,
        "user_id": String,
        "sentence_id": INT,
        "completed": INT,
        "timestamp": DATE,
        "score": INT
    },
    {
        "log_id": INT,
        "user_id": String,
        "sentence_id": INT,
        "completed": INT,
        "timestamp": DATE,
        "score": INT
    },
]
```

#### Post Log
- URL: /log/:uid/:sid

- Method: POST

- Description: Post log data to database.

- Parameters:
    - uid : User ID
    - sid : Sentence ID

- Body:
```
'score': Int,
'completed': Int,
'timestamp': String
```

- Response:
```
'success': true,
'status': 200,
'message': 'Successfully post log'.
```

### Sentence Endpoints

#### Get Sentences By User
- URL: /sentences/:type/:uid

- Method: GET

- Description: Retrieves sentence data by type and user ID.

- Parameters:
    - type : Sentence Type
    - uid  : User ID

- Response:
```
"success": true,
"status": 200,
"message": "Successfully get sentences.",
"data": [
    {
        "sentence_id": INT,
        "sentence_type": String,
        "sentence": String,
        "chapter": String,
        "completed": INT
    },
    {
        "sentence_id": INT,
        "sentence_type": String,
        "sentence": String,
        "chapter": String,
        "completed": INT
    },
]
```

#### Get Sentence Detail
- URL: /sentences/:sid

- Method: GET

- Description: Retrieves sentence details from database.

- Parameters:
    - sid : Sentence ID

- Response:
```
"success": true,
"status": 200,
"message": "Successfully get sentence detail.",
"data": {
    "sentence_id": INT,
    "sentence_type": String,
    "sentence": String,
    "audio": String
}
```

### Transcribe Endpoint

#### Post Transcribe
- URL: /transcribe/:sid

- Method: GET

- Description: Retrieves sentence details from database.

- Parameters:
    - sid : Sentence ID

- Body:
```
'uid': String,
'chapter': String,
'sentence': String,
'timestamp': String,
'audio': WAV File
```

- Response:
```
'success': true,
'status': 200,
'message': 'Successfully transcribed audio file.',
'data': {
    'uid': String,
    'chapter': String,
    'sid': Int,
    'timestamp': String,
    'sentence': String,
    'score': Int,
    'correct_words': List<String>,
    'wrong_words': List<String>,
    'completed': Int
}
```

## Error Handling
The API returns standard HTTP status codes for errors. Here are some common error codes:

- 400 Bad Request: Missing or invalid parameters.
- 404 Not Found: Resource not found.
- 500 Internal Server Error: An error occurred on the server.

### Example Error Response
```
{
  "success": false,
  "status": 404,
  "message": "User not found"
}
```