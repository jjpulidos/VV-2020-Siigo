import styled from 'styled-components'

export const CustomersPanelContaiener = styled.div `
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(12, 1fr);
`

export const Title = styled.p `
    grid-column: 2/7;
    grid-row: 2/3;
    font-size: 1.5em;
    color: #323232;
    margin: 0;
`

export const SearchInputContainer = styled.div `
    grid-column: 2/6;
    grid-row: 3/4;
`

export const ClientsListContainer = styled.div `
    grid-column: 2/6;
    grid-row: 5/12;
    display: grid;
    grid-template-columns: 1fr 1fr; 
    grid-gap: 1em;
`

export const SingleClient = styled.div `
    
`

export const InfoText = styled.p `
    font-size: 1.1em;
    color: #323232;
`
export const NoClientsToShow = styled.div `
    grid-column: 1/6;
    display: flex;
    justify-content: center;
    align-items: center;
`