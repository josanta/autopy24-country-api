"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [countries, setcountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [stateStatus, setStateStatus] = useState(true)
  const [cityStatus, setCityStatus] = useState(true)

  var country_api_url = "https://api-dev.autoby24.ch/api/core/country?limit=all"
  const getcountries = async () => {
    const resp = await fetch(country_api_url);
    if (!resp.ok) {
      console.log("error fetching countries")
    } else {
      const data = await resp.json()
      console.log(data)
      setcountries(data["results"])
    }
  }
  useEffect(() => {
    getcountries()
  }, []);

  const getStates = async (e) => {
    setStates([]);
    // setSelectedCountry()
    const fstate_url = `https://api-dev.autoby24.ch/api/core/state?country=${e.target.value}&limit=all`;
    const resp = await fetch(fstate_url, {
      cache: 'no-store'
    })
    if (!resp.ok) {
      console.log("Failed fetching countries....")
    } else {
      const data = await resp.json()
      setStates(data["results"])
    }
    setStateStatus(false);
  }

  const getCities = async (e) => {
    const city_url = `https://api-dev.autoby24.ch/api/core/city?state=${e.target.value}&limit=all`
    const resp = await fetch(city_url, {
      cache: 'no-store'
    });
    if (!resp.ok) {
      console.log("ERror fetching cities....")
    } else {
      const data = await resp.json()
      setCities(data["results"]);
      setCityStatus(false);
    }
  }

  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-8 pb-10 gap-1 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Autoby Countries API Intergration</h1>
      <div className="flex justify-between space-x-6">
        <div className="mb-0">
          <select className="select select-primary w-full max-w-xs" onChange={(e) => getStates(e)}>
            <option disabled selected>Select country</option>
            {countries.map((country) => {
              return <option key={country.uuid} value={country.name} >{country.name}</option>
            })}
          </select>
        </div>
        <div className="mb-o">
          <select className="select select-primary w-full max-w-xs" disabled={stateStatus} onChange={(e) => getCities(e)}>
            <option disabled selected>Select State</option>
            {states.map((state) => {
              return <option key={state.uuid} value={state.name} >{state.name}</option>
            })}
          </select>
        </div>
        <div className="mb-o">
          <select className="select select-primary w-full max-w-xs" disabled={cityStatus}>
            <option disabled selected>Select City</option>
            {cities.map((city) => {
              return <option key={city.uuid} value={city.name} >{city.name}</option>
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
