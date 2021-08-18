import React, { useEffect, useState } from "react";
import styled from "styled-components";
import List from "./Components/List";
import Nav from "./Components/Nav";

const Main = styled.main`
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  color: white;
  font-family: "Raleway", sans-serif;
  letter-spacing: 2px;
`;

const Double = styled.div`
  display: flex;
  justify-content: stretch;

  & > div {
    padding: 0 30px;
  }
`;

type StockEntryType = {
  store: string;
  model: string;
  inventory: number;
};

type StockType =
  | {
      [store: string]: { [model: string]: number };
    }
  | undefined;

const App: React.FC = () => {
  const [stock, setStock] = useState<StockType | undefined>();
  const [highStock, setHighStock] = useState<StockType | undefined>();
  const [lowStock, setLowStock] = useState<StockType | undefined>();
  const [contrastTabSelected, setContrastTabSelected] =
    useState<boolean>(false);

  const updateStock = (
    { store, model, inventory }: StockEntryType,
    currentStock: StockType
  ): StockType => {
    const newStock = { ...currentStock };

    if (newStock?.[store]) {
      newStock[store][model] = inventory;
    } else if (newStock) {
      newStock[store] = { [model]: inventory };
    }

    return newStock;
  };

  const updateHighStock = (
    { store, model, inventory }: StockEntryType,
    currentStock: StockType
  ): StockType => {
    const newStock = { ...currentStock };

    if (newStock?.[store]?.[model] && inventory <= 80) {
      delete newStock[store][model];
      if (Object.keys(newStock[store]).length === 0) {
        console.log("REMOVED High", store, model);
        delete newStock[store];
        // console.log("FOUND YAAA" + newStock[store]);
      }
    } else if (newStock?.[store] && inventory > 80) {
      newStock[store][model] = inventory;
    } else if (inventory > 80) {
      newStock[store] = { [model]: inventory };
    }

    return newStock;
  };

  const updateLowStock = (
    { store, model, inventory }: StockEntryType,
    currentStock: StockType
  ): StockType => {
    const newStock = { ...currentStock };

    if (newStock?.[store]?.[model] && inventory >= 20) {
      delete newStock[store][model];
      if (Object.keys(newStock[store]).length === 0) {
        console.log("REMOVED Low", store, model);
        delete newStock[store];
        // console.log("FOUND YAAA" + newStock[store]);
      }
    } else if (newStock?.[store] && inventory < 20) {
      newStock[store][model] = inventory;
    } else if (inventory < 20) {
      newStock[store] = { [model]: inventory };
    }

    return newStock;
  };

  const updateState = (entry: StockEntryType): void => {
    setStock((prevState) => updateStock(entry, prevState));
    setHighStock((prevState) => updateHighStock(entry, prevState));
    setLowStock((prevState) => updateLowStock(entry, prevState));
  };

  useEffect(() => {
    const WS = new WebSocket("ws://localhost:8080/");

    WS.onmessage = (event) => {
      const entry = JSON.parse(event.data);
      updateState(entry);
    };
  }, []);

  // useEffect(() => {
  //   console.log(highStock);
  //   console.log(lowStock);
  // }, [highStock, lowStock]);

  return (
    <>
      <Nav />
      <Main>
        {!contrastTabSelected && <List items={stock} />}
        {contrastTabSelected && (
          <Double>
            <List items={lowStock} />
            <List items={highStock} />
          </Double>
        )}
      </Main>
    </>
  );
};

export default App;
