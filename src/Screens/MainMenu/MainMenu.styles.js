import styled from 'styled-components'

export const MainMenuContainer = styled.div `
    width: 100%;
    height: 100%;
    padding: 2em;

    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
`

export const Title = styled.h1 `
    font-weight: bolder;
    margin-left: 1em;
`

export const GreetContainer = styled.div `
    grid-column: 1/8;
    grid-row: 1/3;
    display: flex;
    align-items: center;

`

export const ImageWrapper = styled.img `
    width: 4%;
`

export const MenuOptionsContainer = styled.div `
    grid-column: 1/11;
    grid-row: 3/4;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`

export const SingleOptionContainer = styled.div `
    display: flex;
    align-items: center;
    padding: 1em;
    margin-left: 2em;
    box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
    transition: 150ms ease-in-out;
    cursor: pointer;
    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, .5), inset 0 -5px 0 0 #1890FF;
    };
    &:first-child{
        margin-left: 0;

    }
`

export const OptionName = styled.p `
    font-size: 1.2em;
    font-weight: bolder;
    margin: 0 0 0 1em;
`