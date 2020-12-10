import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoBox({ title, cases, total, ...props }) {
    return (
        <Card onClick={props.onClick} className="infoBox">
            <CardContent>
                {/* title */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                {/* new case */}
                <h4 className="infoBox__cases">
                    {cases} <sup>today</sup>{" "}
                </h4>
                {/* total */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} total
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;
