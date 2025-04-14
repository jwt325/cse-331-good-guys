#!/bin/bash
nohup npx json-server --watch db.json --port 3000 > json.log 2>&1 &
nohup npx http-server -p 8000 > http.log 2>&1 &