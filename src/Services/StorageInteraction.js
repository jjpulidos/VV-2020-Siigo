import { Storage } from 'aws-amplify'

export const SaveFilesInS3 = (route, file, type) => 
    Storage.put(route, file, { contentType: type })