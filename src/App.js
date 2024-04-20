import { useEffect, useState } from "react";
import "./App.css";
import Cities from "./components/Cities";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/Nav";
import Weather from "./components/Weather";

function App() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      let url =
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100";

      const response = await fetch(url);
      const result = await response.json();
      setInfo(result.results);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Nav info={info} />
        <Routes>
          <Route exact path="/" element={<Cities info={info} />} />
          <Route exact path={`/Weather/:cityname`} element={<Weather />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
