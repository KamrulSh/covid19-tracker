import React from "react";
import "./Table.css";
import { DataGrid } from "@material-ui/data-grid";
import "bootstrap/dist/css/bootstrap.min.css";

function Table({ countries }) {
    //console.log("countries0", countries);
    const columns = [
        {
            headerName: "#",
            field: "id",
            width: 80,
        },
        {
            headerName: "Flag",
            field: "flag",
            sortable: false,
        },
        {
            headerName: "Country",
            field: "name",
            width: 130,
        },
        {
            headerName: "Cases",
            field: "cases",
            width: 130,
        },
        {
            headerName: "Recovered",
            field: "recovered",
            width: 130,
        },
        {
            headerName: "Deaths",
            field: "deaths",
            width: 130,
        },
    ];

    return (
        <div style={{ height: 500, width: "100%" }}>
            <DataGrid
                className="tableData"
                columns={columns}
                rows={countries}
            />
        </div>
    );
}

export default Table;
