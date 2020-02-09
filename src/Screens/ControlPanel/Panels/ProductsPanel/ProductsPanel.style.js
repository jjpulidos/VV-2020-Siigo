import styled from 'styled-components'

export const ProductsPanelContainer = styled.div `
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(12, 1fr);
    position: relative; 
`

export const TopTitlesContainer = styled.div `
    grid-column: 2/7;
    grid-row: 2/3;
    display: flex;
    align-items: center;
`

export const Title = styled.p `
    font-size: 1.5em;
    color: #323232;
    margin: 0;
`

export const LastSearchedContainer = styled.p `
    margin: .1em 0 0 1em;
    color: #1890FF;
    font-size: 1em;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`

export const SearchInputContainer = styled.div `
    grid-column: 2/6;
    grid-row: 3/4;
`

export const ProductListContainer = styled.div `
    grid-column: 2/6;
    grid-row: 4/12;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: .6em;
    margin-top: 1.2em;
     
`

export const SingleProduct = styled.div `
    display: grid;
    grid-template-columns: 10fr 1fr 1fr; 
    grid-template-rows: 1fr;
    grid-gap: .4em;
`

export const ProductElement = styled.p `
    color: #323232;
`

export const NoProductsToShow = styled.div `
    grid-column: 1/6;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const PaginationContainer = styled.div `
    position: fixed;
    bottom: 12%;
    left: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 5%;
`

