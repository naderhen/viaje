# Build
# sudo docker build -t [env]:[app] [app]

# Run
# sudo docker run -d -p 80:8080

# Image Version
#FROM ubuntu:14.04
FROM node:0.12.4-onbuild
MAINTAINER Brian Bland <brian.bland@live.com>

RUN apt-get update
RUN npm install
RUN npm run build

# RUN npm run start
# Need script to start application (see Dockerfile Best Practices)
# Configure NODE_ENV variable for prod

#ENTRYPOINT [""]
#"NODE_ENV=production",
CMD ["npm", "run", "start"]
EXPOSE 8080


# Useful Commands

# To view iptables mapping
# sudo iptables -t nat -L -n
