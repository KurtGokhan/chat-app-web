# Chat App Web

## Commands

To build and run the app end-to-end, run the following command and open http://localhost:4000

```
  npm i && npm run build && npm run serve
```

Following commands are available for development:

```
  npm run start
  npm run build
  npm run test
  npm run serve
```

## Server

The server is a very small application in [another repository](https://github.com/KurtGokhan/chat-app-server). It is prebuilt into `server.js` for convenience.

The server will serve static files in `build` directory. 

The server has socket.io endpoint.

## Technology

Following technologies are used in the front-end:

- React (hooks and function components)
- React Context API
- CSS Modules (with SCSS)
- React Router
- Anchorme (link parsing)
- Jest

In server:

- Node.js
- Express
- socket.io

## Features

Following are the features listed in the homework document

- [x] Chat page
  - [x] Basic functionality
  - [x] Smiles support / Emojis
  - [ ] Unread message count
  - [x] Link parser (links show up as anchor)
  - [x] Youtube link preview
  - [x] Image link preview
- [x] Settings page
  - [x] User name
  - [x] UI Theme
  - [x] Clock format
  - [x] Send messages on <kbd>CTRL+ENTER</kbd>
  - [x] Reset button
- [ ] Internationalization
- [ ] Unread chat notifications (?)

The code is minimal as I avoided using too many modules. 
I did not add extra features but I made sure it has good UX. 
Also I made sure it is responsive and cross-browser compatible. 
It works in IE11+, Safari 13+ and modern browsers with subtle differences.
