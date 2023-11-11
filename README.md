# Thread Talk forum application

## Requirements

### Server Requirements

* [Node.js](https://nodejs.org/en/download/) (v18) => installation instructions for [Linux](https://github.com/nodesource/distributions), use installers for macOS and Windows (don't forget to restart your Bash shell)
* [MongoDB](https://www.mongodb.com/download-center/community?jmp=nav) (>=v4.4) must be running locally on port 27017 => installation instructions for [macOS](https://github.com/joe4dev/dit032-setup/blob/master/macOS.md#mongodb), [Windows](https://github.com/joe4dev/dit032-setup/blob/master/Windows.md#mongodb), [Linux](https://github.com/joe4dev/dit032-setup/blob/master/Linux.md#mongodb)
* [Postman](https://www.getpostman.com/downloads/) (>=v8) for API testing

### Client Requirements

* [Server](../server/README.md) backend running on `http://localhost:3000`
* [Node.js](https://nodejs.org/en/download/) (v18) => installation instructions for [Linux](https://github.com/nodesource/distributions)
* [Visual Studio Code (VSCode)](https://code.visualstudio.com/) as IDE
  * [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) plugin for Vue tooling
  * [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) plugin for linting Vue, JS, and HTML code
* [Google Chrome](https://www.google.com/chrome/) as web browser
  * [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) plugin for debugging

## Project setup

### Server setup

Make sure, you are in the server directory `cd server`

Installs all project dependencies specified in [package.json](./package.json).

```bash
npm install
```

Start the server with auto-restarts for development

```bash
npm run dev
```

### Client setup

Make sure, you are in the client directory `cd client`

Installs all project dependencies specified in [package.json](./package.json).

```sh
npm install
```

Compiles and hot-reloads for development

```sh
npm run serve
```

## Time spent on the case

* setting up the project: about 1-2 hours
* backend: about 3-4 hours
* frontend: more than 5 hours

## Project description

Thread Talk is a simple forum application that allows users to add posts and comments.

Specific API endpoints have been implememnted in the backend such as: 
* Add post 
* Add comment &lt;post_id&gt; 
* Edit comment &lt;post_id&gt; 
* Delete comment &lt;post_id&gt; 
* View post &lt;post_id&gt; 
* Update post &lt;post_id&gt; 
* Delete post &lt;post_id&gt; 
* View all (view all the posts) 
* Sort post &lt;date&gt;

A Postman collection along with some simple tests can be found in the /server/tests/ folder.
