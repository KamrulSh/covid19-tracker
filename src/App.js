import { FormControl, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";

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
            <div className="app__header">
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

            {/* Header + dropdown */}

            {/* Infobox */}
            {/* Infobox */}
            {/* Infobox */}

            {/* Table */}
            {/* Graph */}
            {/* Map */}
        </div>
    );
}

export default App;
