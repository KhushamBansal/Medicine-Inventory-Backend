Medicine Inventory Backend

A RESTful API for managing medicine data, built using Node.js, Express, and MongoDB.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete medicine records.
- **Searching**: Search medicines by name.
- **Filtering**: Filter medicines by manufacturer and other fields.
- **Sorting**: Sort medicines by name, price, quantity, etc.
- **Optional Image Upload**: Store image URLs for medicine records.
- **Caching using Redis**: Caching for frequently accessed data to improve response times.

## Installation

1. **Clone the Repository**

2. **Navigate to the Project Directory**

3. **Initialise npm and Install Dependencies**

   ```sh
   npm install
   ```

## Configuration

 **Start the MongoDB and Redis Services**

   Ensure that MongoDB(mongod and mongosh) and Redis services are running on your local machine.

## Usage

1. **Start the Server**

   ```sh
   nodemon app.js
   ```

   The server will start on `http://localhost:3000`.

## API Endpoints
**Use postman to test the api.**

## Create Medicine
**Endpoint**: POST /api/medicines
**Body**: form-data (for image upload) or JSON
**Fields**: name, price, discountPrice, quantity, manufacturer, image (optional for image file)

## Get Medicines
**Endpoint**: GET /api/medicines

## Update Medicine
**Endpoint**: PUT /api/medicines/:id

## Delete Medicine
**Endpoint**: DELETE /api/medicines/:id
