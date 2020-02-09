from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
import decimal
import datetime
import bson
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
import os

tableName = {
    "Tenant": "Tenant-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Product": "Product-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Invoices": "Invoices-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Invoice_Item": "InvoiceItem-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Customer": "Customer-audikvopovh2tbgiuxmmbys7vu-vvsiigo"
}

# print(os.listdir("."))
# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

dynamodb = boto3.resource("dynamodb", region_name='us-west-2')




# ##############################################################################################
# Tenant = dynamodb.Table(tableName["Tenant"])
# response = Tenant.scan(
#     FilterExpression=Key('email').eq("multifunctionallab@gmail.com")
# )
#
# for i in response['Items']:
#     print(i['name'], ":", i['email'], ":", i['id'])

# ##############################################################################################



# ##############################################################################################
# Product = dynamodb.Table(tableName["Product"])
# response = Product.scan(
#     # FilterExpression=Key('name').eq("Tomate Cherry")
# )
#
# for i in response['Items']:
#     # print(i['name'], ":", i['description'], ":", i['id'])
#     print(i['id'])

# ##############################################################################################




# ##############################################################################################
# Customer = dynamodb.Table(tableName["Customer"])
#
# response = Customer.scan(
#     FilterExpression=Key('last_name').eq("Pulido")
# )
#
# for i in response['Items']:
#     print(i['tenant_id'], ":", i['first_name'], ":", i['last_name'])
#
#
# ##############################################################################################


# ##############################################################################################
# Invoices = dynamodb.Table(tableName["Invoices"])
#
# response = Invoices.scan(
#     FilterExpression=Key('doc_number').eq("1")
# )
#
# for i in response['Items']:
#     print(i['tenant_id'], ":", i['customer_id'], ":", i['total_value'], ":", i["doc_date"])
# ##############################################################################################


# ##############################################################################################
InvoiceItem = dynamodb.Table(tableName["Invoice_Item"])

response = InvoiceItem.scan(
    # FilterExpression=Key('invoice_id').eq("5e3f02966841606e28bb69eb")
)

print(len(response['Items']))
# for i in response['Items']:
#     print(i['invoice_id'], ":", i['quantity'], ":", i['unit_value'], ":", i["item_value"])
# ##############################################################################################

#
# print(response)
#
# print(type(response))
#
# print(response["id"])