# Sports Matching App

This project is a front-end prototype for a sports-matching social platform. It uses **JSON Server** as a mock backend to simulate API endpoints for users, games, and other related data.

## Overview

- **Frontend:** Built using HTML, CSS, and JavaScript. All UI/UX logic lives in this folder (e.g., `index.html`, `/css`, `/js`).
- **Backend:** A mock API using JSON Server that provides endpoints for the data stored in `db.json`.
- **Goal:** Focus on UI/UX without having to implement production-level backend logic or security.

## Prerequisites

- **Node.js and npm:** Needed to run JSON Server.  
  [Download and install Node.js](https://nodejs.org/).

- **Static file server:** For serving front-end: `npm install -g http-server`

- **JSON Server:** For simulating API endpoints: `npm install -g json-server`

## Running the App
1. Navigate to the root directory of the project.
2. run `json-server --watch db.json --port 3000`
3. run `http-server -p 8000`

## Running the app on the Sunlab:
- npm install
- bash start.sh