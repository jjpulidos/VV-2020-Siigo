import React, { useState, useContext, useEffect } from 'react'
import * as st from './ProductsPanel.style'
import { Input, Button, Empty } from 'antd'
import { 
    BringSomeProducts, 
    DeleteProduct, 
    SubscribeToProductsTableAtDelete,
    SubscribeToProductsTableAtCreate
} from '../../../../Services/AppSyncInteraction'
import { Icon } from 'antd';
import { ProductEdition } from './Components/ProductEdition/ProductEdition';
import Swal from 'sweetalert2'
import * as subscription from '../../../../graphql/subscriptions'




export const ProductsPanel = () => {
    const [Products, setProducts] = useState([])
    const [NextToken, setNextToken] = useState("")
    const [TenantID] = useState(localStorage.getItem('user-id'))
    const [ShowProductsList, setShowProductsList] = useState(true)
    const [LocalProductToEdit, setLocalProductToEdit] = useState({})
    const [SearchText, setSearchText] = useState("")
    const [NewProduct, setNewProduct] = useState({})
    const { Search } = Input;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })


    // This hook brings the first 10 products at component render
    useEffect(() => {
        BringProducts(10, TenantID)
    }, [])


    useEffect(() => {
        setProducts([...Products, NewProduct])
    }, [NewProduct])

    
    // This hook subscribes the component in order to listen changes in dynamodb
    useEffect(() => {
        let aux = Products
        const sub_on_delete = SubscribeToProductsTableAtDelete()
            .subscribe({
                next: () => BringProducts(10, TenantID)
            })

        const sub_on_create = SubscribeToProductsTableAtCreate()
            .subscribe({
                next: item => {
                    console.log(item)
                    let newItem = item.value.data.onCreateProduct
                    setNewProduct(newItem)
                }
            })
        return () => {
            sub_on_delete.unsubscribe()
            sub_on_create.unsubscribe()
        }
    }, [])
        

    // This function brings the first 10 elements acording with the company, and a token for pagination
    const BringProducts = (limit, TenantID) => 
        BringSomeProducts(parseInt(limit), TenantID)
            .then(res => {
                console.log(res.data.listProducts.items)
                setProducts(res.data.listProducts.items)
                setNextToken(res.data.listProducts.nextToken)
            })
    

    // This function render the product list from the api dinamycally :D
    const RenderProducts = () => 
        Products.map((product, index) => 
            <st.SingleProduct key={index}>
                <st.ProductElement> {product.name} </st.ProductElement>
                <Icon onClick={() => HandleIconsBehavior('edit', product)} type='edit' style={{cursor: 'pointer', color: 'steelblue'}} />
                <Icon onClick={() => HandleIconsBehavior('delete', null, product.id)} type='delete' style={{cursor: 'pointer', color: 'tomato'}} />
            </st.SingleProduct>
        )

    const CallBack = () => {
        console.log(Products)
    }
    
        
    // This is a central function for handling Icons behavior
    const HandleIconsBehavior = (option, product=null, id) => {
        option === 'edit' && EditProduct(product)
        option === 'delete' && ConfirmBeforeDelete(id)
    }

    const EditProduct = product => {
        setLocalProductToEdit(product)
        setShowProductsList(false)
    }


    const ConfirmBeforeDelete = id => 
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar este producto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1890FF',
            cancelButtonColor: 'tomato',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => result.value && DeleteSingleProduct(id))


    const DeleteSingleProduct = id => 
        DeleteProduct(id)
            .then(() => ShowSweetAlert('success', 'El producto se ha eliminado correctamente'))
            .catch(err => {
                console.error(err)
                ShowSweetAlert('error', 'Hubo un problema eliminando el producto')
            })
    

    const ShowSweetAlert = (state, message) => {
        state === 'error' ? 
        Toast.fire({
          icon: 'error',
          title: message
        })
        : 
        Toast.fire({
          icon: 'success',
          title: message
        })
      }







    return (
        <st.ProductsPanelContainer>
            <st.Title onClick={()=>console.log(Products)}> Productos </st.Title>
            <st.SearchInputContainer>
                <Search 
                    value={SearchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder='Busca algún producto...'
                /> 
            </st.SearchInputContainer>

            
            {
                ShowProductsList ? 
                <st.ProductListContainer>
                    { Products.length ? RenderProducts() : (
                        <st.NoProductsToShow>
                            <Empty description='Sin productos aún' />
                        </st.NoProductsToShow>
                    )}
                </st.ProductListContainer>
                :
                <ProductEdition showListAgain={() => setShowProductsList(true) } product={LocalProductToEdit} />
            }
        </st.ProductsPanelContainer>
    )
}