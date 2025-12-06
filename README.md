# noodles-notes

A simple web app for Noodle's Notes - 50 years of voyaging in Hawaii and the Pacific.

## Prerequisites

- Node.js >= 18.0.0
- npm

## Setup

```bash
# install dependencies
npm install

# build for production
npm run build

# build for development (with watch mode)
npm run build:dev

# start the server
npm start

# development mode (webpack watch + nodemon)
npm run dev

# serve with nodemon (auto-restart on server changes)
npm run serve
```

## Development

The app uses:
- **Backend**: Express.js server
- **Frontend**: jQuery with vanilla JavaScript
- **Build**: Webpack 5 with Babel 7 for transpilation
- **Styles**: Less CSS preprocessor

The webpack build process bundles JavaScript and compiles Less styles into a single `bundle.js` file in the `public` directory.
