FROM node:14-alpine AS development
ENV NODE_ENV development

WORKDIR /code

COPY . /code/
RUN yarn install


EXPOSE 3000

CMD [ "yarn", "start" ]
