import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, total }) {
    return (
        <div>
            <Card>
                <CardContent>
                    {/* title */}
                    <Typography
                        className="infoBox__title"
                        color="textSecondary"
                    >
                        {title}
                    </Typography>
                    {/* new case */}
                    <h2 className="infoBox__cases">{cases} today</h2>
                    {/* total */}
                    <Typography
                        className="infoBox__total"
                        color="textSecondary"
                    >
                        {total} total
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default InfoBox;
