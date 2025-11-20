# Balaji Mobiles API Documentation

Base URL: `http://localhost:8000` (Development) or your deployed backend URL

## Authentication

Admin endpoints require a JWT token from Supabase Auth in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Health Check

#### GET /
Check if the API is running.

**Response:**
```json
{
  "status": "healthy",
  "service": "Balaji Mobiles API",
  "version": "1.0.0"
}
```

---

### Phones

#### GET /phones
Get all available phones with optional filters.

**Query Parameters:**
- `available_only` (boolean, default: true) - Only show available phones
- `brand` (string) - Filter by brand name
- `min_price` (integer) - Minimum price filter
- `max_price` (integer) - Maximum price filter

**Example:**
```
GET /phones?brand=iPhone&min_price=20000&max_price=50000
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "iPhone 12",
    "brand": "iPhone",
    "price": 28500,
    "condition": "Like New",
    "description": "Excellent condition...",
    "images": ["url1", "url2"],
    "storage": "128GB",
    "battery": "89%",
    "available": true,
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

---

#### GET /phones/{id}
Get a single phone by ID.

**Path Parameters:**
- `id` (UUID) - Phone ID

**Response:**
```json
{
  "id": "uuid",
  "name": "iPhone 12",
  "brand": "iPhone",
  "price": 28500,
  "condition": "Like New",
  "description": "Excellent condition...",
  "images": ["url1", "url2"],
  "storage": "128GB",
  "battery": "89%",
  "available": true,
  "created_at": "2024-01-01T00:00:00Z"
}
```

**Error Response (404):**
```json
{
  "detail": "Phone with ID {id} not found"
}
```

---

#### POST /phones
Create a new phone listing. **Requires authentication.**

**Request Body:**
```json
{
  "name": "iPhone 12",
  "brand": "iPhone",
  "price": 28500,
  "condition": "Like New",
  "description": "Excellent condition iPhone 12...",
  "images": ["https://cloudinary.com/image1.jpg"],
  "storage": "128GB",
  "battery": "89%",
  "available": true
}
```

**Validation:**
- `name`: Required, 1-200 characters
- `brand`: Required, 1-100 characters
- `price`: Required, must be > 0
- `condition`: Required, must be "Good", "Like New", or "Excellent"
- `description`: Required, minimum 10 characters
- `images`: Required, array of 1-6 URLs
- `storage`: Required, 1-50 characters
- `battery`: Optional, max 50 characters
- `available`: Optional, default true

**Response (201):**
```json
{
  "id": "uuid",
  "name": "iPhone 12",
  ...
}
```

---

#### PUT /phones/{id}
Update a phone listing. **Requires authentication.**

**Path Parameters:**
- `id` (UUID) - Phone ID

**Request Body (all fields optional):**
```json
{
  "name": "iPhone 12 Pro",
  "price": 32000,
  "condition": "Excellent"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "iPhone 12 Pro",
  ...
}
```

---

#### DELETE /phones/{id}
Mark a phone as sold. **Requires authentication.**

This sets `available=false` instead of deleting the record.

**Path Parameters:**
- `id` (UUID) - Phone ID

**Response:**
```json
{
  "message": "Phone marked as sold successfully",
  "phone_id": "uuid"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "detail": "Invalid authentication token"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "detail": "Error message"
}
```

---

## Interactive Documentation

Once the server is running, visit:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`
