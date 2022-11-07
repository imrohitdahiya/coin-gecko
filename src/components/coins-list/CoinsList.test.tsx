import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CoinsList from "./CoinsList";
import { Store, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "../../store/rootReducer";
import CoinsService from "../../services/coins-service";

const makeStore = (): Store => configureStore({ reducer: rootReducer });

const renderComponent = () =>
  render(
    <Provider store={makeStore()}>
      <CoinsList />
    </Provider>
  );

describe("CoinList Component", () => {
  test("renders learn react link", () => {
    renderComponent();
    const linkElement = screen.getByText(/Coin Gecko/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("when row is clicked", () => {
    const makeRequestSpy = jest.spyOn(CoinsService.instance, "getMarketCoins");
    makeRequestSpy.mockImplementation(() =>
      Promise.resolve([
        {
          id: "bitcoin",
          image: "bitcoin.image",
          name: "Bitcoin",
          symbol: "BTC",
          current_price: "1000",
          high_24h: 2000,
          low_24h: 500,
        },
      ])
    );

    const makeRequestSpy2 = jest.spyOn(CoinsService.instance, "getCoinsById");
    makeRequestSpy2.mockImplementation(() =>
      Promise.resolve({
        name: "Bitcoin",
        symbol: "BTC",
        hashing_algorithm: "BTCHash",
        genesis_date: "12/23/27",
        description: {
          en: 'coin description',
        },
        id: "bitcoin",
        links: {
          homepage: [""],
        },
      })
    );
    renderComponent();
    const row = screen.getByTestId("Bitcoin");
    expect(row).toBeInTheDocument();
    fireEvent.click(row);
  });
});
