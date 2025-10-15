# DevContainer Setup for GitOps Frontend

This devcontainer provides a complete development environment for the Next.js GitOps frontend application using **Yarn** as the package manager.

## Features

- **Node.js 20** - Latest LTS version
- **Yarn** - Fast, reliable package manager
- **TypeScript** - Full TypeScript support
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **VS Code Extensions** - Pre-configured extensions for optimal development

## Getting Started

1. **Open in DevContainer**: 
   - Open VS Code
   - Install the "Dev Containers" extension
   - Open this folder in VS Code
   - Click "Reopen in Container" when prompted

2. **Development Server**:
   - The dev server will start automatically on port 3000 using `yarn dev`
   - Access the app at `http://localhost:3000`

3. **Available Scripts**:
   ```bash
   yarn dev          # Start development server with Turbopack
   yarn build        # Build for production
   yarn start        # Start production server
   yarn lint         # Run ESLint
   yarn type-check   # Run TypeScript type checking
   ```

## VS Code Extensions Included

- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
- **Prettier** - Code formatting
- **TypeScript Importer** - Auto-import TypeScript modules
- **Auto Rename Tag** - Automatically rename paired HTML/JSX tags
- **Path Intellisense** - Autocomplete file paths
- **JSON** - JSON language support

## Troubleshooting

- **Port conflicts**: If port 3000 is in use, the devcontainer will prompt you to forward a different port
- **Dependencies**: Run `yarn install` if dependencies are missing
- **TypeScript errors**: Run `yarn type-check` to see detailed TypeScript errors