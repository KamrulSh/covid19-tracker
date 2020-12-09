import React from "react";
import "./Table.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Table({ allData }) {
    //console.log("table", allData);
    return (
        <div className="tableData">
            <table className="table">
                <tr>
                    <th>Flag</th>
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
                                    className="table__countryImage"
                                    src={countryInfo.flag}
                                    alt=""
                                    srcset=""
                                />
                            </td>
                            <td>{country}</td>
                            <td>
                                <strong>{cases}</strong>
                            </td>
                            <td>{recovered}</td>
                            <td>{deaths}</td>
                        </tr>
                    )
                )}
            </table>
        </div>
    );
}

export default Table;
