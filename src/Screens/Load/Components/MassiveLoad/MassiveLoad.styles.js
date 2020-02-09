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

export const SendButtonContainer = styled.div `
    grid-column: 1/3;
    grid-row: 12/13;
`

export const LoadingState = styled.div `
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 100;
    box-sizing: border-box;
    top: 0;
    left: 0;
    background: 'rgba(0, 0, 0, .5)';
    display: flex;
    justify-content: center;
    align-items: center;
`