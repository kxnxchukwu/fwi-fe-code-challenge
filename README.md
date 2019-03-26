# fwi-fe-code-challenge

This is the code challenge for applying to FWI's FE Developer Position.

## Table of Contents

- [Getting Started and Challenge Information](#getting-started-and-challenge-information)
  - [Cloning and developing](#cloning-and-developing)
  - [Submitting the code](#submitting-the-code)
- [API Documentation](#api-documentation)
- [Client Application](#client)
- [Server Application](#server)

## Getting Started and Challenge Information

This challenge will test your ability to:

- work in an existing code base
- use React, CSS, and redux
- consume/create data from a RESTful API

To make things easier from the get-go, we have provided both a backend RESTful
API as well as a starter front end app using
[create-react-app](https://facebook.github.io/create-react-app/) and some
default "reasonable" styles.

This app will start with the ability to view every poker player in the database
and list them within a table. Your job will be to update this app so that
players can be added, modified, or deleted using the RESTful API backend we have
provided. The app started with very simplistic styles, so feel free to import
and use any of your favorite libraries or expand upon the current styles to your
liking. If possible, ensure that the FWI branding colors are still used which
can be found in [client/src/\_variables.scss](client/src/_variables.scss).

### Cloning and developing

### Submitting the code

Before submitting your code, make sure that there are no console errors within
your app and everything works as expected. We have also provided a very simple
checklist below for the main features that we are looking for, and you can mark
a task as completed by replacing the space with an `x`:

```dif
- [ ] Create Player
+ [x] Create Player
```

### Challenge Checklist

- [ ] Create Player
- [ ] Modify Player
- [ ] Delete Player
- [ ] Tests (optional)
- [ ] Lazy loading/pagination (optional)

## API Documentation

## client

```sh
$ cd client
$ yarn
$ yarn start
```

The app will be started and available at http://localhost:3000

## server
