## API

## Getting Started

Dependencies
- node 8.11.1+
- expressjs
- mongodb
- docker

Installing
```bash
# Use node 8.11.1 via nvm
nvm use 8.11.1

# Install project dependencies
yarn install
```

Running the server
```bash
# Run mongo via container
docker run -it -p 27017:27017 mongo:bionic mongod

# Tell application where the db lives
export DB_URL="mongodb://localhost/test"

# Or `nodemon app.js` for hot reloading
node app.js
```