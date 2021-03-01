#!/bin/bash
set -e

echo "Starting SSH ..."
service ssh start

echo "Starting express"
npm run start
