import React, { useState, useContext, useEffect } from 'react'
import * as st from './ProductsPanel.style'
import { Input, Button, Empty, Modal, AutoComplete, Icon } from 'antd'
import { 
    BringSomeProducts, 
    DeleteProduct, 
    SubscribeToProductsTableAtDelete,
    SubscribeToProductsTableAtCreate,
    SubscribeToProductsTableAtUpdate
} from '../../../../Services/AppSyncInteraction'
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
    const [NamesArray, setNamesArray] = useState([])
    const [DataSource, setDataSource] = useState([])
    const { Search } = Input;
    const [PageNumber, setPageNumber] = useState(1)
    const [PaginationRange, setPaginationRange] = useState(0)
    const [TotalPages, setTotalPages] = useState(0)
    const [ModalVisibility, setModalVisibility] = useState(false)
    const [LastSerchs, setLastSearchs] = useState([])
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
        setLastSearchs(JSON.parse(localStorage.getItem('searchs')))
    }, [])


    // This hook catch the last item for the subscription and put it at the end of the current one
    useEffect(() => {
        setProducts([...Products, NewProduct])
    }, [NewProduct])


    // This hook observes the DataSource array change to reset it
    useEffect(() => {
        !SearchText.length && setDataSource(NamesArray)
    }, [DataSource])

    
    // This hook subscribes the component in order to listen changes in dynamodb
    useEffect(() => {
        let aux = Products
        const sub_on_delete = SubscribeToProductsTableAtDelete()
            .subscribe({
                next: () => BringProducts(10, TenantID)
            })

        const sub_on_create = SubscribeToProductsTableAtCreate()
            .subscribe({
                next: () => {
                    BringProducts(10, TenantID)
                }
            })
        
        const sub_on_update = SubscribeToProductsTableAtUpdate()
            .subscribe({
                next: () => BringProducts(10, TenantID)
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
                setDataSource(res.data.listProducts.items.map(x=>x.name))
                setNamesArray(res.data.listProducts.items.map(x=>x.name))
                setTotalPages(parseInt(res.data.listProducts.items.length / 10))
            })
    

    // This function render the product list from the api dinamycally :D
    const RenderProducts = () => 
        Products.slice(PaginationRange, PaginationRange + 10).map((product, index) => 
            <st.SingleProduct key={index}>
                <st.ProductElement> {product.name} </st.ProductElement>
                <Icon onClick={() => HandleIconsBehavior('edit', product)} type='edit' style={{cursor: 'pointer', color: 'steelblue'}} />
                <Icon onClick={() => HandleIconsBehavior('delete', null, product.id)} type='delete' style={{cursor: 'pointer', color: 'tomato'}} />
            </st.SingleProduct>
        )

    // This function render the elements acording with the input 
    const RenderFilteredProducts = () =>
        Products.filter(x => x.name.toLowerCase().includes(SearchText.toLowerCase())).map((product, index) => 
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


      const NextPage = () => {
        if (PageNumber < Products.length / 10) {
            setPageNumber(PageNumber + 1)
            if (PageNumber === TotalPages - 1) {
                setPaginationRange(PaginationRange + 10)
            } else {
                setPaginationRange(PaginationRange + 10)
            }
        }
      }


      const PrevPage = () => {
        if (PageNumber > 1) {
            setPageNumber(PageNumber - 1)
            setPaginationRange(PaginationRange - 10)
          }
      }


      const SaveSearch = searchedvalue => {
        setSearchText(searchedvalue)
        let searchs = []
        if (LastSerchs !== null){
            if (LastSerchs.length < 3 ) {
                searchs = LastSerchs
                searchs.push(searchedvalue)
                localStorage.setItem('searchs', JSON.stringify(searchs))
            }else {
                searchs = LastSerchs
                searchs.shift()
                searchs.push(searchedvalue)
                localStorage.setItem('searchs', JSON.stringify(searchs))
            }
        }else {
            searchs.push(searchedvalue)
            localStorage.setItem('searchs', JSON.stringify(searchs))
        }
        
        
      }

      


      const SearchValue = text => {
        setSearchText(text)
        setDataSource(DataSource.filter(x => x.toLowerCase().includes(text.toLowerCase())))
      }



      const ShowModal = () => {
        setModalVisibility(true)
      }



    return (
        <st.ProductsPanelContainer>
            
            <st.TopTitlesContainer>
                <st.Title onClick={()=>localStorage.removeItem('searchs')}> Productos </st.Title>
                <st.LastSearchedContainer onClick={ShowModal}> últimas búsquedas </st.LastSearchedContainer> 
            </st.TopTitlesContainer>
            
            <st.SearchInputContainer>
            <AutoComplete
                dataSource={DataSource}
                style={{width: '100%'}}
                onSelect={selected => SaveSearch(selected)}
                value={SearchText}
                onSearch={text => SearchValue(text)}
                placeholder="Busca algún producto..."
            />
            </st.SearchInputContainer>

            
            {
                ShowProductsList ? 
                <st.ProductListContainer>
                    { (Products.length && !SearchText.length) 
                        ? RenderProducts() : 
                        (Products.length && SearchText.length) ?
                        RenderFilteredProducts() : 
                        <st.NoProductsToShow>
                            <Empty description='Sin productos aún' />
                        </st.NoProductsToShow>
                    }

                    <st.PaginationContainer>
                        <Icon onClick={PrevPage} style={{cursor: 'pointer', color: '#1890FF', fontSize: '1.2em'}} type='arrow-left' />
                            { PageNumber }
                        <Icon onClick={NextPage} style={{cursor: 'pointer', color: '#1890FF', fontSize: '1.2em'}} type='arrow-right' />
                    </st.PaginationContainer> 
                </st.ProductListContainer>
                :
                <ProductEdition showListAgain={() => setShowProductsList(true) } product={LocalProductToEdit} />
            }


            

        <Modal
          title="Últimas búsquedas realizadas"
          visible={ModalVisibility}
          onOk={() => setModalVisibility(false)}
          onCancel={() => setModalVisibility(false)}
        >
            { LastSerchs && LastSerchs.map((search, index) => <p key={index}>{search}</p>) }
        </Modal>
        </st.ProductsPanelContainer>
    )
}