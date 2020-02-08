import React, { useState, useContext, useEffect } from 'react'
import * as st from './MassiveLoad.styles'
import { FilePond } from 'react-filepond';

export const MassiveLoad = () => {
    const [Files, setFiles] = useState([])

    return (
        <st.MassiveLoadContainer>
            <st.Title> Subir archivos </st.Title>

            <div style={{width: '20%'}}>
            <FilePond
                labelIdle='Arrastra o selecciona archivo'
                
                allowMultiple={true}
                files={Files}
                maxFiles={16}
                onupdatefiles={e => setFiles([...Files, e.file])}
            />
            </div>
        </st.MassiveLoadContainer>
    )
}