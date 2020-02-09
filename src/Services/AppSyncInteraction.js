import React from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import * as mutation from '../graphql/mutations'
import * as query from '../graphql/queries'
import * as subscription from '../graphql/subscriptions'




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



export const BringSomeProducts = (limit, id) => 
    API.graphql(graphqlOperation(query.listProducts,  {
        filter: {
            tenant_id: {
                eq: id
            },
        
        }, limit: 28
        
        
    }))


export const BringSomeCustomers = (id) => 
    API.graphql(graphqlOperation(query.listCustomers,  {
        filter: {
            tenant_id: {
                eq: id
            },
        
        }, limit: 28
    }))



export const UpdateProduct = (new_product, tenant, id) => 
    API.graphql(graphqlOperation(mutation.updateProduct, {
        input: {
            id: id,
            tenant_id: tenant,
            name: new_product["Nombre"],
            description: new_product["Descripción"],
            price: parseFloat(new_product["Precio"]),
            expired_date: new_product["Fecha de Expiración"]
        }
    }))
    


export const DeleteProduct = id => 
    API.graphql(graphqlOperation(mutation.deleteProduct, {
        input: {
            id: id
        }
    }))



export const SubscribeToProductsTableAtDelete = () => 
    API.graphql(graphqlOperation(subscription.onDeleteProduct))



export const SubscribeToProductsTableAtCreate = () => 
    API.graphql(graphqlOperation(subscription.onCreateProduct))