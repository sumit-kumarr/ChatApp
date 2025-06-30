# ChatApp Made By sumit

![ChatApp Logo](./public/logo1.png)

A modern real-time chat application with user-to-user messaging and an integrated AI chatbot powered by Google Gemini API.

---

## 🚀 Features
- **Real-time Messaging:** Chat instantly with other users.
- **AI Chatbot:** Chat with "ChatWithAI" for instant answers using Gemini API.
- **User Authentication:** Secure login and profile management.
- **Media Sharing:** Send and view images in chat.
- **Online Status:** See who is online.
- **Responsive UI:** Beautiful, mobile-friendly design.

---

## 🖼️ Preview
![ChatApp Screenshot](./public/logo1.png)

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ChatApp.git
cd ChatApp/Client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
- Add your Gemini API key in `src/lib/geminiApi.js`:
  ```js
  const apiKey = 'YOUR_GEMINI_API_KEY';
  ```
- Make sure your backend server is running (see `/Server` folder for setup).

### 4. Start the App
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or as shown in your terminal).

---

## 🤖 Chatbot Integration
- Click on **ChatWithAI** in the sidebar to chat with the Gemini-powered bot.
- The bot responds in real time to your questions.

---

## 📁 Project Structure
```
Client/
  public/           # Static assets (logos, images)
  src/
    Components/     # React components (Sidebar, ChatContainer, etc.)
    assets/         # UI images and icons
    lib/            # Utility functions (Gemini API)
    context/        # React Context for Auth and Chat
    pages/          # Page components (Home, Login, Profile)
  package.json      # Project metadata and scripts
  README.md         # This file
```

---

## 🙏 Credits
- [Google Gemini API](https://ai.google.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📜 License
This project is for educational purposes.
