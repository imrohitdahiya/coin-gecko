import React, { useEffect, useMemo, useState } from "react";
import "./CoinsList.scss";
import Table from "react-bootstrap/Table";
import { ICoins, ICoinsDetails } from "../../services/types";
import useLoading from "../hooks/useLoading";
import ModalContainer from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getCoinsData } from "../../store/reducers/coinsSlice";
import { AppDispatch, RootState } from "../../store/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { getCoinDetails } from "../../store/reducers/coinDetailsSlice";
import PaginationContainer from "../pagination/PaginationContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const CoinsList: React.FC = () => {
  const { coinDetails } = useSelector((state: RootState) => state);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [coinsData, setCoinsData] = useState<ICoins[]>();
  const [coinsDetails, setCoinsDetails] = useState<ICoinsDetails>();
  const { loading, setLoading } = useLoading();
  const dispatch = useDispatch<AppDispatch>();
  const [activePage, setActivePage] = useState(1);

  const memoValue = useMemo(
    () =>
      !loading && (
        <div className="paginationWrapper">
          <PaginationContainer
            activePage={activePage}
            handlePaginationClick={(pageNumber) => getCoinsDataFunc(pageNumber)}
          />
        </div>
      ),
    [activePage]
  );

  const getCoinsDataFunc = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const resultAction = await dispatch(
        getCoinsData({ currency: "EUR", per_page: 10, page: pageNumber })
      );
      const originalPromiseResult = unwrapResult(resultAction);
      setCoinsData(originalPromiseResult);
      setActivePage(pageNumber);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getCoinsDetails = async (id: string) => {
    try {
      setLoading(true);
      const resultAction = await dispatch(getCoinDetails(id));
      const originalPromiseResult = unwrapResult(resultAction);
      setCoinsDetails(originalPromiseResult);
    } catch (e) {
      console.log(e);
    } finally {
      setIsModalOpen(true);
      setLoading(false);
    }
  };

  const columns = [
    "Image",
    "Name",
    "Symbol",
    "Current Price",
    "High 24 Hour Price",
    "Low 24 Hour Price",
  ];

  useEffect(() => {
    getCoinsDataFunc();
  }, []);

  return (
    <div className="main">
      <h1>Coin Gecko</h1>
      <div className="tableWrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns &&
                columns.map((item: string) => {
                  return <th key={item}>{item}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {coinsData &&
              coinsData.map((item: ICoins) => {
                return (
                  <tr
                    key={item.name}
                    data-test={item.name}
                    onClick={() => {
                      if (coinDetails.coinDetails.id === item.id) {
                        setCoinsDetails(coinDetails.coinDetails);
                        setIsModalOpen(true);
                        return;
                      }
                      getCoinsDetails(item.id);
                    }}
                  >
                    <td>
                      <img
                        className="img-responsive"
                        alt={item.name}
                        src={item.image}
                      />
                    </td>
                    <td>
                      <b>{item.name}</b>
                    </td>
                    <td>{item.symbol}</td>
                    <td>{item.current_price}</td>
                    <td>{item.high_24h}</td>
                    <td>{item.low_24h}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        {memoValue}
      </div>
      <ModalContainer
        heading={`${coinsDetails?.name} (${coinsDetails?.symbol})` || ""}
        isOpen={isModalOpen}
        onDismiss={() => {
          setIsModalOpen(false);
        }}
        buttonText="Close"
      >
        <Container>
          <Row>
            <Col md={6}>
              <label>Hashing Algorithm</label>
              <h5>{coinsDetails?.hashing_algorithm || '-'}</h5>
            </Col>
            <Col md={6}>
              <label>Genesis Date</label>
              <h5>{coinsDetails?.genesis_date || '-'}</h5>
            </Col>
            <Col md={12}>
              <label>HomePage</label>
              <h5>
                <ul>
                  {coinsDetails?.links.homepage.map((item, index) => (
                    <li
                      key={index + 1}
                      style={{
                        cursor: "pointer",
                        color: "blue",
                        wordBreak: "break-all",
                      }}
                    >
                      <a href={item} rel="noreferrer" target="_blank">{item}</a>
                    </li>
                  ))}
                </ul>
              </h5>
            </Col>
            <Col md={12}>
              <label>Description</label>
              <h5>{coinsDetails?.description.en || '-'}</h5>
            </Col>
          </Row>
        </Container>
      </ModalContainer>
    </div>
  );
};

export default CoinsList;
