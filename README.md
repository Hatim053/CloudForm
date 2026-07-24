# CloudForm

CloudForm is a full-stack form builder inspired by Typeform and Youform — 
create forms to collect responses from customers, clients, leads, and 
waitlists, with secure authentication and a clean, shareable form experience.

## Features

- 🧩 Form builder with multiple question types (short text, multiple choice, 
  rating, date, file upload, and more)
- 📊 Response analytics — completion rate and submission tracking
- 🔐 Secure authentication — short-lived access tokens with refresh token 
  rotation, reuse detection, and revocable sessions
- 👤 Role-based access control — admin and user roles enforced at the API 
  level
- 🔗 Shareable public forms
- ⚡ One-question-per-screen live rendering with autosave

## Tech Stack

**Frontend:** React, Tailwind CSS  
**Backend:** Node.js, Express  
**Database:** MongoDB (Mongoose)  
**Auth:** JWT (access + refresh token rotation), bcrypt, Redis (token blacklist)

## Architecture Highlights

- Form elements are code-split React components, referenced by type rather 
  than storing executable code in the database — keeping form rendering 
  fast, versioned, and secure
- Refresh tokens are hashed before storage and rotated on every use, with 
  reuse detection to catch token theft

## Roadmap

- 🖱️ Drag-and-drop form builder
- 🔀 Conditional logic — branch to different questions based on previous answers
- 🌐 Custom domain hosting for forms
- 📥 Purpose-built form types for customer feedback, client intake, lead 
  capture, and waitlists
- 🔗 Self-hosted, Linktree-style profile pages for creators/influencers to 
  showcase their socials