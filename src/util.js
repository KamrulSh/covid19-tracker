import { Circle, Popup } from "react-leaflet";

const caseTypeColors = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 500,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 800,
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 2000,
    },
};

export const sortData = (data) => {
    const allData = [...data];

    return allData.sort((a, b) => b.cases - a.cases);
};

export const showDataOnMap = (allData, caseType = "deaths") =>
    allData.map((country) => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={caseTypeColors[caseType].hex}
            fillColor={caseTypeColors[caseType].hex}
            radius={
                Math.sqrt(country[caseType]) *
                caseTypeColors[caseType].multiplier
            }
        >
            <Popup>
                <h1> This is popup</h1>
            </Popup>{" "}
        </Circle>
    ));
