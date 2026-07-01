# Young Man 🏋️‍♂️ — Fitness & Gym Management Platform

**Developed by:** Ashik

Young Man is a full-stack Fitness & Gym Management Platform built for fitness enthusiasts, trainers, and administrators. Members can discover and book fitness classes, engage in a community forum, and track their fitness journey. Trainers can manage their own classes and share knowledge through posts, while admins oversee the entire platform — users, trainers, classes, and community content — from a centralized dashboard.

## 🎯 Purpose

The goal of this project is to provide a seamless, role-based platform where:
- **Users** can browse classes, book sessions, apply to become trainers, and interact with the community forum.
- **Trainers** can create and manage classes, track enrolled students, and publish forum content.
- **Admins** can manage users, approve/reject trainer applications and classes, and moderate the community forum — ensuring a safe and high-quality experience for everyone.

## 🔗 Live URL

[https://young-man.vercel.app/](https://young-man.vercel.app/)

## 🔑 Admin Credentials

- **Email:** admin@gmail.com.com
- **Password:** rahman1234

## ✨ Key Features

- 🔐 Secure authentication with **Better Auth** — supports credential login and Google login, with JWT stored in an HTTPOnly cookie and role-based route protection (User / Trainer / Admin).
- 🏫 Browse, search (MongoDB `$regex`), and filter (MongoDB `$in`) all approved fitness classes with server-side pagination.
- 📅 Detailed class pages with booking validation — prevents duplicate bookings and duplicate favorites, with instant toast feedback.
- 💳 Stripe-powered checkout for secure class payments, with automatic booking confirmation on success.
- ❤️ Add-to-favorites system so users can save and manage their preferred classes.
- 💬 Community Forum with likes/dislikes, threaded comments, and full CRUD on personal comments.
- 🧑‍🏫 Trainer application workflow — users can apply, admins can approve/reject with feedback, and status is reflected live on the user's dashboard.
- 🛠️ Role-based dashboards for **User**, **Trainer**, and **Admin**, each with tailored statistics, tables, and management tools.
- 🚫 Soft-block system — blocked users can browse but cannot perform state-changing actions (booking, commenting, applying).
- 📊 Admin analytics, transaction history, and full moderation controls over users, trainers, classes, and forum posts.
- 🎞️ Smooth UI animations powered by Framer Motion, a fully responsive layout, and light/dark theme support.
- ⚠️ Custom animated 404 page and global loading skeleton/spinner for a polished UX.

## 📦 NPM Packages Used

**Frontend:**
- `next.js`, `app-router`
- `fetch`, ``
- `better-auth`
- `framer-motion` / `motion`
- `recharts`
- `react-hot-toast` / `sweetalert2`
- `@stripe/react-stripe-js`, `@stripe/stripe-js`
- `heroUi`
- `tailwindcss`, `daisyui`
- `gravity ui icons`
- `swiper`

**Backend:**
- `express`
- `mongodb`
- `jsonwebtoken`
- `cookie-parser`
- `cors`
- `dotenv`
- `stripe`

## 🗂️ GitHub Repositories

- **Client:** _[[Add your client repository link here](https://github.com/halimaashu/YongMan)]_
- **Server:** _[[Add your server repository link here](https://github.com/halimaashu/young-man-server)]_

## 🧰 Tech Stack

React · Express.js · MongoDB · Better Auth · Stripe · JWT · Tailwind CSS · Framer Motion · Recharts

---

Made with 💪 by **Ashik**