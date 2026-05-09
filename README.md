# 📔 DevLogs - Share Your Developer Journey

> **A modern platform for developers to share daily progress, build streaks, and connect with the community**

![GitHub](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![Java](https://img.shields.io/badge/Java-17+-orange)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## ✨ Overview

**DevLogs** is a beautiful, interactive web application designed for developers to document their coding journey, celebrate progress, and connect with fellow developers. Whether you're learning a new framework, building a side project, or tracking daily wins — DevLogs is your perfect companion.

Built with modern technologies and designed for an exceptional user experience.

---

## 🎯 Key Features

### 📝 **Create & Share Dev Logs**
- Write rich, detailed posts about your coding progress
- Add tags to categorize your work (React, Python, Web Dev, etc.)
- Share your learning experiences with the community

### 🔥 **Streak Counter**
- Build daily streaks to track consistent coding habits
- Watch your 🔥 grow as you post daily updates
- Get motivation from your streaks and milestones

### ❤️ **Like & Engage**
- Like other developers' posts to show appreciation
- Get likes on your own content
- Build community recognition

### 💬 **Comments & Discussion**
- Comment on posts to provide feedback
- Engage in meaningful discussions with developers
- Learn from others' experiences and insights

### 👤 **User Profiles**
- Personal profile showcasing all your dev logs
- Display your stats: total posts, likes, comments received
- Show off your current streak 🔥

### 🌙 **Dark Mode Support**
- Eye-friendly dark theme
- Smooth theme toggle
- Persists your preference

### 📱 **Fully Responsive**
- Works beautifully on desktop, tablet, and mobile
- Touch-friendly interface
- Optimized performance

### 🔐 **Secure Authentication**
- JWT-based authentication
- Secure password hashing with bcrypt
- Token-based API protection

---

## 🛠️ Tech Stack

### **Frontend**
- ⚛️ **React 18** - UI library
- 🎨 **Tailwind CSS** - Styling & responsive design
- 🏪 **Zustand** - State management
- 🔌 **Axios** - HTTP client
- ⚡ **Vite** - Build tool (lightning fast)

### **Backend**
- ☕ **Spring Boot 3.0** - Java framework
- 🗄️ **PostgreSQL** - Relational database
- 🔐 **JWT** - Authentication tokens
- 🔒 **Spring Security** - Authorization & protection
- 🏗️ **Maven** - Build management

### **Deployment**
- 🌐 **Vercel** - Frontend hosting (auto CI/CD)
- 🚀 **Render** - Backend hosting
- 📦 **GitHub** - Version control & CI/CD

---

## 🎨 Design Highlights

### Color Palette
- **Primary**: Pastel Pink `#FFB3D9`
- **Secondary**: Pastel Lavender `#C9B1FF`
- **Accent**: Pastel Yellow `#FFF8DC`
- **Dark Mode**: Elegant grays and deep blues

### UI Components
- Smooth animations and transitions
- Glassmorphism effects in hero sections
- Hover effects and interactive feedback
- Beautiful card-based layout
- Consistent spacing and typography

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16+ and npm
- **Java** 17+
- **PostgreSQL** database
- **Git** for version control

### Quick Start

#### **1. Clone the Repository**
```bash
git clone https://github.com/PhantomCodeGhost/devlogs.git
cd devlogs
```

#### **2. Setup Frontend**
```bash
cd devlog-frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

#### **3. Setup Backend**
```bash
cd ../devlog-backend
# Configure database in application.properties
mvn clean install
mvn spring-boot:run
```
Backend runs on `http://localhost:8080`

#### **4. Open in Browser**
Navigate to `http://localhost:5173` and start creating dev logs!

---

## 📁 Project Structure

```
devlogs/
├── devlog-frontend/                 # React/Vite frontend
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── components/             # Reusable components
│   │   │   ├── DevLogCard.jsx
│   │   │   ├── CommentSection.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── store/                  # Zustand stores
│   │   │   ├── authStore.js
│   │   │   ├── devlogStore.js
│   │   │   └── commentStore.js
│   │   ├── services/
│   │   │   └── api.js              # Axios instance
│   │   └── App.jsx
│   └── package.json
│
├── devlog-backend/                  # Spring Boot backend
│   ├── src/main/java/com/devlog/
│   │   ├── controller/             # REST endpoints
│   │   ├── service/                # Business logic
│   │   ├── repository/             # Data access
│   │   ├── entity/                 # JPA entities
│   │   ├── dto/                    # Data transfer objects
│   │   ├── security/               # JWT & auth
│   │   └── config/                 # Configuration
│   ├── application.properties       # Configuration file
│   └── pom.xml
│
└── README.md
```

---

## 🔑 Key API Endpoints

### **Authentication**
```
POST   /api/auth/register       Register new user
POST   /api/auth/login          Login & get JWT token
```

### **Dev Logs**
```
POST   /api/logs                Create new dev log
GET    /api/logs                Get feed (all dev logs)
GET    /api/logs/my             Get user's own logs
GET    /api/logs/:id            Get specific log
PUT    /api/logs/:id            Update dev log
DELETE /api/logs/:id            Delete dev log
POST   /api/logs/:id/like       Toggle like on log
```

### **Comments**
```
POST   /api/logs/:id/comments   Create comment
GET    /api/logs/:id/comments   Get all comments
```

### **Users**
```
GET    /api/users/me            Get current user info
GET    /api/users/:id           Get user profile
GET    /api/users/:id/logs      Get user's logs
GET    /api/users/streak        Get user's streak
```

---

## 🔐 Authentication Flow

1. **Register**: User creates account → Password hashed with bcrypt
2. **Login**: User enters credentials → Backend validates
3. **Token**: Server generates JWT token
4. **Storage**: Frontend stores token in localStorage
5. **API Calls**: Token included in Authorization header
6. **Validation**: Each request verified by JWT filter

---

## 📊 Database Schema

### Users Table
```sql
users (
  id BIGINT PRIMARY KEY,
  username VARCHAR(30) UNIQUE,
  email VARCHAR(120) UNIQUE,
  password_hash VARCHAR,
  streaks INT DEFAULT 0,
  last_active_date DATE,
  avatar VARCHAR,
  created_at TIMESTAMP
)
```

### Dev Logs Table
```sql
dev_logs (
  id BIGINT PRIMARY KEY,
  user_id BIGINT FOREIGN KEY,
  title VARCHAR(255),
  content TEXT,
  tags JSONB,
  likes_count INT,
  comments_count INT,
  created_at TIMESTAMP
)
```

### Comments Table
```sql
comments (
  id BIGINT PRIMARY KEY,
  dev_log_id BIGINT FOREIGN KEY,
  user_id BIGINT FOREIGN KEY,
  content TEXT,
  created_at TIMESTAMP
)
```

---

## 🎯 How Streaks Work

**Streaks** are automatically calculated based on consecutive days of posting:

- **Day 1**: Create first log → Streak = 🔥 1
- **Day 2**: Post again → Streak = 🔥 2 (consecutive!)
- **Day 3**: Skip posting → Streak stays at 2
- **Day 4**: Post again → Streak = 🔥 1 (broken, resets)
- **Day 5**: Post tomorrow → Streak = 🔥 2 (rebuild)

Each calendar day counts only once, even if you post multiple logs.

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Connect GitHub repo to Vercel
# Auto-deploys on every push to main branch
# Live at: https://devlogs-five.vercel.app
```

### Backend (Render)
```bash
# Deploy Spring Boot app
# Live at: https://devlogs-j594.onrender.com
```

---

## 📚 Environment Variables

### Frontend (.env)
```
VITE_API_URL="YOUR_URL"
```

### Backend (application.properties)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/devlogs
spring.datasource.username=postgres
spring.datasource.password=your_password
jwt.secret=your_jwt_secret_key
jwt.expiration=86400000
```

---

## 🐛 Known Issues & Solutions

### Comments Not Displaying
**Solution**: Update endpoint to `/logs/{id}/comments`

### Streaks Always Zero
**Solution**: Ensure `DevLogService` updates streaks on post creation

### CORS Errors
**Solution**: Add your frontend URL to backend CORS configuration

See [Issues](https://github.com/PhantomCodeGhost/devlogs/issues) for more details.

---

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Test your changes locally
- Update documentation as needed

---

## 📝 Features Roadmap

- [ ] Direct messaging between users
- [ ] User notifications & activity feed
- [ ] Achievement badges & milestones
- [ ] Advanced search & filtering
- [ ] Dev log drafts
- [ ] Export logs as PDF
- [ ] Social sharing (Twitter, LinkedIn)
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard
- [ ] Community challenges

---

## 📖 Documentation

- [Frontend Setup Guide](./devlog-frontend/README.md)
- [Backend Setup Guide](./devlog-backend/README.md)
- [API Documentation](./API_DOCS.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgments

- **React Team** - Amazing UI library
- **Spring Boot Team** - Robust backend framework
- **Tailwind CSS** - Beautiful styling
- **PostgreSQL** - Reliable database
- **Community** - Feedback and support

---

## 👨‍💻 Author

**Parth Lohar**
- GitHub: [@parthlohar06](https://github.com/PhantomCodeGhost)
- Email: parth@devlogs.com

---

## 💬 Support

Have questions or found a bug? 

- **Issues**: [GitHub Issues](https://github.com/PhantomCodeGhost/devlogs/issues)
- **Email**: support@devlogs.com
- **Discord**: [Join Community Server](#)

---

## 🌟 Show Your Support

If you find DevLogs helpful, please give it a ⭐️ on GitHub!

```
╔═══════════════════════════════════════╗
║                                       ║
║  Made with ❤️  for the developer     ║
║         community worldwide          ║
║                                       ║
╚═══════════════════════════════════════╝
```

---

**Happy Coding! 🚀 Keep sharing your journey!**

