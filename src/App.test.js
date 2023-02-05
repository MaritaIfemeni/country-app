import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";
import { waitFor } from "@testing-library/react";

test("search link is in the document", () => {
  render(<App />);
  const linkElement = screen.getByText(/Search/i);
  expect(linkElement).toBeInTheDocument();
});

test("search working", async () => {
  render(<App />);
  const searchElement = screen.getByPlaceholderText(/Search for a country.../i);
  expect(searchElement).toBeInTheDocument();
  searchElement.value = "Finland";
  const buttonElement = screen.getByText(/Search/i);
  expect(buttonElement).toBeInTheDocument();
  buttonElement.click();
  await waitFor(() => {
    const countryElement = screen.getByText(/Finland/i);
    expect(countryElement).toBeInTheDocument();
  });
});
