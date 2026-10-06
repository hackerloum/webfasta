# Webfasta — Firebase setup

The app uses Firebase Authentication, Cloud Firestore, and one Cloud Function for ZenoPay.

## 1. Create a Firebase project

Use an existing project, or create one:

```bash
npx -y firebase-tools@latest login
npx -y firebase-tools@latest projects:create <project-id> --display-name "Webfasta"
npx -y firebase-tools@latest use <project-id>
npx -y firebase-tools@latest apps:create web webfasta
```

Enable Email/Password sign-in, then deploy auth config from `firebase.json`:

```bash
npx -y firebase-tools@latest deploy --only auth
```

## 2. Web app env

Copy `.env.example` to `.env` and fill in the web config from:

```bash
npx -y firebase-tools@latest apps:sdkconfig WEB <APP_ID> --project <project-id>
```

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## 3. Firestore

```bash
npx -y firebase-tools@latest firestore:databases:create "(default)" --edition="enterprise" --location="eur3"
npx -y firebase-tools@latest deploy --only firestore
```

Collections:

- `users/{uid}` — email, fullName, subscriptionPlan, preferences, createdAt, updatedAt
- `payments/{orderId}` — written only by the payment function

## 4. ZenoPay function

```bash
npx -y firebase-tools@latest functions:secrets:set ZENOPAY_API_KEY
npx -y firebase-tools@latest deploy --only functions
```

## 5. Run the app

```bash
npm install
npm run dev
```

The dev server is `http://localhost:8080`. Add `localhost` to Authentication → Settings → Authorized domains.
