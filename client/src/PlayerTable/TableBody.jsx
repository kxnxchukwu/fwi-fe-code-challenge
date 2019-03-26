import React from "react";
import PropTypes from "prop-types";
import Flags from "react-world-flags";

import Avatar from "../Avatar";
import { COUNTRIES } from "../constants";

const TableBody = ({ players }) => {
  return (
    <table
      id="player-table-body"
      role="presentation"
      className="table table--body"
    >
      <tbody>
        {players.map(({ id, name, country, winnings, imageUrl }) => (
          <tr key={id} className="table__row">
            <td className="table__avatar">
              <Avatar src={imageUrl} />
            </td>
            <td className="table__player">{name}</td>
            <td className="table__winnings">
              {winnings.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
              })}
            </td>
            <td className="table__native">
              <div className="country">
                <Avatar>
                  <Flags code={country} alt="" />
                </Avatar>
                {country}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TableBody.propTypes = {
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

export default TableBody;
