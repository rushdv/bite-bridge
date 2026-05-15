<div align="center">

# 🍊 BiteBridge

### *Share Food. Spread Happiness. End Hunger.*

A full-stack community food sharing platform that connects generous donors with people in need — reducing food waste one meal at a time.

[![Live Site](https://img.shields.io/badge/Live%20Site-BiteBridge-orange?style=for-the-badge&logo=netlify)](https://bitebridge.netlify.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com)

**Live Site:** [https://bitebridge.netlify.app](https://bitebridge.netlify.app)
**API:** [https://bite-bridge-xi.vercel.app](https://bite-bridge-xi.vercel.app)

</div>

---

## Features

- **Secure Firebase Authentication** — Email/password and Google OAuth login. Private routes stay protected on page reload.

- **Food Request System** — Logged-in users can request available food via a modal with location, contact number, and reason. Donators see all incoming requests and can Accept or Reject each one from the food details page.

- **Full CRUD Food Management** — Donors can add food with Cloudinary image hosting, update listings with pre-filled forms, and delete items with confirmation. Food status automatically changes to `Donated` when a request is accepted.

- **Dynamic Home Page** — Featured Foods section displays the top 6 items by quantity fetched live from MongoDB. Framer Motion animations throughout.

- **Protected API** — All POST, PUT, PATCH, and DELETE routes secured with Firebase Admin SDK token verification. Axios interceptors automatically attach the token to every request.

- **Authorization** — Users can only modify their own food items and requests. Ownership is verified server-side on every mutating endpoint.

- **Input Validation** — All POST/PUT routes validate required fields, types, and business rules (e.g. expiry date must be in the future) before hitting the database.

- **Pagination** — Available Foods page supports paginated browsing (20 items per page).

- **Rate Limiting** — API protected with 100 requests per 15 minutes per IP.

---

## Pages

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home — Banner, Featured Foods, How It Works, Mission |
| `/available-foods` | Public | Browse all available food with search, sort and pagination |
| `/food/:id` | Private | Food details, Request modal, Donator request management table |
| `/add-food` | Private | Add a new food listing with image upload |
| `/manage-my-foods` | Private | Edit or delete your own food listings |
| `/my-food-requests` | Private | Track status of all your food requests |
| `/update-food/:id` | Private | Update an existing food listing |
| `/login` | Public | Email/password + Google login |
| `/register` | Public | Create a new account |

---

## Tech Stack

**Frontend**
- React 19, React Router 7
- TanStack Query v5
- React Hook Form
- Framer Motion
- Tailwind CSS v4
- Lucide React, SweetAlert2, React Hot Toast
- Cloudinary (image hosting)

**Backend**
- Node.js, Express
- MongoDB with Mongoose
- Firebase Admin SDK
- express-rate-limit
- CORS, dotenv

**Hosting**
- Netlify (Client)
- Vercel (Server)

---

## Getting Started Locally

### 1. Clone

```bash
git clone https://github.com/rushdv/bite-bridge.git
cd bite-bridge
```

### 2. Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 3. Environment variables

`client/.env`:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_API_BASE_URL=http://localhost:5000
```

`server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173,https://your-site.netlify.app
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

> Firebase Admin credentials: Firebase Console → Project Settings → Service Accounts → Generate new private key

> Cloudinary upload preset: cloudinary.com → Settings → Upload → Upload Presets → Add preset → set mode to **Unsigned**

### 4. Run

```bash
# Server
cd server && npm run dev

# Client (new terminal)
cd client && npm run dev
```

Client: `http://localhost:5173` — Server: `http://localhost:5000`

---

## Deployment

### Client (Netlify)

`netlify.toml` at repo root handles build config:

```toml
[build]
  base = "client"
  command = "npm ci && npm run build"
  publish = "dist"
```

Add these in **Netlify → Site → Environment Variables**:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_CLOUDINARY_CLOUD_NAME
VITE_CLOUDINARY_UPLOAD_PRESET
VITE_API_BASE_URL=https://your-server.vercel.app
```

### Server (Vercel)

Add these in **Vercel → Project → Settings → Environment Variables**:

```
MONGO_URI
CLIENT_URL=https://your-site.netlify.app,http://localhost:5173
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
```

---

## Project Structure

```
bite-bridge/
├── client/
│   ├── src/
│   │   ├── api/             # Axios instance & endpoint constants
│   │   ├── components/      # Layout, UI components
│   │   ├── context/         # Firebase Auth context
│   │   ├── hooks/           # useAuth, useFoods, useRequests
│   │   ├── pages/           # All page components
│   │   ├── routes/          # Router & PrivateRoute
│   │   └── utils/           # imageUpload (Cloudinary), formatDate, validation
│   └── public/
│       └── _redirects       # Netlify SPA routing fix
│
├── server/
│   ├── config/              # DB & Firebase Admin setup
│   ├── controllers/         # foodController, requestController
│   ├── middleware/          # verifyToken, validation, errorHandler
│   ├── models/              # Food & Request Mongoose schemas
│   └── routes/              # foodRoutes, requestRoutes
│
├── netlify.toml
├── vercel.json
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/foods` | No | Get all available foods (paginated) |
| GET | `/api/foods/featured` | No | Get top 6 foods by quantity |
| GET | `/api/foods/:id` | No | Get single food by ID |
| GET | `/api/foods/my-foods/:email` | Yes | Get logged-in user's foods |
| POST | `/api/foods` | Yes | Add new food item |
| PUT | `/api/foods/:id` | Yes | Update own food item |
| DELETE | `/api/foods/:id` | Yes | Delete own food item |
| POST | `/api/requests` | Yes | Submit a food request |
| GET | `/api/requests/my-requests/:email` | Yes | Get own requests |
| GET | `/api/requests/food/:foodId` | Yes | Get requests for a food (donator only) |
| PATCH | `/api/requests/:id/status` | Yes | Accept or reject a request (donator only) |
