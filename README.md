# Chat App Web

## Commands

Following commands are available for development:

```
  npm run start
  npm run build
  npm run test
  npm run serve
```

To run the app end-to-end, run the following command and open http://localhost:4000:

```
  npm i && npm run build && npm run serve
```

## Server

The server is a very small application in another repository. It is prebuilt into `server.js` for convenience.

The server has two endpoints. One endpoint will serve static files in `build` directory. The other endpoint is for socket.io.
