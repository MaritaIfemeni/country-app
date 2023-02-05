import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "../App.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CottageIcon from "@mui/icons-material/Cottage";

function Country() {
  const [country, setCountry] = useState("");
  const [capital, setCapital] = useState("");
  const [flags, setFlags] = useState("");
  const [region, setRegion] = useState("");
  const [subregion, setSubregion] = useState("");
  const [latLong, setLatLong] = useState("");
  const [population, setPopulation] = useState("");
  const [map, setMap] = useState("");
  const { name } = useParams();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].name.common);
        setCountry(data[0].name.common);
        setCapital(data[0].capital);
        setFlags(data[0].flags.png);
        setRegion(data[0].region);
        setSubregion(data[0].subregion);
        setLatLong(data[0].latlng);
        setPopulation(data[0].population);
        setMap(data[0].maps.googleMaps);
      })
      .catch((err) => console.log(err));
  }, [name]);

  return (
    <div className="country">
      <Card className="card" sx={{ maxWidth: "80%",
              "@media (max-width: 1000px)": {
                maxWidth: "100%",
              }, }}>
        <div className="country_name_container">
          <Typography
            gutterBottom
            variant="h5"
            color="white"
            component="div"
            className="left"
          >
            {country[0]}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            color="blue"
            component="div"
            className="right"
          >
            {country}
          </Typography>
        </div>
        <Typography gutterBottom variant="h7" component="div">
          Capital: {capital}
        </Typography>
        <CardContent>
          <CardMedia
            sx={{
              height: 600,
              "@media (max-width: 1000px)": {
                height: 150,
              },
            }}
            image={flags}
            title="flag"
            component="img"
          />
          <Typography
            variant="body2"
            color="text.secondary"
            fontSize={{
              "@media (max-width: 1000px)": {
                fontSize: 12,
              },
            }}
            className="country-text"
          >
            The country belongs to <strong>{region}</strong> region and&nbsp;
            <strong>{subregion}</strong> sub-region. Located at the&nbsp;
            <strong>
              {latLong[0] < 0 ? latLong[0] + " °S " : latLong[0] + " °N "}
            </strong>
            and&nbsp;
            <strong>
              {latLong[1] < 0 ? latLong[1] + " °E" : latLong[1] + " °W"}
            </strong>
            , this country has population of <strong>{population}</strong> and
            it has gained the independent, according to the CIA World Factbook.
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="large" color="primary">
            <Link to={map} target="_blank">
              <LocationOnIcon />
            </Link>
          </IconButton>
          <IconButton
            size="large"
            color="primary"
            onClick={() => window.history.back()}
          >
            <CottageIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default Country;
