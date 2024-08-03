FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM httpd:2.4

COPY --from=build /app/dist/your-angular-app-name /usr/local/apache2/htdocs/

EXPOSE 80

CMD ["httpd-foreground"]
