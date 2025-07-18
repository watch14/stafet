# Stafet - Visual Website Editor

A Webflow-like visual website editor that allows users to edit website content in real-time through an intuitive interface. Built with Next.js frontend and Express.js backend.

![Website Editor](https://img.shields.io/badge/Editor-Webflow--like-blue)
![Frontend](https://img.shields.io/badge/Frontend-Next.js%2015-black)
![Backend](https://img.shields.io/badge/Backend-Express.js-green)
![Database](https://img.shields.io/badge/Storage-File--based-orange)

## 🎯 Overview

Stafet is a complete visual website editor that enables non-technical users to edit website content, styling, and layout through a user-friendly interface. The system provides real-time editing capabilities similar to Webflow, with features like drag-and-drop editing, color pickers, image uploads, and live preview.

## ✨ Features

### Frontend Features
- 🎨 **Real-time Visual Editor** - Edit content and see changes instantly
- 🖱️ **Click-to-Edit Interface** - Click any section to open its editor
- 🎨 **Advanced Color Picker** - Choose colors with visual picker or hex codes
- 📸 **Image Upload & Management** - Upload and manage website images
- 💾 **Auto-save & Manual Save** - Changes are auto-saved with manual save options
- 🔐 **Admin Authentication** - Secure login system for content editors
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Real-time Preview** - See changes as you make them
- 🎯 **Section-based Editing** - Edit specific sections (Hero, About, Footer, etc.)
- 💼 **Configuration Management** - Save and load different website configurations

### Backend Features
- 🔄 **RESTful API** - Clean API for frontend communication
- 💾 **File-based Storage** - JSON-based configuration storage
- 📁 **Image Upload API** - Handle image uploads and management
- 🔒 **CORS Protection** - Secure cross-origin requests
- ✅ **Data Validation** - Joi-based request validation
- 🛡️ **Error Handling** - Comprehensive error management
- 📊 **Multiple Configurations** - Support for multiple site configurations

## 🏗️ Architecture

```
stafet/
├── edit front/          # Next.js Frontend Application
│   ├── src/
│   │   ├── app/         # Next.js App Router pages
│   │   ├── components/  # React components & editors
│   │   ├── contexts/    # React context providers
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility libraries
│   │   └── store/       # Zustand state management
│   └── public/          # Static assets
└── edit back/           # Express.js Backend API
    ├── src/
    │   ├── controllers/ # API route handlers
    │   ├── middleware/  # Express middleware
    │   └── routes/      # API route definitions
    └── data/            # JSON data storage
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd stafet
```

### 2. Setup Backend
```bash
cd "edit back"
npm install
npm run dev
```

The backend will start on `http://localhost:3001`

### 3. Setup Frontend
```bash
cd "edit front"
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

### 4. Access the Editor
1. Visit `http://localhost:3000`
2. Go to `/admin/login` to access admin features
3. Enable "Edit Mode" to start editing
4. Click on any section to open its editor

## 📖 Usage Guide

### For Content Editors

#### Getting Started
1. **Login** - Access the admin panel at `/admin/login`
2. **Enable Edit Mode** - Click the "Enter Edit Mode" button
3. **Click to Edit** - Click any section with blue dashed borders
4. **Make Changes** - Use the left panel editor to modify content
5. **Save** - Changes auto-save, or use manual save buttons

#### Editing Sections
- **Hero Section** - Main banner, headlines, and call-to-action
- **Navigation** - Logo, menu links, and CTA button
- **Client Logos** - Partner and client logo showcase
- **Testimonials** - Customer reviews and testimonials
- **Value Proposition** - Key benefits and value statements
- **Process Section** - Step-by-step process explanation
- **About Page** - Company information and story
- **Contact Page** - Contact form and company details
- **Footer** - Bottom section with links and contact info

#### Available Editing Options
- ✏️ **Text Content** - Headlines, descriptions, button text
- 🎨 **Colors** - Text colors, background colors, button colors
- 📸 **Images** - Upload new images or select from library
- 🔗 **Links** - Update URLs for buttons and navigation
- 📱 **Layout** - Adjust spacing and arrangement

### For Developers

#### Project Structure
```
Frontend (Next.js):
├── app/                 # Next.js 13+ App Router
├── components/          # Reusable React components
│   ├── *Editor.tsx     # Section-specific editors
│   ├── *Section.tsx    # Display components
│   └── ui/             # UI utility components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
└── lib/                # Utility functions

Backend (Express.js):
├── controllers/        # Business logic
├── middleware/         # Express middleware
├── routes/             # API endpoints
└── data/              # File storage
```

#### Key Technologies
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Zustand
- **Backend**: Express.js, Node.js, Joi validation, Multer, fs-extra
- **Storage**: File-based JSON storage for configurations
- **Authentication**: Custom auth context with secure session management

## 🔧 API Documentation

### Editor Configuration Endpoints
```
GET    /api/editor/configuration          # Get current configuration
GET    /api/editor/configuration/:id      # Get specific saved configuration  
POST   /api/editor/configuration          # Save as current configuration
PUT    /api/editor/configuration/:id      # Save as named configuration
DELETE /api/editor/configuration/:id      # Delete saved configuration
GET    /api/editor/configurations         # Get all saved configurations
```

### File Upload Endpoints
```
POST   /api/upload/image                  # Upload image file
DELETE /api/upload/image/:filename        # Delete uploaded image
GET    /api/upload/images                 # List all uploaded images
```

### Health Check
```
GET    /health                           # Server health status
```

## ⚙️ Configuration

### Environment Variables

**Backend (.env)**
```
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
DATA_PATH=./data
UPLOAD_PATH=./uploads
```

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Data Storage
- Configuration data: `./data/configurations.json`
- Uploaded images: `./uploads/`
- All data is stored in JSON format for easy backup and migration

## 🛠️ Development

### Running in Development
```bash
# Terminal 1 - Backend
cd "edit back"
npm run dev

# Terminal 2 - Frontend  
cd "edit front"
npm run dev
```

### Building for Production
```bash
# Backend
cd "edit back"
npm run build
npm start

# Frontend
cd "edit front"
npm run build
npm start
```

### VS Code Tasks
The project includes VS Code tasks for easy development:
- **Start Backend Server** - Automatically starts the backend in development mode

## 📁 Key Components

### Frontend Components
- **EditorLayoutWrapper** - Global layout with admin controls
- **EditModeToggle** - Main admin control panel
- **LeftEditorSlider** - Dynamic editor panel container
- **MainEditor** - Section selection overview
- **[Section]Editor** - Individual section editors (Hero, Process, etc.)
- **SidePanel** - Reusable sliding panel component
- **ImageUploader** - File upload interface
- **ColorPicker** - Color selection tool

### Backend Controllers
- **editorController** - Handle configuration CRUD operations
- **uploadController** - Manage file uploads and storage

## 🔒 Security Features

- **Authentication Context** - Secure admin session management
- **CORS Protection** - Configured for frontend-backend communication
- **Input Validation** - Joi schema validation for all API inputs
- **File Upload Security** - Safe file handling with type validation
- **Error Boundaries** - React error boundaries for graceful failure handling

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Ensure data and upload directories exist
3. Configure CORS for production frontend URL
4. Use PM2 or similar for process management

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Configure environment variables for production API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🆘 Support

### Common Issues
- **Editor won't open**: Ensure you're logged in and edit mode is enabled
- **Changes not saving**: Check browser storage permissions and network connectivity
- **Images not uploading**: Verify file size and format restrictions

### Getting Help
- Check the CLIENT_GUIDE.md for user instructions
- Review component documentation in the code
- All major functions include helpful tooltips
- Blue dashed borders indicate editable areas when in edit mode

---

**Built with ❤️ using Next.js and Express.js**
