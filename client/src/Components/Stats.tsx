import React from "react";
import styled from "styled-components";

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 60px;
  margin-bottom: 30px;
  background-color: black;
`;

const StatsItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  text-align: center;
  span {
    color: gray;
    font-size: 12px;
  }
`;

type StatsItemProps = {
  name: string;
  count: number;
};

type StatsProps = {
  items: StatsItemProps[];
};

const StatsItem = ({ name, count }: StatsItemProps): JSX.Element => (
  <StatsItemWrapper>
    {count}
    <span>{name}</span>
  </StatsItemWrapper>
);

const Stats = ({ items }: StatsProps): JSX.Element => {
  return (
    <StatsContainer>
      {items.map((item) => (
        <StatsItem key={item.name} {...item} />
      ))}
    </StatsContainer>
  );
};

export default Stats;
