import { Card, FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Map from "./Map";
import Table from "./Table";
import { prettyPrintStat, sortData } from "./util";
import "leaflet/dist/leaflet.css";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryData, setCountryData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({
        lat: 0,
        lng: 0,
    });
    const [mapZoom, setMapZoom] = useState(2);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");

    useEffect(() => {
        const baseUrl = "https://disease.sh/v3/covid-19/all";
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => setCountryData(data));
    }, []);

    useEffect(() => {
        const url = "https://disease.sh/v3/covid-19/countries";
        const getCountriesData = async () => {
            await fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso3,
                        flag: country.countryInfo.flag,
                    }));
                    setCountries(countries);
                    setMapCountries(data);
                    // display sorted data in table
                    const sortedData = sortData(data);
                    setTableData(sortedData);
                });
        };
        getCountriesData();
    }, []);

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;

        const url =
            countryCode === "worldwide"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCountry(countryCode);
                setCountryData(data);
                //console.log("G", countryCode, data);
                if (countryCode === "worldwide") {
                    setMapCenter([0, 0]);
                    setMapZoom(2);
                } else {
                    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                    setMapZoom(5);
                }
            });
    };
    //console.log(country, countryData);
    //console.log("App map center1", mapCenter, mapZoom);

    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    <h1>
                        <img
                            className="app__headerImg"
                            src="https://cdn.pixabay.com/photo/2020/04/29/08/24/coronavirus-5107804_1280.png"
                            alt=""
                        />
                        COVID-19 Tracker
                    </h1>
                    <FormControl className="app__dropdown">
                        <Select
                            variant="outlined"
                            value={country}
                            onChange={onCountryChange}
                        >
                            <MenuItem key="Worldwide" value="worldwide">
                                🌎 Worldwide
                            </MenuItem>
                            {countries.map((country) => (
                                <MenuItem
                                    key={country.name}
                                    value={country.value}
                                >
                                    <img
                                        className="app__dropdown__countryImage"
                                        src={country.flag}
                                        alt=""
                                        srcset=""
                                    />
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="app__stats">
                    <InfoBox
                        active={casesType === "cases"}
                        onClick={(e) => setCasesType("cases")}
                        title="Corona Cases"
                        cases={prettyPrintStat(countryData.todayCases)}
                        total={prettyPrintStat(countryData.cases)}
                    />
                    <InfoBox
                        isGreen
                        active={casesType === "recovered"}
                        onClick={(e) => setCasesType("recovered")}
                        title="Recovered"
                        cases={prettyPrintStat(countryData.todayRecovered)}
                        total={prettyPrintStat(countryData.recovered)}
                    />
                    <InfoBox
                        isOrange
                        active={casesType === "deaths"}
                        onClick={(e) => setCasesType("deaths")}
                        title="Deaths"
                        cases={prettyPrintStat(countryData.todayDeaths)}
                        total={prettyPrintStat(countryData.deaths)}
                    />
                </div>

                <Map
                    casesType={casesType}
                    countries={mapCountries}
                    center={mapCenter}
                    zoom={mapZoom}
                />
            </div>
            <Card className="app__right">
                <h2>Country wise report</h2>
                <Table allData={tableData} />

                <h2>Worldwide {casesType} by last 120 days</h2>
                <LineGraph casesType={casesType} />
            </Card>
        </div>
    );
}

export default App;
