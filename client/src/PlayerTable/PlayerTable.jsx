import React from "react";
import PropTypes from "prop-types";

import { COUNTRIES } from "../constants";

import "./PlayerTable.scss";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const PlayerTable = ({ players }) => {
  return (
    <div
      id="player-table-grid"
      role="grid"
      aria-label="Poker Players"
      className="player-table"
    >
      <TableHeader />
      <TableBody players={players} />
    </div>
  );
};

PlayerTable.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.oneOf(Object.keys(COUNTRIES)),
      winnings: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PlayerTable;
