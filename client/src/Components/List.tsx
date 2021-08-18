import React from "react";
import styled, { css } from "styled-components";
import SectionBase, { Title } from "./Utils";

const ListContainer = styled(SectionBase)``;

const Row = styled.div`
  display: flex;
  border-bottom: 1px solid #dfdfdf34;
`;

const SubList = styled.div`
  background-color: black;
  color: white;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 30px;
`;

const Cell = styled.div<CellProps>`
  padding: 10px 20px;
  width: 33.33%;
  ${({ pill }) => {
    switch (pill) {
      case "Out of stock":
        return css`
          background-color: #d04b4b;
          color: white;
        `;
      case "Very low":
        return css`
          background-color: #dfa151;
          color: black;
        `;
      case "Low":
        return css`
          background-color: #d3c8b9;
          color: black;
        `;
      case "High stock":
        return css`
          background-color: #a5d497;
          color: black;
        `;
      default:
        return null;
    }
  }};
`;

const TitleCell = styled(Cell)`
  background-color: #2e2b2b;
`;

type ModelType = {
  [model: string]: number;
};

type StockType = {
  [store: string]: ModelType;
};

type ListProps = {
  items: StockType | undefined;
};

type CellProps = {
  pill?: string;
};

type StoreStockProps = {
  title: string;
  items: StockType;
};

type SortKeyAttrs = StockType | ModelType | undefined;

const columns = ["MODEL", "INVENTORY", "STOCK LEVEL"];

const computeStockLevel = (inventory: number) => {
  if (inventory === 0) return "Out of stock";
  if (inventory < 10) return "Very low";
  if (inventory < 20) return "Low";
  if (inventory > 80) return "High stock";

  return "Normal";
};

const sortKeys = (items: SortKeyAttrs) => items && Object.keys(items).sort();

const StoreStock = ({ title, items }: StoreStockProps): JSX.Element => {
  const modelKeys = sortKeys(items[title]);

  return (
    <SubList key={title}>
      <Title>{title}</Title>
      <Row>
        {columns.map((column) => (
          <TitleCell key={column}>{column}</TitleCell>
        ))}
      </Row>
      {modelKeys &&
        modelKeys.map((model: string) => {
          const stockLevel = computeStockLevel(items[title][model]);
          return (
            <Row key={`${title}-${model}`}>
              <Cell>{model}</Cell>
              <Cell>{items[title][model]}</Cell>
              <Cell pill={stockLevel}>{stockLevel}</Cell>
            </Row>
          );
        })}
    </SubList>
  );
};

const List = ({ items }: ListProps): JSX.Element => {
  const storeKeys = sortKeys(items);

  return (
    <ListContainer>
      {items &&
        storeKeys &&
        storeKeys.map((title: string) => (
          <StoreStock title={title} items={items} />
        ))}
    </ListContainer>
  );
};

export default List;
