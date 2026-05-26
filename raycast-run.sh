#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Run se-dev-env
# @raycast.mode compact

# Optional parameters:
# @raycast.icon ⚙️

# Documentation:
# @raycast.author Redo
# @raycast.authorURL https://raycast.com/Redo

cd "$(dirname "$0")"
npm run dev
