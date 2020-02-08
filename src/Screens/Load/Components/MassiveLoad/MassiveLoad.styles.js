import styled from 'styled-components'

export const MassiveLoadContainer = styled.div `
    padding: 1em;
    position: relative;
    grid-column: 1/13;
    grid-row: 1/13;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
`

export const Title = styled.p `
    grid-row: 3/4;
    grid-column: 1/4;
    margin: 0;
    font-weight: bolder;
    font-size: 1.2em;
`

export const LayoutIncluder = styled.div `
    grid-column: 1/13;
    grid-row: 3/11;
`

export const FilePondContainer = styled.div `
    width: 100%;
    position: absolute;
    margin-top: 2em;
`