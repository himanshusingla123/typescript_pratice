### Package File for Simple TypeScript Project
```json
{
  "name": "typescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "npx tsc && node \"dist/Day 08/src/index.js\"",
    "build": "npx tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "@tensorflow/tfjs": "^4.22.0",
    "axios": "^1.12.2",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "express-openid-connect": "^2.19.2",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "rxjs": "^7.8.2",
    "tsx": "^4.20.6",
    "zod": "^4.1.12"
  },
  "devDependencies": {
    "@types/express": "^5.0.3",
    "@types/node": "^24.8.0",
    "typescript": "^5.9.3"
  }
}
```
---

### Package File for React + TypeScript Project with Vite
```json
{
  "name": "react-typescript-app",
  "version": "1.0.0",
  "private": true,
  "description": "A React + TypeScript app using Vite",
  "scripts": {
    "dev": "vite --config vite.config.ts",
    "build": "tsc && vite build --config vite.config.ts",
    "preview": "vite preview --config vite.config.ts",
    "lint": "eslint . --ext ts,tsx"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "type": "module",
  "dependencies": {
    "@tensorflow/tfjs": "^4.22.0",
    "@vitejs/plugin-react": "^5.0.4",
    "axios": "^1.12.2",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "express-openid-connect": "^2.19.2",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "rxjs": "^7.8.2",
    "tsx": "^4.20.6",
    "vite": "^7.1.11",
    "zod": "^4.1.12"
  },
  "devDependencies": {
    "@types/express": "^5.0.3",
    "@types/node": "^24.8.0",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "typescript": "^5.9.3"
  }
}
```

### Vite Configuration File(vite.config.ts)
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "Day 09"), // 👈 Vite root folder
  build: {
    outDir: path.resolve(__dirname, "Day 09/dist"),
    emptyOutDir: true
  },
  server: {
    port: 5173,
    open: true
  }
});
```

---

```json
{
  "name": "typescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "npx tsc && cpr \"Day 12/public\" dist/\"Day 12/public\" -o && node \"dist/Day 12/src/index.js\"",
    "build": "npx tsc && cpr public dist/public -o",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "@prisma/client": "^6.17.1",
    "@tensorflow/tfjs": "^4.22.0",
    "@trpc/client": "^11.6.0",
    "@trpc/server": "^11.6.0",
    "@vitejs/plugin-react": "^5.0.4",
    "axios": "^1.12.2",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "express-openid-connect": "^2.19.2",
    "prisma": "^6.17.1",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "rxjs": "^7.8.2",
    "tsx": "^4.20.6",
    "vite": "^7.1.11",
    "ws": "^8.18.3",
    "zod": "^4.1.12"
  },
  "devDependencies": {
    "@types/express": "^5.0.3",
    "@types/node": "^24.8.0",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "@types/ws": "^8.18.1",
    "cpr": "^3.0.1",
    "typescript": "^5.9.3"
  }
}
```