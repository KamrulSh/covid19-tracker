import { Card, FormControl, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);
    };

    useEffect(() => {
        const url = "https://disease.sh/v3/covid-19/countries";
        const getCountriesData = async () => {
            await fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    setCountries(countries);
                });
        };
        getCountriesData();
    }, []);

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
                            <MenuItem value="worldwide">Worldwide</MenuItem>
                            {countries.map((country) => (
                                <MenuItem value={country.value}>
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* InfoBox */}
                <div className="app__stats">
                    <InfoBox title="Corona Cases" cases={1234} total={21324} />
                    <InfoBox title="Recovered" cases={1234} total={21324} />
                    <InfoBox title="Deaths" cases={1234} total={21324} />
                </div>

                {/* Map */}
                <Map />
            </div>
            <Card className="app__right">
                {/* Table */}
                <h1>New cases by country</h1>
                {/* Graph */}
                <h1>New cases graph</h1>
            </Card>
        </div>
    );
}

export default App;
