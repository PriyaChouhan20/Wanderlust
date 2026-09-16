# Wanderlust 🌍✈️

> A full-stack, Airbnb-inspired vacation rental marketplace platform built with Node.js, Express, MongoDB, and modern server-rendered EJS templates.

[![Node.js](https://img.shields.io/badge/Node.js-v24.15.0-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-v5.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-forestgreen.svg)](https://www.mongodb.com/atlas)

---

## 📖 Project Overview

**Wanderlust** is a comprehensive property rental platform that connects property owners (hosts) and travelers. Users can explore global accommodations across diverse categories (Beachfront, Cabins, Iconic Cities, Castles, Mountains, Farms, etc.), search by destination, view detailed property pages, publish their own rental listings, and share reviews with 5-star ratings.

The platform follows a secure **Airbnb-style Role-Based Access Control (RBAC)** model, ensuring that authenticated users can manage their own listings and reviews, while platform administrators have full oversight across all listings and feedback.

---

## ✨ Key Features

- **🏠 Property Marketplace:** Browse curated stays with responsive card grids, hover animations, price formatting in Indian Rupees (`₹`), and dynamic GST tax toggles (`+18% GST`).
- **🔍 Destination Search & Category Filtering:** Instant search by destination/title and one-click filtering across curated categories (Trending, Rooms, Iconic Cities, Mountains, Castles, Amazing Pools, Camping, Farms, Arctic, Domes, Boats).
- **🔒 Secure Authentication & Sessions:** User registration, login, and logout powered by `passport` and `passport-local-mongoose` with persistent MongoDB-backed session storage (`connect-mongo`).
- **🛡️ Airbnb-Style RBAC Authorization:** Granular backend permissions protecting routes and resources by owner identity and admin roles.
- **⭐ Reviews & Star Ratings:** Visual 5-star rating system and detailed feedback section on every listing.
- **☁️ Cloud Image Uploads:** Image upload and hosting support powered by Cloudinary with `multer` and `multer-storage-cloudinary`.
- **📱 Fully Responsive Design:** Clean, Airbnb-inspired design aesthetic built with *Plus Jakarta Sans* typography, custom CSS tokens, and fluid responsiveness across mobile (320px–430px), tablet, and desktop screens.
- **🛡️ Robust Input Validation & Error Handling:** Schema validation on incoming requests via `Joi`, client-side Bootstrap form validation, and custom asynchronous error wrappers.

---

## 👥 User Roles & Access Control (RBAC)

Wanderlust implements a strict, multi-tier authorization hierarchy enforced on both UI and backend controller/middleware levels:

```
                  ┌────────────────────────┐
                  │    Visitor / Guest     │
                  └──────────┬─────────────┘
                             │ (Register / Login)
                  ┌──────────▼─────────────┐
                  │   Authenticated User   │
                  └──────────┬─────────────┘
                             │ (Elevated Privileges)
                  ┌──────────▼─────────────┐
                  │     Administrator      │
                  └────────────────────────┘
```

| Permission / Action | Guest (Unauthenticated) | Authenticated Normal User | Administrator (`role: "admin"`) |
| :--- | :---: | :---: | :---: |
| **Browse / Search Listings** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Filter by Category** | ✅ Yes | ✅ Yes | ✅ Yes |
| **View Listing Details** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Create New Listing ("Airbnb your home")** | ❌ Blocked (Redirects to Login) | ✅ Yes | ✅ Yes |
| **Edit / Update Listing** | ❌ Blocked | ✅ Only Own Listings | ✅ Any Listing |
| **Delete Listing** | ❌ Blocked | ✅ Only Own Listings | ✅ Any Listing |
| **Submit Review & Rating** | ❌ Blocked (Redirects to Login) | ✅ Yes | ✅ Yes |
| **Delete Review** | ❌ Blocked | ✅ Only Own Reviews | ✅ Any Review |
| **Admin Role Badge in Navbar** | ❌ No | ❌ No | ✅ Displayed |

---

## 🛠️ Tech Stack

### **Backend & Core**
- **Runtime:** [Node.js](https://nodejs.org/) (v24.15.0)
- **Framework:** [Express.js](https://expressjs.com/) (v5.x)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) via [Mongoose ODM](https://mongoosejs.com/) (v9.x)
- **Session Management:** [express-session](https://www.npmjs.com/package/express-session) + [connect-mongo](https://www.npmjs.com/package/connect-mongo) (v6.x)
- **Authentication:** [Passport.js](http://www.passportjs.org/) & [passport-local-mongoose](https://github.com/saintedlama/passport-local-mongoose)
- **Validation:** [Joi](https://joi.dev/) schema validator
- **File Uploads:** [Multer](https://github.com/expressjs/multer) & [multer-storage-cloudinary](https://github.com/affanshahid/multer-storage-cloudinary)
- **Flash Messages:** [connect-flash](https://github.com/jaredhanson/connect-flash)
- **HTTP Method Override:** [method-override](https://github.com/expressjs/method-override)

### **Frontend & UI**
- **Template Engine:** [EJS](https://ejs.co/) & [ejs-mate](https://github.com/JacksonTian/ejs-mate) layouts
- **Styling:** Custom Vanilla CSS Design System + [Bootstrap 5.3.2](https://getbootstrap.com/)
- **Typography:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Google Fonts)
- **Icons:** [FontAwesome 6](https://fontawesome.com/)

---

## 📁 Project Folder Structure

```
MajorProject/
├── controllers/              # MVC Controller logic
│   ├── listings.js           # Listing CRUD & query handlers
│   ├── reviews.js            # Review creation & deletion handlers
│   └── users.js              # Signup, login, and logout handlers
├── init/                     # Database seeding scripts
│   ├── data.js               # Sample listing dataset
│   └── index.js              # Database initialization runner
├── models/                   # Mongoose schemas & data models
│   ├── listing.js            # Property listing model (refs Review & User)
│   ├── review.js             # Review model (refs User author)
│   └── user.js               # User model with role ('user' | 'admin')
├── public/                   # Static assets
│   ├── css/
│   │   └── style.css         # Modern design tokens & responsive CSS
│   └── js/
│       └── script.js         # Form validation & scroll animations
├── routes/                   # Express route definitions
│   ├── listing.js            # /listings routes
│   ├── review.js             # /listings/:id/reviews routes
│   └── user.js               # /signup, /login, /logout routes
├── utils/                    # Utility classes & error helpers
│   ├── ExpressError.js       # Custom operational error class
│   └── wrapAsync.js          # Async exception handler wrapper
├── views/                    # EJS templates & views
│   ├── includes/             # Reusable view components
│   │   ├── flash.ejs         # Toast alert banner component
│   │   ├── footer.ejs        # Responsive footer component
│   │   └── navbar.ejs        # Responsive navbar & search pill
│   ├── layouts/
│   │   └── boilerplate.ejs   # Base HTML boilerplate layout
│   ├── listings/             # Listing views
│   │   ├── edit.ejs          # Edit listing form view
│   │   ├── index.ejs         # Marketplace gallery & filters view
│   │   ├── new.ejs           # Create listing form view
│   │   └── show.ejs          # Detailed listing page & review list
│   ├── users/                # Auth views
│   │   ├── login.ejs         # User login form view
│   │   └── signup.ejs        # User registration form view
│   └── error.ejs             # Friendly error display view
├── .env.example              # Template for environment variables
├── .gitignore                # Ignored files (node_modules, .env)
├── app.js                    # Express application entrypoint
├── cloudConfig.js            # Cloudinary & multer storage setup
├── middleware.js             # RBAC & authentication middleware
├── package.json              # Project metadata & dependencies
├── package-lock.json         # Pinned dependency tree
├── README.md                 # Project documentation
└── schema.js                 # Joi validation schemas
```

---

## ⚙️ Installation & Setup

Follow these steps to run Wanderlust on your local development machine:

### 1. Prerequisites
- **Node.js v24.15.0**
- **npm** (v9.x or higher)
- **MongoDB Atlas** account (or local MongoDB server)
- **Cloudinary** account (for media storage)

### 2. Clone the Repository
```bash
git clone https://github.com/PriyaChouhan20/-Wanderlust.git
cd -Wanderlust
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Open `.env` and populate the variables with your credentials:
```env
# MongoDB Connection String (Atlas or Local)
ATLASDB_URL=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/wanderlust?retryWrites=true&w=majority

# Express Session Secret
SECRET=your_super_secret_session_key_here

# Cloudinary Credentials (for image upload)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 5. Seed the Database (Optional)
To populate the database with sample properties and a default owner:
```bash
node init/index.js
```

### 6. Start the Application
- **Development Mode (with auto-reload):**
  ```bash
  npm run dev
  ```
- **Production Mode:**
  ```bash
  npm start
  ```

Open your browser and navigate to:
```
http://localhost:8080
```

---

## 🔒 Security Best Practices Implemented

- **Credential Protection:** Secrets, API keys, and database passwords are managed exclusively through environment variables and strictly excluded from version control via `.gitignore`.
- **Password Hashing & Salting:** Passwords are never stored in plaintext; `passport-local-mongoose` uses PBKDF2 hashing with unique cryptographic salts.
- **Server-Side Authorization Enforced:** All sensitive operations (`POST`, `PUT`, `DELETE`) are protected with middleware (`isLoggedIn`, `isOwner`, `isReviewAuthor`, `isAdmin`) on the route level, preventing unauthorized access regardless of client-side modifications.
- **Input Sanitization & Schema Validation:** `Joi` validates structured inputs before controller processing to prevent injection and payload corruption.
- **Secure Cookie & Session Store:** Sessions are stored remotely in MongoDB with `httpOnly` flags, configurable expirations, and encrypted secrets.

---

## 🚀 Future Roadmap & Enhancements

- [ ] **Interactive Booking & Reservations:** Date-range picker for reservation management and availability calendars.
- [ ] **Payment Gateway Integration:** Stripe / Razorpay integration for simulated booking transactions.
- [ ] **User Profile Management:** Edit profile picture, bio, and view hosted property analytics.
- [ ] **Wishlist / Favorites:** User-specific saved listings collection.
- [ ] **Instant Messaging:** Host-to-guest messaging before booking confirmation.

---

## 👩‍💻 Author

**Priya Chouhan**  
- **GitHub:** [@PriyaChouhan20](https://github.com/PriyaChouhan20)  
- **Repository:** [PriyaChouhan20/-Wanderlust](https://github.com/PriyaChouhan20/-Wanderlust)
