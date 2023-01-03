FROM ubuntu:latest
# Install Nmap
RUN apt-get update && apt-get install -y nmap curl
# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN mkdir -p /data
COPY /app /app
# Run the run.sh script
CMD ["bash", "./app/run.sh"]
