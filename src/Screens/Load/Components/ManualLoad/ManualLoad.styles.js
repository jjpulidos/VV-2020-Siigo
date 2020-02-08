import styled from 'styled-components';

export const ManualLoadContainer = styled.div`
    padding: 1em;
    position: relative;
    grid-column: 1/13;
    grid-row: 1/13;

    display: grid; 
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
`;

export const Form = styled.div`
  grid-column: 1/10;
  grid-row: 6/7;
    
   
`;

export const Field = styled.div`

`;



export const FieldTitle = styled.p`
  margin: 0;
  font-weight: bolder;
  font-size: 1.2em;
`;
