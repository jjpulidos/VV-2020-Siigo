/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTenant = /* GraphQL */ `
  subscription OnCreateTenant {
    onCreateTenant {
      id
      name
      email
    }
  }
`;
export const onUpdateTenant = /* GraphQL */ `
  subscription OnUpdateTenant {
    onUpdateTenant {
      id
      name
      email
    }
  }
`;
export const onDeleteTenant = /* GraphQL */ `
  subscription OnDeleteTenant {
    onDeleteTenant {
      id
      name
      email
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
      id
      tenant_id
      name
      description
      price
      expired_date
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
      id
      tenant_id
      name
      description
      price
      expired_date
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
      id
      tenant_id
      name
      description
      price
      expired_date
    }
  }
`;
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer {
    onCreateCustomer {
      id
      tenant_id
      first_name
      last_name
    }
  }
`;
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer {
    onUpdateCustomer {
      id
      tenant_id
      first_name
      last_name
    }
  }
`;
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer {
    onDeleteCustomer {
      id
      tenant_id
      first_name
      last_name
    }
  }
`;
export const onCreateInvoices = /* GraphQL */ `
  subscription OnCreateInvoices {
    onCreateInvoices {
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
export const onUpdateInvoices = /* GraphQL */ `
  subscription OnUpdateInvoices {
    onUpdateInvoices {
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
export const onDeleteInvoices = /* GraphQL */ `
  subscription OnDeleteInvoices {
    onDeleteInvoices {
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
export const onCreateInvoiceItem = /* GraphQL */ `
  subscription OnCreateInvoiceItem {
    onCreateInvoiceItem {
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
export const onUpdateInvoiceItem = /* GraphQL */ `
  subscription OnUpdateInvoiceItem {
    onUpdateInvoiceItem {
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
export const onDeleteInvoiceItem = /* GraphQL */ `
  subscription OnDeleteInvoiceItem {
    onDeleteInvoiceItem {
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
