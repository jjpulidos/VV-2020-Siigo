import React, { useState, useContext, useEffect } from 'react'
import * as st from './ControlPanel.styles'
import { ProductsPanel } from './Panels/ProductsPanel/ProductsPanel'
import { CustomersPanel } from './Panels/CustomersPanel/CustomersPanel'

export const ControlPanel = () => {

    return (
        <st.ControlPanelContainer>
            <ProductsPanel />
            <CustomersPanel />
        </st.ControlPanelContainer>
    )
}