#!/bin/bash

# Run nmap
nmap -sP 192.168.68.0/24 -oA ./data/scan
# Check if nmap was successful
if [ $? -eq 0 ]; then
  # Run the parser script
  node ./app/parser.js
  # Check if the parser script was successful
else
  # Print an error message if nmap was not successful
  echo "nmap failed"
fi
