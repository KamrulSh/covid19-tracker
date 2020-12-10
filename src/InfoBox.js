import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoBox({ title, cases, active, total, ...props }) {
    const isGreen = props.isGreen;
    const isOrange = props.isOrange;
    return (
        <Card
            onClick={props.onClick}
            className={`infoBox ${active && "infobox--selected"} ${
                isGreen && "infobox--green"
            } ${isOrange && "infobox--orange"} `}
        >
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h4
                    className={`infoBox__cases ${
                        isGreen && "infobox--text--green"
                    } ${isOrange && "infobox--text--orange"}`}
                >
                    {cases} <sup>today</sup>{" "}
                </h4>
                <Typography className="infoBox__total" color="textSecondary">
                    {total} total
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;
