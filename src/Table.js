import React from "react";
import "./Table.css";

function Table({ allData }) {
    //console.log("table", allData);
    return (
        <div className="table">
            <tr>
                <th>Country</th>
                <th>Total cases</th>
                <th>Recovered</th>
                <th>Deaths</th>
            </tr>
            {allData.map(
                ({ country, cases, recovered, deaths, countryInfo }) => (
                    <tr>
                        <td>
                            <img
                                className="country__image"
                                src={countryInfo.flag}
                                alt=""
                                srcset=""
                            />
                            {country}
                        </td>
                        <td>
                            <strong>{cases}</strong>
                        </td>
                        <td>{recovered}</td>
                        <td>{deaths}</td>
                    </tr>
                )
            )}
        </div>
    );
}

export default Table;
