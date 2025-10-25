# 1. Node Version Manager

- https://nodejs.org/en/download

## Installation

```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 22

# Verify the Node.js version:
node -v # Should print "v22.21.0".

# Verify npm version:
npm -v # Should print "10.9.4".
```

### List installed versions

```bash
nvm list
```

## Add .nvmrc to project with project node version

```bash
nvm use
```

# 2. Code Setup

- Install Thunder Client extension to send http requests to thi server
- From commandline can be used curl

# 3. Project setup

## .gitignore

- files and folders to be ignored from git repo

## npm (Node Package Manager) init to produce package.json or create package.json by hand

- https://docs.npmjs.com/cli/v8/commands/npm-init/

```bash
npm init
```

## npm source

https://www.npmjs.com/

## package.json contains

### runtime dependecies (frameworks and libraries)

- https://www.npmjs.com/package/express, documentation https://expressjs.com/, https://expressjs.com/en/resources/middleware.html
- https://www.npmjs.com/package/dotenv
- https://www.npmjs.com/package/express-async-handler
- https://www.npmjs.com/package/mongodb
- https://www.npmjs.com/package/mongoose, https://mongoosejs.com/
- https://www.npmjs.com/package/swagger-ui-express, https://www.npmjs.com/package/swagger-autogen (http://localhost:5001/api-docs)

### development dependecies

- https://www.npmjs.com/package/nodemon

## edit script tag of package.json to start in dev or prod mode

- dev mode: `npm run dev`
- prod: `npm run`

# Project use cases

## Simple route

### Implementation

```js
app.get("/test", (req, res) => {
  console.log("Test endpoint hit, request query is:", req.query);
  res.send(
    "Response from test endpoint, requested query is: " +
      JSON.stringify(req.query)
  );
});
```

### Tests

```bash
curl -v http://localhost:5001/test\?param1\=value1\&param2\=value2
```

# Docker

- https://hub.docker.com/_/mongo

```bash
docker compose up -d
```

```bash
docker compose down -v
```

# Documentation

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
- https://docs.docker.com/compose/

# Tests

## Create contacts

### Create contact 1

```bash curl -H 'Content-Type: application/json' \
      -d '{ "name":"Kis Pista","email":"pista@example.com", "phone": "0745778208"}' \
      -X POST \
      http://localhost:5001/api/contacts | jq .
```

### Create contact 2

```bash
curl -H 'Content-Type: application/json' \
      -d '{ "name":"Kis Janos","email":"janos@example.com", "phone": "074577820s"}' \
      -X POST \
      http://localhost:5001/api/contacts | jq .
```

## List contacts

```bash
curl -v http://localhost:5001/api/contacts | jq .
```

```

```

