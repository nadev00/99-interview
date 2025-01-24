# Project Setup and Testing Instructions

## Prerequisites
Ensure you have the following installed:
- Docker
- Docker Compose
- PostgreSQL client (optional, for direct DB interaction)

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Setup Environment Variables**
   - Copy the `.env.example` file to `.env`.
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with the correct PostgreSQL database connection details if needed.

3. **Start the Application**
   - Run the following command to start the application:
     ```bash
     docker-compose up
     ```
   - The application will be running at [http://localhost:3000](http://localhost:3000).

4. **Seed the Database**
   - On the first boot, the application includes a seed file to populate the database with initial data.
     This ensures you have a list of products to test.

## Testing the Products Module

1. **Access the Products Module**
   - Navigate to the products module using your browser or API client (e.g., Postman) to test its functionality.

2. **API Endpoints**
   - Test the various endpoints provided by the products module (e.g., `GET /products`, `POST /products`, etc.).

## Troubleshooting

- Ensure Docker is installed and running.
- Verify the `.env` file contains correct PostgreSQL credentials.
- Check the logs for errors by running:
  ```bash
  docker-compose logs
  ```

