# 
## Development by Matheus Amaro
---

## Home Page

* [AmaroCorp](http://daw.amarocorp.com.br) - Running application

## Initializing

Run this command on the terminal:

```
npm install

node Server.js
```

Go to page: http://localhost:5003

## Using on a dedicated server

Install the PM2 module and create an instance with the main file:

```
npm install -g pm2

pm2 start Server.js --name="Daw"
```