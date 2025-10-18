# GitOps Frontend

A modern Next.js frontend application for the GitOps infrastructure project, built with TypeScript and Tailwind CSS.

## 🚀 Features

- **Next.js 15** - Latest React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting
- **Turbopack** - Fast bundling and development
- **DevContainer** - Consistent development environment

## 🛠️ Development Setup

### Option 1: DevContainer (Recommended)

1. **Prerequisites**:
   - VS Code with Dev Containers extension
   - Docker Desktop

2. **Setup**:
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd gitops-frontend
   
   # Open in VS Code
   code .
   
   # Click "Reopen in Container" when prompted
   ```

3. **Development**:
   - The dev server will start automatically on port 3000
   - Access the app at `http://localhost:3000`

### Option 2: Local Development

1. **Prerequisites**:
   - Node.js 20+ 
   - npm or yarn

2. **Setup**:
   ```bash
   # Install dependencies
   npm install
   
   # Start development server
   npm run dev
   ```

## 📜 Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🏗️ Project Structure

```
gitops-frontend/
├── .devcontainer/          # DevContainer configuration
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/        # Reusable React components
│   └── lib/              # Utility functions
├── public/               # Static assets
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── next.config.js        # Next.js configuration
```

## 🎨 Styling

This project uses Tailwind CSS for styling. Key features:

- **Utility-first** approach
- **Responsive design** built-in
- **Dark mode** support
- **Custom components** in `src/components/`

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=GitOps Frontend
```

### Tailwind CSS

The project is configured with Tailwind CSS v4. Customize the design system in `tailwind.config.js`.

## 🚀 Deployment

### Docker

```bash
# Build Docker image
docker build -t gitops-frontend .

# Run container
docker run -p 3000:3000 gitops-frontend
```

### Kubernetes

The application can be deployed to Kubernetes using the manifests in the infrastructure repository.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is part of the GitOps infrastructure learning project.