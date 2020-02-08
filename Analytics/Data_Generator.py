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
#
# print("PutItem succeeded:")
# print(json.dumps(response, indent=4, cls=DecimalEncoder))


# Adding a row in Product
Product = dynamodb.Table(tableName["Product"])
email = "multifunctionallab@gmail.com"
name = "Tomate Cherry"
description = "Libra de Tomate Proveniente del Olimpo"
price = decimal.Decimal('12000.45')
expired_date = datetime.datetime.now().strftime("%x %X")
#
response = Product.put_item(
   Item={
        'id': str(bson.objectid.ObjectId()),
        'tenant_id': "ec059827-3fdd-4ed7-86c2-0a6ec60b6f3b",
        'name': name,
        'description': description,
        'price': price,
        'expired_date': expired_date
    }
)
#
print("PutItem succeeded:")
print(json.dumps(response, indent=4, cls=DecimalEncoder))
