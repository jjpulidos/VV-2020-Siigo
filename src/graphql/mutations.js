/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTenant = /* GraphQL */ `
  mutation CreateTenant(
    $input: CreateTenantInput!
    $condition: ModelTenantConditionInput
  ) {
    createTenant(input: $input, condition: $condition) {
      id
      name
      email
    }
  }
`;
export const updateTenant = /* GraphQL */ `
  mutation UpdateTenant(
    $input: UpdateTenantInput!
    $condition: ModelTenantConditionInput
  ) {
    updateTenant(input: $input, condition: $condition) {
      id
      name
      email
    }
  }
`;
export const deleteTenant = /* GraphQL */ `
  mutation DeleteTenant(
    $input: DeleteTenantInput!
    $condition: ModelTenantConditionInput
  ) {
    deleteTenant(input: $input, condition: $condition) {
      id
      name
      email
    }
  }
`;
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      tenant_id
      name
      description
      price
      expired_date
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      tenant_id
      name
      description
      price
      expired_date
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      tenant_id
      name
      description
      price
      expired_date
    }
  }
`;
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
      id
      tenant_id
      first_name
      last_name
    }
  }
`;
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
      id
      tenant_id
      first_name
      last_name
    }
  }
`;
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
      id
      tenant_id
      first_name
      last_name
    }
  }
`;
export const createInvoices = /* GraphQL */ `
  mutation CreateInvoices(
    $input: CreateInvoicesInput!
    $condition: ModelInvoicesConditionInput
  ) {
    createInvoices(input: $input, condition: $condition) {
      id
      tenant_id
      customer_id
      doc_date
      doc_number
      total_discount
      total_taxt
      total_value
    }
  }
`;
export const updateInvoices = /* GraphQL */ `
  mutation UpdateInvoices(
    $input: UpdateInvoicesInput!
    $condition: ModelInvoicesConditionInput
  ) {
    updateInvoices(input: $input, condition: $condition) {
      id
      tenant_id
      customer_id
      doc_date
      doc_number
      total_discount
      total_taxt
      total_value
    }
  }
`;
export const deleteInvoices = /* GraphQL */ `
  mutation DeleteInvoices(
    $input: DeleteInvoicesInput!
    $condition: ModelInvoicesConditionInput
  ) {
    deleteInvoices(input: $input, condition: $condition) {
      id
      tenant_id
      customer_id
      doc_date
      doc_number
      total_discount
      total_taxt
      total_value
    }
  }
`;
export const createInvoiceItem = /* GraphQL */ `
  mutation CreateInvoiceItem(
    $input: CreateInvoiceItemInput!
    $condition: ModelInvoiceItemConditionInput
  ) {
    createInvoiceItem(input: $input, condition: $condition) {
      id
      tenant_id
      product_id
      invoice_id
      quantity
      unit_value
      item_value
    }
  }
`;
export const updateInvoiceItem = /* GraphQL */ `
  mutation UpdateInvoiceItem(
    $input: UpdateInvoiceItemInput!
    $condition: ModelInvoiceItemConditionInput
  ) {
    updateInvoiceItem(input: $input, condition: $condition) {
      id
      tenant_id
      product_id
      invoice_id
      quantity
      unit_value
      item_value
    }
  }
`;
export const deleteInvoiceItem = /* GraphQL */ `
  mutation DeleteInvoiceItem(
    $input: DeleteInvoiceItemInput!
    $condition: ModelInvoiceItemConditionInput
  ) {
    deleteInvoiceItem(input: $input, condition: $condition) {
      id
      tenant_id
      product_id
      invoice_id
      quantity
      unit_value
      item_value
    }
  }
`;
