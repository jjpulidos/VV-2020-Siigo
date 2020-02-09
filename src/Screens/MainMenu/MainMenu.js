import React, { useState, useContext, useEffect } from 'react'
import * as st from './MainMenu.styles'
import { Icon } from 'antd'
import { navigate } from '@reach/router'

export const MainMenu = () => {
    const [MenuOptions, setMenuOptions] = useState({
        "Panel de Control": ["pic-right", "control-panel"],
        "Carga de recursos": ["cloud-upload", "load"],
        "Carga de clientes": ["usergroup-add", "add-client"],
        "Analítica": ["bar-chart", "analitics"]
    })


    // This function render the menu options dynamically :d
    const RenderMenuOptions = () => 
        Object.keys(MenuOptions).map((option, index) => 
            <st.SingleOptionContainer onClick={() => navigate(MenuOptions[option][1])} key={index}>
                <Icon style={{fontSize: '1.3em', color: '#323232'}} type={MenuOptions[option][0]}  />
                <st.OptionName> { option } </st.OptionName>
            </st.SingleOptionContainer>
        )

    return (
        <st.MainMenuContainer>
            <st.GreetContainer>
                <st.ImageWrapper src={require('../../Assets/logo_vvc.svg')} />
                <st.Title> Bienvenido a VVC </st.Title> 
            </st.GreetContainer>
            
            <st.MenuOptionsContainer>
                {RenderMenuOptions()}
            </st.MenuOptionsContainer>
        </st.MainMenuContainer>
    )
}