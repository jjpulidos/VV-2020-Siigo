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



export const CreateClientService = (id, data) => 
    API.graphql(graphqlOperation(mutation.createCustomer, {
        input: {
            tenant_id: id,
            first_name: data.name,
            last_name: data.lastname
        }
    }))



export const BringSomeProducts = (limit, id) => 
    API.graphql(graphqlOperation(query.listProducts,  {
        filter: {
            tenant_id: {
                eq: id
            },
        
        }, limit: 100000
        
        
    }))


export const BringSomeCustomers = (id) => 
    API.graphql(graphqlOperation(query.listCustomers,  {
        filter: {
            tenant_id: {
                eq: id
            },
        
        }, limit: 100000
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


export const UpdateCustomer = (new_product, tenant, id) => 
    API.graphql(graphqlOperation(mutation.updateCustomer, {
        input: {
            id: id,
            tenant_id: tenant,
            first_name: new_product["Nombre"],
            last_name: new_product["Apellido"]
        }
    }))
    


export const DeleteProduct = id => 
    API.graphql(graphqlOperation(mutation.deleteProduct, {
        input: {
            id: id
        }
    }))

export const DeleteClient = id => 
    API.graphql(graphqlOperation(mutation.deleteCustomer, {
        input: {
            id: id
        }
    }))


    


export const SubscribeToProductsTableAtDelete = () => 
    API.graphql(graphqlOperation(subscription.onDeleteProduct))

export const SubscribeToProductsTableAtCreate = () => 
    API.graphql(graphqlOperation(subscription.onCreateProduct))

export const SubscribeToProductsTableAtUpdate = () => 
    API.graphql(graphqlOperation(subscription.onUpdateProduct))





export const SubscribeToClientsAtCreate = () =>
    API.graphql(graphqlOperation(subscription.onCreateCustomer))

export const SubscribeToClientsAtUpdate = () =>
    API.graphql(graphqlOperation(subscription.onUpdateCustomer))

export const SubscribeToClientsAtDelete = () =>
    API.graphql(graphqlOperation(subscription.onDeleteCustomer))