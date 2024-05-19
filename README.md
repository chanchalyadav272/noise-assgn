# Sleep Tracker API

## Server is hosted on render. Use the following base-url to access the APIs

```bash
https://sleep-tracker.onrender.com
```

## Setup and Run

```bash
git clone https://github.com/chanchalyadav272/noise-assgn.git
cd noise-assgn 
npm install
```

### Create a `.env` file in the root directory and add your MongoDB URI:

```bash
MONGO_URI=your_mongodb_access_uri
```

### To run the tests

```bash
npm test
```

### To manually test, start the server

```bash
npm start
```

### API Endpoints

#### POST `/sleep`

- **Description:** Create a new sleep record.
- **Request Body:**

```json
{
    "userId": "user1",
    "hours": 8,
    "timestamp": "2024-05-18T00:00:00Z"
}
```

- **Response:**
  
```json
{
  "Added": {
    "userId": "user1",
    "hours": 8,
    "timestamp": "2024-05-18T00:00:00.000Z",
    "_id": "<record_id>",
    "__v": 0
  }
}
```

- **Status Codes:**
  - `200 Created`: Successfully created a new sleep record.
  - `400 Bad Request`: Invalid data provided.

#### GET `/sleep/:userId`

- **Description:** Retrieve all sleep records for a specific user.
- **Response:**
  
```json
{
  "User": "user1",
  "SleepRecords": [
    {
      "_id": "<record_id>",
      "userId": "user1",
      "hours": 8,
      "timestamp": "2024-05-18T00:00:00.000Z",
      "__v": 0
    }
  ]
}
```

- **Status Codes:**
  - `200 OK`: Successfully retrieved sleep records.
  - `500 Internal Server Error`: Error retrieving sleep records.

#### DELETE `/sleep/:recordId`

- **Description:** Delete a specific sleep record by its ID.
- **Response:**
  
```json
{
  "Deleted": {
    "_id": "<record_id>",
    "userId": "user1",
    "hours": 8,
    "timestamp": "2024-05-18T00:00:00.000Z",
    "__v": 0
  }
}
```

- **Status Codes:**
  - `200 OK`: Successfully deleted the sleep record.
  - `404 Not Found`: Record not found.
  - `500 Internal Server Error`: Error deleting the record.

## Project Structure

```bash
.
├── src
│   ├── app.js
│   ├── controllers
│   │   └── sleepController.js
│   ├── databases
│   │   └── db.js
│   ├── models
│   │   └── sleep.js
│   └── routes
│       └── sleepRoutes.js
├── test
│   └── sleep.test.js
├── .env
├── package.json
└── README.md
```
