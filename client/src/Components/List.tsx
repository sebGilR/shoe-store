import React from "react";
import styled from "styled-components";
import SectionBase, { Title } from "./Utils";

const ListContainer = styled(SectionBase)``;

const Row = styled.div`
  display: flex;
  border-bottom: 1px solid #dfdfdf34;
`;

type ListProps = {
  items: any;
};

const SubList = styled.div`
  background-color: black;
  color: white;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 30px;
`;

const Cell = styled.div`
  padding: 10px 20px;
  width: 33.33%;
`;

const TitleCell = styled(Cell)`
  background-color: #2e2b2b;
`;

const columns = ["MODEL", "INVENTORY", "STOCK LEVEL"];

const List = ({ items }: ListProps): JSX.Element => {
  const sortKeys = (keys: string[]) => keys && Object.keys(keys).sort();

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
        storeKeys.map((title) => {
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
                {modelKeys.map((model) => {
                  const stockLevel = computeStockLevel(items[title][model]);
                  return (
                    <Row key={`${title}-${model}`}>
                      <Cell>{model}</Cell>
                      <Cell>{items[title][model]}</Cell>
                      <Cell>{stockLevel}</Cell>
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
