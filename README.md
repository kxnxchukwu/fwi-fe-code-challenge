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

```diff
- [ ] Create Player
+ [x] Create Player
```

### Challenge Checklist

- [ ] Create Player
- [ ] Modify Player
- [ ] Delete Player
- [ ] Implement sorting (optional)
- [ ] Lazy loading/pagination (optional)
- [ ] Tests (optional)

## API Documentation

The player entity will have the following structure:

```ts
import { COUNTRIES } from "./constants";

type Guid = string;
type CountryCode = keyof COUNTRIES;

interface Player {
  id: Guid;
  name: string;
  country: CountryCode;
  winnings: number;
  imageUrl: string;
}
```

### Get all players

You can get a list of all the players be sending a `GET` request to `/players`:

```sh
$ curl -H "Accept: application/json" \
    http://localhost:3001/players
```

Result:

```json
{
  "players": [
    {
      "id": "314c5ab7-ba9b-4821-adba-b4f9d92009db",
      "name": "Freddy Kruger",
      "country": "US",
      "winnings": 93024,
      "imageUrl": "https://i.pravatar.cc/40?u=314c5ab7-ba9b-4821-adba-b4f9d92009db"
    },
    {
      "id": "70629df2-571a-4899-b36a-8f36c909508a",
      "name": "Bob Bobbity",
      "country": "US",
      "winnings": 93024,
      "imageUrl": "https://i.pravatar.cc/40?u=70629df2-571a-4899-b36a-8f36c909508a"
    }
    // ... other players
  ]
}
```

This endpoint will also support pagination using the `start` and `size` query
parameters:

```sh
$ curl -H "Accept: application/json" \
    http://localhost:3001/players?size=24
```

Response:

```json
{
  "from": 0,
  "size": 24,
  "total": 1000,
  "players": [
    {
      "id": "314c5ab7-ba9b-4821-adba-b4f9d92009db",
      "name": "Freddy Kruger",
      "country": "US",
      "winnings": 93024,
      "imageUrl": "https://i.pravatar.cc/40?u=314c5ab7-ba9b-4821-adba-b4f9d92009db"
    },
    {
      "id": "70629df2-571a-4899-b36a-8f36c909508a",
      "name": "Bob Bobbity",
      "country": "US",
      "winnings": 93024,
      "imageUrl": "https://i.pravatar.cc/40?u=70629df2-571a-4899-b36a-8f36c909508a"
    }
    // ... other players
  ]
}
```

So if you would like to get the next set of results, you can do:

```sh
$ curl -H "Accept: application/json" \
    http://localhost:3001/players?size=24&from=24
```

Response:

```json
{
  "from": 24,
  "size": 24,
  "total": 1000,
  "players": [
    {
      "id": "0ef94f22-e727-4888-91e3-088be5dbd896",
      "name": "Scott Sterling",
      "country": "UK",
      "winnings": 93024,
      "imageUrl": "https://i.pravatar.cc/40?u=0ef94f22-e727-4888-91e3-088be5dbd896"
    },
    {
      "id": "4f3b5ce4-2072-47d4-beb8-d46a9a0a8c9f",
      "name": "Stirling Archer",
      "country": "US",
      "winnings": 9302400,
      "imageUrl": "https://i.pravatar.cc/40?u=4f3b5ce4-2072-47d4-beb8-d46a9a0a8c9f"
    }
    // ... other players
  ]
}
```

### Get a player

You can get a single player by sending a `GET` request to `/players/:guid`:

```sh
$ curl -H "Accept: application/json" \
    http://localhost:3001/players/70629df2-571a-4899-b36a-8f36c909508a
```

Response:

```json
{
  "id": "70629df2-571a-4899-b36a-8f36c909508a",
  "name": "Bob Bobbity",
  "country": "US",
  "winnings": 93024,
  "imageUrl": "https://i.pravatar.cc/40?u=70629df2-571a-4899-b36a-8f36c909508a"
}
```

### Create a player

To create a player, you can send a `POST` to `/players` with the following data:

```ts
interface Player {
  name: string;
  country: string;
  winnings: number;
  imageUrl?: string;
}
```

The `imageUrl` will be optional as the BE will automatically create a `pravatar`
url for you if omitted. After you create a player and it was successful, you
should get a `201` response as well as a `Location` header pointing to the newly
created player:

```sh
$ curl -d '{ "name": "New Person", country: "US", "winnings": 1000 }' \
  -H "Content-Type: application/json" \
  -IX POST http://localhost:3001/players
```

Response:

```sh
201 Created
Location: http://localhost:3001/players/0ef94f22-e727-4888-91e3-088be5dbd896
```

### Update a player

To update a player, you can send a `PATCH` to `/players/:guid` with the updated
data:

```sh
$ curl -d '{ name: "Example Name" }' \
    -H "Content-Type: application/json" \
    -X PATCH \
    http://localhost:3001/players/314c5ab7-ba9b-4821-adba-b4f9d92009db
```

### Delete a player

Finally, to delete a player, you can send a `DELETE` to `/players/:guid`:

```sh
$ curl -X DELETE \
    http://localhost:3001/players/4f3b5ce4-2072-47d4-beb8-d46a9a0a8c9f
```

## client

```sh
$ cd client
$ yarn
$ yarn start
```

The app will be started and available at http://localhost:3000

## server
