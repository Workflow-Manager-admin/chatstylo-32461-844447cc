#!/bin/bash
cd /home/kavia/workspace/code-generation/chatstylo-32461-844447cc/chatstylo
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

