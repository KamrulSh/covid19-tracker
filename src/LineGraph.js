import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const caseTypeColors = {
    cases: {
        hex: "#CC1034",
        half_op: "rgba(204, 16, 52, 0.5)",
    },
    recovered: {
        hex: "#7dd71d",
        half_op: "rgba(125, 215, 29, 0.5)",
    },
    deaths: {
        hex: "#fb4443",
        half_op: "rgba(251, 68, 67, 0.5)",
    },
};

function LineGraph({ casesType, ...props }) {
    const [data, setData] = useState({});
    //const [casesType, setCasesType] = useState("cases");

    const buildChartData = (allDate, casesType) => {
        let chartData = [];
        let lastDataPoint;
        for (let date in allDate.cases) {
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: allDate[casesType][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
            }

            lastDataPoint = allDate[casesType][date];
            //console.log("lastDataPoint", lastDataPoint);
        }
        //console.log("chartData", chartData);
        return chartData;
    };

    useEffect(() => {
        const fetchData = async () => {
            const url =
                "https://disease.sh/v3/covid-19/historical/all?lastdays=120";
            await fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    //console.log("raw data", data);
                    const chartData = buildChartData(data, casesType);
                    setData(chartData);
                    //setCasesType(casesType);
                });
        };
        fetchData();
    }, [casesType]);

    //console.log("data", data);

    return (
        <div className={props.className}>
            {data?.length > 0 && (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor:
                                    caseTypeColors[casesType].half_op, //"rgba(204, 16, 52, .5)"
                                borderColor: caseTypeColors[casesType].hex, //
                                data: data,
                            },
                        ],
                    }}
                />
            )}
        </div>
    );
}

export default LineGraph;
