# E-commerce Application Setup Guide:
## Frontend

_Create and Configure the .env File_
* Create a new .env file in your frontend directory and add the following variables. You can obtain these values from your Firebase and Stripe accounts.

**VITE_FIREBASE_KEY** = your_VITE_FIREBASE_KEY

**VITE_AUTH_DOMAIN** = your_VITE_AUTH_DOMAIN

**VITE_PROJECT_ID** = your_VITE_PROJECT_ID

**VITE_STORAGE_BUCKET** = your_VITE_STORAGE_BUCKET

**VITE_MESSAGING_SENDER_ID** = your_VITE_MESSAGING_SENDER_ID

**VITE_APP_ID** = your_VITE_APP_ID

**VITE_SERVER** = http://localhost:4000

**VITE_STRIPE_KEY** = your_VITE_STRIPE_KEY


## Steps to Start the Frontend
  **Install Dependencies**
  
_npm install_

**Run the Frontend**


_npm run dev_

## Backend
**Create and Configure the .env File**

Create a new .env file in your backend directory and add the following variables. You can obtain these values from your MongoDB and Stripe accounts.

_PORT = 4000_

_MONGO_URI = your_MONGO_URI_

_STRIPE_KEY = your_VITE_STRIPE_KEY_

_PORT: The port on which your backend server will run (usually 4000)._

## Steps to Start the Backend

**Install Dependencies**


_npm install_

**Build the TypeScript Files**

_tsc -w_

### Run the Backend


_npm run dev_



## Card NO 
**while doing payment if it shows an error  use this card no**

<<<<<<< HEAD
_4000003560000297_ || _4000003560000123_
=======
_4000003560000297_ || _4000003560000123_
>>>>>>> 345e8500310453e9fa4ddf16aeb2a29fbd2a5363
