import React from "react";

const TableHeader = () => (
  <table
    id="player-table-header"
    role="presentation"
    className="table table--fixed"
  >
    <thead>
      <tr>
        <th className="table__header table__avatar" />
        <th className="table__header table__player">Player</th>
        <th className="table__header table__winnings">Winnings</th>
        <th className="table__header table__native">Native of</th>
      </tr>
    </thead>
  </table>
);

export default TableHeader;
