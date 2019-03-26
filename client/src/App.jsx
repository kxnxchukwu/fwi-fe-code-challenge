import React, { Fragment } from "react";

import Header from "./Header/Header";
import PlayerTable from "./PlayerTable/PlayerTable";
import { COUNTRIES } from "./constants";

const codes = Object.keys(COUNTRIES);

const randomInt = ({ min = 0, max = 100000 } = {}) =>
  Math.floor(Math.random() * max) + min;
const randomCountry = () => codes[randomInt({ max: codes.length })];

const players = Array.from(new Array(100)).map((_, i) => ({
  id: `fake-guid-${i}`,
  name: `Player ${i + 1}`,
  country: randomCountry(),
  winnings: randomInt(),
  imageUrl: `http://i.pravatar.cc/40?u=fake-guid-${i}`,
}));

const App = () => {
  return (
    <Fragment>
      <Header />
      <PlayerTable players={players} />
    </Fragment>
  );
};

export default App;
