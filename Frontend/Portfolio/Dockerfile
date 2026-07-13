FROM node:22.23.1-alpine3.23 AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build 

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]