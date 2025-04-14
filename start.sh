#!/bin/bash
nohup npx json-server --watch db.json --port 3000 --host 0.0.0.0 > json.log 2>&1 &
nohup npx http-server -a 0.0.0.0 -p 8080 > http.log 2>&1 &
