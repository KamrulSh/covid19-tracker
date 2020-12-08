import React from "react";
import "./Table.css";

function Table({ allData }) {
    return (
        <div className="table">
            {allData.map(({ country, cases }) => (
                <tr>
                    <td>{country}</td>
                    <td>
                        <strong>{cases}</strong>
                    </td>
                </tr>
            ))}
        </div>
    );
}

export default Table;
