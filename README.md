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

## Technology

Following technologies are used in the application:

- Typescript
- React (hooks and function components)
- React Context API
- React Router
- CSS Modules (with SCSS)
- Anchorme (link parsing)
- Jest
- socket.io (server and client)
- Express (server)

Environment:

- Node.js 10
- Windows 10
- VSCode

## Features

Following are the features listed in the homework document

- [x] Chat page
  - [x] Basic functionality
  - [x] Smiles support / Emojis
  - [x] Unread message count
  - [x] Link parser (links show up as anchor)
  - [x] Youtube link preview (e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ)
  - [x] Image link preview (png, jpg, gif) (e.g. https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png)
- [x] Settings page
  - [x] User name
  - [x] UI Theme
  - [x] Clock format
  - [x] Send messages on <kbd>CTRL+ENTER</kbd>
  - [x] Reset button
- [ ] Internationalization
- [ ] Unread chat notifications (?)

The code is minimal as I avoided using too many modules. 
I made sure it is responsive and cross-browser compatible. 
It works in all modern browsers with subtle differences.

## Known issues

- There is a scrolling bug in IE11 and Firefox.
- I did not understand what `Unread chat notifications` feature means and skipped it.
- `Send on CTRL+Enter` works like this: 
  - When it's on, pressing <kbd>enter</kbd> will add a newline and <kbd>ctrl+enter</kbd> will send the message
  - When it's off, pressing <kbd>enter</kbd> or <kbd>ctrl+enter</kbd> will send the message
  - Pressing <kbd>shift+enter</kbd> will add a newline regardless of whether it's on or off
- I did not add extra features. Instead I focused on making sure existing features has good design and UX.
- Many improvements can be made to make this a real chat application. 


## Server

The server is a very small application that relays the incoming messages to all connected users. It serves static files in `build` directory and it has a socket.io endpoint.

It is prebuilt into `server.js` for convenience. Its source code can be seen in [another repository](https://github.com/KurtGokhan/chat-app-server).
