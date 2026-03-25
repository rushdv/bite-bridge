# BiteBridge 🍎

BiteBridge is a full-stack food management and sharing platform dedicated to reducing food waste and connecting community members through the sharing of surplus food.

**Live Site:** [BiteBridge Live](https://bite-bridge-auth.web.app) *(Deploy URL placeholder)*

## ✨ Key Features

-   **Secure Authentication:** Integrated Firebase Auth for Email/Password and Google Login, ensuring a safe community environment.
-   **Dynamic Food Discovery:** Browse a real-time list of available food items with advanced search and sorting by expiration date or quantity.
-   **Seamless Food Contribution:** A user-friendly "Add Food" dashboard with automated image hosting via imgbb and location tracking.
-   **Interactive Request System:** A sophisticated request modal that allows users to coordinate food pickup with community donors.
-   **Personalized Dashboards:** Dedicated management panels for donors to track their contributions and for requesters to monitor their active food requests.
-   **Responsive & Animated UI:** Built with Tailwind CSS and Framer Motion for a premium, mobile-first user experience.

## 🚀 Tech Stack

-   **Frontend:** React, React Router, TanStack Query, Framer Motion, Lucide React, React Hook Form.
-   **Backend:** Node.js, Express, MongoDB, Mongoose, Firebase Admin SDK.
-   **Hosting:** Firebase (Client), Vercel (Server), imgbb (Images).

## 🛠️ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/bite-bridge.git
    cd bite-bridge
    ```
2.  **Install dependencies:**
    ```bash
    cd client && npm install
    cd ../server && npm install
    ```
3.  **Environment Variables:**
    Create a `.env` file in both `client` and `server` folders with your API keys and configuration.
4.  **Run Locally:**
    ```bash
    # Client
    npm run dev
    # Server
    npm run start
    ```

---
Built with ❤️ for a Hunger-Free Community.
