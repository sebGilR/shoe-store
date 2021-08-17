import React, { useEffect, useState } from "react";
import styled from "styled-components";
import List from "./Components/List";
import Nav from "./Components/Nav";

const Main = styled.main`
  position: absolute;
  min-height: 100vh;
  top: 80px;
  left: 0;
  right: 0;
  color: white;
  font-family: "Raleway", sans-serif;
  letter-spacing: 2px;
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

  useEffect(() => {
    const WS = new WebSocket("ws://localhost:8080/");

    WS.onmessage = (event) => {
      const entry = JSON.parse(event.data);
      setStock((prevState) => updateStock(entry, prevState));
    };
  }, []);

  return (
    <>
      <Nav />
      <Main>
        <List items={stock} />
      </Main>
    </>
  );
};

export default App;
