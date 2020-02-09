import styled from 'styled-components'

export const ProductEditionContainer = styled.div `
    grid-column: 2/6;
    grid-row: 4/12;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(12, 1fr);
    position: relative;
`

export const ProductEditionFieldsContainer = styled.div `
    grid-column: 1/5;
    grid-row: 2/11;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
    grid-row-gap: 1em;
`

export const SingleProductEditionField = styled.div `
    
`

export const FieldTitle = styled.p `
    font-size: 1em;
    margin: 0;
    color: #323232;   
`

export const ButtonsContainer = styled.div `
    grid-column: 1/5;
    grid-row: 12/13;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const DeleteButtonContainer = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .7em;
    border-radius: 4px;
    border: .5px solid tomato;
    cursor: pointer;
`