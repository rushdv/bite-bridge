<div align="center">

# 🍊 BiteBridge

### *Share Food. Spread Happiness. End Hunger.*

A full-stack community food sharing platform that connects generous donors with people in need — reducing food waste one meal at a time.

[![Live Site](https://img.shields.io/badge/Live%20Site-BiteBridge-orange?style=for-the-badge&logo=firebase)](https://bite-bridge-auth.web.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com)

**🌐 Live Site:** [https://bite-bridge-auth.web.app](https://bite-bridge-auth.web.app)

</div>

---

## ✨ Key Features

- **🔐 Secure Firebase Authentication** — Email/password and Google OAuth login with strict password validation (uppercase, lowercase, minimum 6 characters). Private routes stay protected on page reload — no unwanted redirects.

- **🍽️ Food Request System** — Any logged-in user can request available food via a modal with their location, contact number, and reason. Donators see all incoming requests in a live table and can **Accept** or **Reject** each one directly from the food details page.

- **📦 Full CRUD Food Management** — Donors can add food with imgbb image hosting, update listings with pre-filled forms, and delete items with SweetAlert2 confirmation. Food status automatically changes to `donated` when a request is accepted.

- **🏠 Dynamic Home Page** — Featured Foods section displays the top 6 items by quantity, fetched live from MongoDB. Smooth Framer Motion animations on banner, cards, and section transitions throughout.

- **🛡️ Protected API with Firebase Token Middleware** — All POST, PUT, PATCH, and DELETE routes are secured with Firebase Admin SDK token verification. Axios interceptors automatically attach the Firebase ID token to every outgoing request.

---

## 🖥️ Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home — Banner, Featured Foods, How It Works, Mission |
| `/available-foods` | Public | Browse all available food items with search & sort |
| `/food/:id` | Private | Full food details + Request modal + Donator request table |
| `/add-food` | Private | Add a new food listing with image upload |
| `/manage-my-foods` | Private | Edit or delete your own food listings |
| `/my-food-requests` | Private | Track status of all your food requests |
| `/update-food/:id` | Private | Update an existing food listing |
| `/login` | Public | Email/password + Google login |
| `/register` | Public | Create a new account |

---

## 🛠️ Tech Stack

**Frontend**
- React 19, React Router 7
- TanStack Query v5 (data fetching & caching)
- React Hook Form (form management)
- Framer Motion (animations)
- Tailwind CSS v4
- Lucide React, SweetAlert2, React Hot Toast
- imgbb API (image hosting)

**Backend**
- Node.js, Express 5
- MongoDB with Mongoose
- Firebase Admin SDK (token verification)
- CORS, dotenv

**Hosting**
- Firebase Hosting (Client)
- Vercel (Server)

---

## 🚀 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/bite-bridge.git
cd bite-bridge
```

### 2. Install dependencies

```bash
# Client
cd client
npm install

# Server (from root)
cd ..
npm install
```

### 3. Configure environment variables

Create `client/.env`:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_API_BASE_URL=http://localhost:5000
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

> Get Firebase Admin credentials from: Firebase Console → Project Settings → Service Accounts → Generate new private key

### 4. Run locally

```bash
# Start server (from root)
npm run dev

# Start client (in a new terminal)
cd client
npm run dev
```

Client runs on `http://localhost:5173` — Server runs on `http://localhost:5000`

---

## 📁 Project Structure

```
bite-bridge/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── api/             # Axios instance & endpoints
│   │   ├── components/      # Navbar, Footer, UI components
│   │   ├── context/         # Firebase Auth context
│   │   ├── hooks/           # useAuth custom hook
│   │   ├── pages/           # All page components
│   │   ├── routes/          # Router & PrivateRoute
│   │   └── utils/           # imageUpload, formatDate, etc.
│   └── public/
│       └── _redirects       # Netlify SPA routing fix
│
├── server/                  # Node.js backend
│   ├── config/              # DB & Firebase Admin setup
│   ├── controllers/         # foodController, requestController
│   ├── middleware/          # verifyToken (Firebase Auth)
│   ├── models/              # Food & Request Mongoose models
│   └── routes/              # foodRoutes, requestRoutes
│
├── vercel.json              # Vercel deployment config
└── package.json             # Server dependencies & scripts
```

---

## 🔒 Security

- Firebase ID tokens verified on every protected API route
- `.env` files excluded from version control via `.gitignore`
- CORS configured to allow only specified client origins

