import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

test("render spinner", () => {
  render(<Spinner show={false} />);
  const linkElement = screen.getByTestId(/spinner/i);
  expect(linkElement).toBeInTheDocument();
});
