import styled from 'styled-components'

export const AddClientContainer = styled.div `
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`

export const FormBox = styled.div `
    padding: 1em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, .3), inset 0 -3px 0 0 #1890FF;
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(5, 1fr);
`

export const Title = styled.p `
    font-size: 1.2em;
    grid-row: 1/2;
    grid-column: 1/4;
`

export const FormContainer = styled.div `
    grid-row: 2/5;
    grid-column: 1/7;
`

export const Subtitle = styled.p `
    margin: .5em 0 .1em 0;
`

export const FinalButtonsContainer = styled.div `
    grid-row: 5/6;
    grid-column: 1/7;
    display: flex;
    justify-content: space-between;
    margin-top: 1em;    

`

export const BackArrowContainer = styled.div `
    width: 100%;   
    position: absolute; 
    top: -15%;
    left: 2%;

`