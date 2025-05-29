#!/bin/bash
cd /home/kavia/workspace/code-generation/piggyhabit-16001-cd281d36/piggyhabit
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

