import { Card, FormControl, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryData, setCountryData] = useState({});
    const [tableData, setTableData] = useState([]);

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
            });
    };
    //console.log(country, countryData);

    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    {/* Header + dropdown */}
                    <h1>COVID 19 Tracker</h1>
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
                                        className="country__image"
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

                {/* InfoBox */}
                <div className="app__stats">
                    <InfoBox
                        title="Corona Cases"
                        cases={countryData.todayCases}
                        total={countryData.cases}
                    />
                    <InfoBox
                        title="Recovered"
                        cases={countryData.todayRecovered}
                        total={countryData.recovered}
                    />
                    <InfoBox
                        title="Deaths"
                        cases={countryData.todayDeaths}
                        total={countryData.deaths}
                    />
                </div>

                {/* Map */}
                <Map />
            </div>
            <Card className="app__right">
                {/* Table */}
                <h2>Total cases by country</h2>
                <Table allData={tableData} />
                {/* Graph */}
                <h2>New cases by last 120 days</h2>
                <LineGraph />
            </Card>
        </div>
    );
}

export default App;
