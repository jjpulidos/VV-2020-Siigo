import React, { useState, useContext, useEffect } from 'react'
import * as st from './MassiveLoad.styles'
import { FilePond } from 'react-filepond';
import { Button, Icon } from 'antd'
import { SaveFilesInS3 } from '../../.././../Services/StorageInteraction'
import Axios from 'axios';
import Swal from 'sweetalert2'


export const MassiveLoad = () => {
    const [Files, setFiles] = useState([])
    const [ProcessingMicroServiceEndpoint] = useState('https://dr4y7jc0d4.execute-api.us-west-2.amazonaws.com/dev/processing')
    const [LoadingScreen, setLoadingScreen] = useState(false)
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })



    useEffect(() => {
        if (Files.length) 
            !Files[0].length && setFiles([])
    }, [Files]) 


    //This is a general function to handle the loading state
    const ChangeLoadingStateBeforeSend = (bool, option, folder=null, files=null) => {
        
        setLoadingScreen(bool);
        option === 1 ? SendDataToProcessingMicroService() : SendProcessingRequest(folder, files)
        option === 2 && ShowSweetAlert()
    }


    const ShowSweetAlert = () => {
        Toast.fire({
            icon: 'success',
            title: 'Archivos cargados exitosamente',
        })
    }


    //This function sends all files to S3 through the StorageInteraction service
    const SendDataToProcessingMicroService = () => {
        
        let random_id = RandomIdGenerator()
        try {
            Files[0].forEach(async (file, index) => {
                let response = await SaveFilesInS3(`TailProcessing/${random_id}/${index + 1}.csv`, file, 'text/csv')
                console.log("%cFile Uploaded", "color: green; font-weight: bolder")
                if (index === Files[0].length - 1) {
                    ChangeLoadingStateBeforeSend(false, 2, random_id, Files[0].length)
                } 
            })
            
        }catch (err) {
            
            console.error("ERROR => ", err)
        }
    }



    // This Function send a post request to the batch processing micro service
    // It doesn't have a response cause is just for compute the csv to dynamo transition
    const SendProcessingRequest = (folder, files) => {
        
        setFiles([])
        Axios({
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            url: ProcessingMicroServiceEndpoint,
            data: {
                folder: folder,
                files: files
            }
        })
            .catch(err => console.error("Something went wrong => ", err))
    }




    //This function generates an id for a batch processing folder in S3
    const RandomIdGenerator = () => 
        '_' + Math.random().toString(36).substr(2, 9);

    return (
        <st.MassiveLoadContainer>
            <st.Title onClick={() => console.log(Files)}> Subir archivos </st.Title>

            <st.LayoutIncluder>
                <st.FilePondContainer>
                    <FilePond
                        labelIdle='Arrastra o selecciona archivo (MAX. 5)'
                        allowMultiple={true}
                        files={Files[0]}
                        maxFiles={5}
                        onupdatefiles={e => setFiles([...Files, e.map(x => x.file)])}
                    />
                </st.FilePondContainer>
            </st.LayoutIncluder>

            <st.SendButtonContainer>
                <Button 
                    disabled={Files.length ? false : true} 
                    type='primary' 
                    onClick={() => ChangeLoadingStateBeforeSend(true, 1)} > 
                        {LoadingScreen ? <Icon type='loading' style={{color: '#fff'}} /> : "Procesar"} 
                    </Button>
            </st.SendButtonContainer>

        </st.MassiveLoadContainer>
    )
}