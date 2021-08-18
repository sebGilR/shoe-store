import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import List from "./Components/List";
import Nav from "./Components/Nav";
import Stats from "./Components/Stats";

const Main = styled.main`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  color: white;
  font-family: "Raleway", sans-serif;
  letter-spacing: 2px;
`;

const Double = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 10%;

  & > div {
    padding: 0 10px;
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
  const noLongerHigh = newStock?.[store]?.[model] && inventory <= 80;
  const toExistingStore = newStock?.[store] && inventory > 80;
  const toNewStore = inventory > 80;

  if (noLongerHigh) {
    delete newStock[store][model];
    if (Object.keys(newStock[store]).length === 0) {
      delete newStock[store];
    }
  } else if (toExistingStore) {
    newStock[store][model] = inventory;
  } else if (toNewStore) {
    newStock[store] = { [model]: inventory };
  }

  return newStock;
};

const updateLowStock = (
  { store, model, inventory }: StockEntryType,
  currentStock: StockType
): StockType => {
  const newStock = { ...currentStock };
  const noLongerLow = newStock?.[store]?.[model] && inventory >= 20;
  const toExistingStore = newStock?.[store] && inventory < 20;
  const toNewStore = inventory < 20;

  if (noLongerLow) {
    delete newStock[store][model];
    if (Object.keys(newStock[store]).length === 0) {
      delete newStock[store];
    }
  } else if (toExistingStore) {
    newStock[store][model] = inventory;
  } else if (toNewStore) {
    newStock[store] = { [model]: inventory };
  }

  return newStock;
};

const getStoreCount = (stores: StockType): number => {
  return stores ? Object.keys(stores).length : 0;
};

const getProductCount = (stores: StockType): number => {
  let count = 0;

  if (stores) {
    Object.keys(stores).forEach((key) => {
      count += Object.keys(stores[key]).length;
    });
  }

  return count;
};

const App: React.FC = () => {
  const [stock, setStock] = useState<StockType>();
  const [highStock, setHighStock] = useState<StockType>();
  const [lowStock, setLowStock] = useState<StockType>();
  const [highStockCount, setHighStockCount] = useState<number>(0);
  const [lowStockCount, setLowStockCount] = useState<number>(0);
  const [highStockStoresCount, setHighStockStoresCount] = useState<number>(0);
  const [lowStockStoresCount, setLowStockStoresCount] = useState<number>(0);

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

  useEffect(() => {
    setHighStockStoresCount(getStoreCount(highStock));
    setLowStockStoresCount(getStoreCount(lowStock));
    setHighStockCount(getProductCount(highStock));
    setLowStockCount(getProductCount(lowStock));
  }, [highStock, lowStock]);

  const statsItems = [
    { name: "High Stock Stores", count: highStockStoresCount },
    { name: "High Stock Products", count: highStockCount },
    { name: "Low Stock Stores", count: lowStockStoresCount },
    { name: "Low Stock Products", count: lowStockCount },
  ];

  return (
    <Router>
      <Nav />
      <Main>
        <Stats items={statsItems} />
        <Switch>
          <Route exact path="/">
            <List items={stock} />
          </Route>
          <Route path="/low-high">
            <Double>
              <List items={lowStock} />
              <List items={highStock} />
            </Double>
          </Route>
        </Switch>
      </Main>
    </Router>
  );
};

export default App;
