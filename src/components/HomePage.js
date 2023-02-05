import { useState, useEffect } from "react";
import { TableHead, TableRow, TableCell, TableBody, Table } from "@mui/material";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import IconButton from "@mui/material/IconButton";

function HomePage() {
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
    }
    fetchData();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    async function fetchData() {
      if (!e.target.previousSibling) {
        return;
      }
      const searchTerm = e.target.previousSibling.value;
      if (!searchTerm) {
        return;
      }
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${e.target.previousSibling.value}`
      );
      const data = await response.json();
      setCountries(data);
    }

    fetchData();
  };

  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", handleClick);
  });
  const rows = countries.map((country) => {
    let ls = [];
    for (let key in country.languages) {
      ls.push(country.languages[key]);
    }

    return {
      flag: country.flags.png,
      name: country.name.common,
      population: country.population,
      region: country.region,
      languages: {
        la: ls,
      },
    };
  });

  return (
    <div className="body">
      <AppBar position="static" color="primary" className="appbar">
        <div className="header">
          <div className="header-left">
            <h1 className="header-text">Country App</h1>
          </div>
          <div className="header-right">
            <input
              className="search"
              type="text"
              placeholder="Search for a country..."
            />
            <Button variant="contained" color="secondary" onClick={handleClick}>
              Search
            </Button>
          </div>
        </div>
      </AppBar>
      <Table className="table" > 
        <TableHead>
          <TableRow className="table-header">
            <TableCell>Flag</TableCell>
            <TableCell field="name">Name</TableCell>
            <TableCell>Population</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Languages</TableCell>
            <TableCell>Read More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <img alt="flag" height="100px" src={row.flag} />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.population}</TableCell>
                <TableCell>{row.region}</TableCell>
                <TableCell>
                  {row.languages.la.map((language, i) => (
                    <li key={i}>{language}</li>
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton size="large" color="primary">
                    <Link to={`/country/${row.name}`}>
                      <NavigateNextIcon />
                    </Link>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default HomePage;
