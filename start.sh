#!/bin/bash
npx json-server --watch db.json --port 3000 &
npx http-server -p 8000 &