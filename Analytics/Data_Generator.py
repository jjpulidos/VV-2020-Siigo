from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
import decimal
import datetime
import bson

tableName = {
    "Tenant": "Tenant-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Product": "Product-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Invoices": "Invoices-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Invoice_Item": "InvoiceItem-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Customer": "Customer-audikvopovh2tbgiuxmmbys7vu-vvsiigo"
}

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if abs(o) % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')

# # Adding a row in Tenant
# Tenant = dynamodb.Table(tableName["Tenant"])
# email = "multifunctionallab@gmail.com"
# name = "Doofenshmirtz Malvados y Asociados"
#
# response = Tenant.put_item(
#    Item={
#         'id': "ec059827-3fdd-4ed7-86c2-0a6ec60b6f3b",
#         'email': email,
#         'name': name
#     }
# )



# Adding a row in Product
# Product = dynamodb.Table(tableName["Product"])
# email = "multifunctionallab@gmail.com"
# name = "Tomate Cherry"
# description = "Libra de Tomate Proveniente del Olimpo"
# price = decimal.Decimal('12000.45')
# expired_date = datetime.datetime.now().strftime("%x %X")
# #
# response = Product.put_item(
#    Item={
#         'id': str(bson.objectid.ObjectId()),
#         'tenant_id': "ec059827-3fdd-4ed7-86c2-0a6ec60b6f3b",
#         'name': name,
#         'description': description,
#         'price': price,
#         'expired_date': expired_date
#     }
# )


# # Adding a row in Customer
# Customer = dynamodb.Table(tableName["Customer"])
# tenant_id = "ec059827-3fdd-4ed7-86c2-0a6ec60b6f3b"
# first_name = "Juan"
# last_name = "Pulido"
#
# response = Customer.put_item(
#    Item={
#         'id': str(bson.objectid.ObjectId()),
#         'tenant_id': tenant_id,
#         'first_name': first_name,
#         'last_name': last_name
#     }
# )


# Adding a row in Invoices
Invoices = dynamodb.Table(tableName["Invoices"])
tenant_id = "ec059827-3fdd-4ed7-86c2-0a6ec60b6f3b"
customer_id = "5e3eff138cefb30c13bd541a"
doc_date = datetime.datetime.now().strftime("%x %X")
doc_number = "1"
total_discount = 0
total_tax = 0
total_value = 24001

response = Invoices.put_item(
   Item={
        'id': str(bson.objectid.ObjectId()),
        'tenant_id': tenant_id,
        'customer_id': customer_id,
        'doc_date': doc_date,
        'doc_number': doc_number,
        'total_discount': total_discount,
        'total_tax': total_tax,
        'total_value': total_value
    }
)

# #########################
print("PutItem succeeded:")
print(json.dumps(response, indent=4, cls=DecimalEncoder))
