# Password Generator

A modern, cryptographically secure password generator built with Go and React.

## 🎯 Overview

This project demonstrates expertise in building production-ready applications
with modern web technologies, focusing on security, performance, and clean
architecture.

## 🛠 Tech Stack

**Backend**

- Go 1.24+ with `net/http` (standard library, no frameworks)
- Cryptographic security: `crypto/rand` + `math/rand/v2` (ChaCha8)
- Embedded static files with `go:embed` for single-binary deployment

**Frontend**

- React 19 with selective hydration
- Rsbuild (Rspack v2) for blazing-fast builds
- Tailwind CSS v4 for zero-runtime styling
- Biome for linting and formatting

## ✨ Features

- **Customizable password generation** (4-64 characters)
- **Character set selection**: uppercase, lowercase, numbers, symbols
- **Real-time security meter** with visual feedback
- **One-click copy** to clipboard with accessible confirmation

## 🚀 Getting Started

**Prerequisites**: ensure you have Go 1.24+, Node.js 20+, pnpm 9+, and `make`
installed.

**Install dependencies**

```sh
pnpm -C web install
```

**Start the development server**

```sh
make dev
```

The application will be available at
[http://localhost:3000](http://localhost:3000).
