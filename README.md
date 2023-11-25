
# level2-assignment-2

Developed a Node.js Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for user data and order management.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/marufbroh/level2-assignment-2.git
    ```

2. **Install Dependencies:**

    ```bash
    cd your-repository
    npm install
    ```

3. **Set Up Environment Variables:**

    Create a `.env` file in the root of your project and configure any necessary environment variables.

    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/your-database
    BCRYPT_SALT_ROUNDS=12
    NODE_ENV= development
    ```

4. **Run the Application:**

    ```bash
    npm run dev
    ```

    Your application should now be running on [http://localhost:5000](http://localhost:5000).

## API Endpoints

- Create a new user Endpoint: POST /api/users
- Retrieve a list of all users Endpoint: GET /api/users
- Retrieve a specific user by ID Endpoint: GET /api/users/:userId
- Update user information Endpoint: PUT /api/users/:userId
- Delete a user Endpoint: DELETE /api/users/:userId
- Add New Product in Order Endpoint: PUT /api/users/:userId/orders
- Retrieve all orders for a specific user Endpoint: GET /api/users/:userId/orders
- Calculate Total Price of Orders for a Specific User Endpoint: GET /api/users/:userId/orders/total-price

**Regards**,

Tamim Iqbal Maruf (marufbroh)

