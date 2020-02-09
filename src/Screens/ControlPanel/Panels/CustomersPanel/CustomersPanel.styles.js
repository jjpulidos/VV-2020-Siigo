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
    grid-row: 4/13;
    display: grid;
    grid-gap: .8em;
`

export const SingleClient = styled.div `
    padding: 1em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, .2);
    height: 60px;
    display: grid;
    grid-template-columns: 5fr 1fr 1fr;
    grid-gap: .5em;
    align-content: center;
`

export const InfoText = styled.p `
    font-size: 1.1em;
    color: #323232;
    display: flex;
    align-items: center;
    margin: 0;
`
export const NoClientsToShow = styled.div `
    grid-column: 1/6;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const PaginationContainer = styled.div `
    position: fixed;
    bottom: 10%;
    right: 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 5%;
`
export const TopTitlesContainer = styled.div `
    grid-column: 2/7;
    grid-row: 2/3;
    display: flex;
    align-items: center;
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