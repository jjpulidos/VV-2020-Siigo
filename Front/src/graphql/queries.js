/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTenant = /* GraphQL */ `
  query GetTenant($id: ID!) {
    getTenant(id: $id) {
      id
      name
      email
    }
  }
`;
export const listTenants = /* GraphQL */ `
  query ListTenants(
    $filter: ModelTenantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTenants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
      }
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      tenant_id
      name
      description
      price
      expired_date
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tenant_id
        name
        description
        price
        expired_date
      }
      nextToken
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      id
      tenant_id
      first_name
      last_name
    }
  }
`;
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tenant_id
        first_name
        last_name
      }
      nextToken
    }
  }
`;
export const getInvoices = /* GraphQL */ `
  query GetInvoices($id: ID!) {
    getInvoices(id: $id) {
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
export const listInvoicess = /* GraphQL */ `
  query ListInvoicess(
    $filter: ModelInvoicesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvoicess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tenant_id
        customer_id
        doc_date
        doc_number
        total_discount
        total_taxt
        total_value
      }
      nextToken
    }
  }
`;
export const getInvoiceItem = /* GraphQL */ `
  query GetInvoiceItem($id: ID!) {
    getInvoiceItem(id: $id) {
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
export const listInvoiceItems = /* GraphQL */ `
  query ListInvoiceItems(
    $filter: ModelInvoiceItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvoiceItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tenant_id
        product_id
        invoice_id
        quantity
        unit_value
        item_value
      }
      nextToken
    }
  }
`;
