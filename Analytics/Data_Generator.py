from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
import decimal

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


# Adding a row in ac_Tenant
table = dynamodb.Table('Tenant-audikvopovh2tbgiuxmmbys7vu-vvsiigo')
print(table)
email = "jjpulidos98@gmail.com"
name = "Doofenshmirtz Malvados y Asociados"

response = table.put_item(
   Item={
        'id': "jj",
        'email': email,
        'name': name
    }
)

print("PutItem succeeded:")
print(json.dumps(response, indent=4, cls=DecimalEncoder))
