# BiteBridge 🍎

BiteBridge is a community-driven food sharing platform that connects generous donors with people in need, reducing food waste and fighting hunger one meal at a time.

**Live Site:** [https://bite-bridge-auth.web.app](https://bite-bridge-auth.web.app)

## Key Features

- **Secure Firebase Authentication** — Email/password and Google OAuth login with password validation (uppercase, lowercase, min 6 chars). Private routes stay protected on reload.
- **Food Request System** — Logged-in users can request available food items via a modal with location, contact number, and reason fields. Donators see all incoming requests and can Accept or Reject them directly from the food details page.
- **Full CRUD Food Management** — Donors can add food with imgbb image hosting, update listings with pre-filled forms, and delete items with SweetAlert2 confirmation. Food status automatically changes to "donated" when a request is accepted.
- **Dynamic Featured Foods** — Home page displays the top 6 food items by quantity, fetched live from MongoDB, with smooth Framer Motion animations throughout.
- **Protected API with Firebase Token Middleware** — All POST, PUT, PATCH, and DELETE server routes are secured with Firebase Admin SDK token verification. Axios interceptors automatically attach the ID token to every request.

## Tech Stack

- **Frontend:** React 19, React Router 7, TanStack Query 5, Framer Motion, Tailwind CSS 4, React Hook Form, Lucide React, SweetAlert2
- **Backend:** Node.js, Express 5, MongoDB with Mongoose, Firebase Admin SDK
- **Hosting:** Firebase (Client), Vercel (Server), imgbb (Images)

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

2. Create `.env` in `client/`:
   ```
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_IMGBB_API_KEY=your_imgbb_key
   VITE_API_BASE_URL=http://localhost:5000
   ```

3. Create `.env` in `server/`:
   ```
   MONGO_URI=your_mongodb_uri
   PORT=5000
   FIREBASE_SERVICE_ACCOUNT=your_firebase_admin_json
   ```

4. Run locally:
   ```bash
   # Client
   cd client && npm run dev
   # Server
   cd server && npm run dev
   ```

---
Built with ❤️ for a Hunger-Free Community.
