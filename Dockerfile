FROM alpine:latest
# Install Nmap
RUN apk add nmap curl
# Install Node.js
# RUN curl -sL https://deb.nodesource.com/setup_14.x | ash -
# RUN apt-get install -y nodejs
RUN apk add nodejs npm

RUN mkdir -p /data
COPY /app /app
# WORKDIR /app
# # Install dependencies
# RUN npm install

# Run the run.sh script
CMD ["ash", "./app/run.sh"]
