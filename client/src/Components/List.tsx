import React from "react";
import styled, { css } from "styled-components";
import SectionBase, { Title } from "./Utils";

const ListContainer = styled(SectionBase)``;

const Row = styled.div`
  display: flex;
  border-bottom: 1px solid #dfdfdf34;
`;

type StockType = {
  [store: string]: { [model: string]: number };
};

type ListProps = {
  items: StockType | undefined;
};

const SubList = styled.div`
  background-color: black;
  color: white;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 30px;
`;

type CellProps = {
  pill?: string;
};

const Cell = styled.div<CellProps>`
  padding: 10px 20px;
  width: 33.33%;
  ${({ pill }) => {
    if (pill === "Out of stock") {
      return css`
        background-color: #d04b4b;
        color: white;
      `;
    }
    if (pill === "Very low") {
      return css`
        background-color: #dfa151;
        color: black;
      `;
    }
    if (pill === "Low") {
      return css`
        background-color: #d3c8b9;
        color: black;
      `;
    }

    return null;
  }};
`;

const TitleCell = styled(Cell)`
  background-color: #2e2b2b;
`;

const columns = ["MODEL", "INVENTORY", "STOCK LEVEL"];

const List = ({ items }: ListProps): JSX.Element => {
  const sortKeys = (keys: any) => keys && Object.keys(keys).sort();

  const computeStockLevel = (inventory: number) => {
    if (inventory === 0) return "Out of stock";
    if (inventory < 10) return "Very low";
    if (inventory < 20) return "Low";
    if (inventory > 80) return "Almost full";

    return "Normal";
  };

  const storeKeys = sortKeys(items);

  return (
    <ListContainer>
      {items &&
        storeKeys.map((title: string) => {
          const modelKeys = sortKeys(items[title]);
          return (
            <SubList key={title}>
              <Title>{title}</Title>
              <div>
                <Row>
                  {columns.map((column) => (
                    <TitleCell key={column}>{column}</TitleCell>
                  ))}
                </Row>
                {modelKeys.map((model: string) => {
                  const stockLevel = computeStockLevel(items[title][model]);
                  return (
                    <Row key={`${title}-${model}`}>
                      <Cell>{model}</Cell>
                      <Cell>{items[title][model]}</Cell>
                      <Cell pill={stockLevel}>{stockLevel}</Cell>
                    </Row>
                  );
                })}
              </div>
            </SubList>
          );
        })}
    </ListContainer>
  );
};

export default List;
