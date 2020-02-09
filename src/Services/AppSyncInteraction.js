import React from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import * as mutation from '../graphql/mutations'

export const CreateProductService = data => 
    API.graphql(graphqlOperation(mutation.createProduct, {
        input: {
            tenant_id: data.tenant_id,
            name: data.name,
            description: data.description,
            price: data.price,
            expired_date: data.expired_date || "n/a"
        }
    }))
