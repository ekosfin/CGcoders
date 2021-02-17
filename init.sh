#!/bin/bash
set -e

echo "Starting SSH ..."
service ssh start

echo "Starting Serve"
serve -l 80 build
