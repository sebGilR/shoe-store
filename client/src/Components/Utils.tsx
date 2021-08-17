import styled from "styled-components";

const SectionBase = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0 10%;
`;

export const Accent = styled.span`
  color: #64c064;
`;

export const Button = styled.a`
  background-color: #64c064;
  padding: 10px 15px;
  color: white;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    box-shadow: 0px 0px 6px 0px #e8e8e840;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #dfdfdf34;

  span div {
    display: inline;
  }
`;

export default SectionBase;
