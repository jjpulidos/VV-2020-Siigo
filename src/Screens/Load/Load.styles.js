import styled from 'styled-components';

export const LoadContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
`;

export const LoadOptionsContainer = styled.div`
  grid-column: 2/6;
  grid-row: 2/3;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.p`
  margin: 0;
  font-weight: bolder;
  font-size: 1.4em;
  grid-column: 1/4;
  grid-row: 2/3;
`;

export const SelectedLoadOptionContainer = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 2/12;
  grid-row: 3/12;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
`;
