import boto3
import json
import decimal
import datetime
import bson
import requests
from io import StringIO
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
import pandas as pd


import numpy as np

tableName = {
    "Tenant": "Tenant-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Product": "Product-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Invoices": "Invoices-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Invoice_Item": "InvoiceItem-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Customer": "Customer-audikvopovh2tbgiuxmmbys7vu-vvsiigo"
}

# Initialization Real time
GRAPHQL_URL = 'https://5yv5obbypvgaxdswzcide2khoq.appsync-api.us-west-2.amazonaws.com/graphql'

GRAPHQL_API_KEY = "da2-fvwq55ppkrcehie4g75hphspkq"

headers = {
    'Content-Type': "application/graphql",
    'x-api-key': GRAPHQL_API_KEY,
    'cache-control': "no-cache",
}


def insertItem(query):
    payload_obj = {"query": query}
    payload = json.dumps(payload_obj)
    response = requests.request("POST", GRAPHQL_URL, data=payload, headers=headers)
    return(response)


def lambda_handler(event, context):

    num = event["files"]
    folder = event["folder"]

    s3 = boto3.resource('s3')
    dir_bucket = "vv2020siigo-vvsiigo"


    dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
    Product = dynamodb.Table(tableName["Product"])

    for i in range(1, num+1):
        obj = s3.Object(dir_bucket, "public/TailProcessing/{}/{}".format(folder, str(i) + ".csv"))

    # Adding rows into Product from a csv using panditas
    # for csv in csv_list:

        csv_read = obj.get()["Body"].read()
        # print(csv_read)
        s = str(csv_read, 'utf-8')

        data = StringIO(s)
        df = pd.read_csv(data)
        # print(df["expired_date"])
        # try:
        for index, row in df.iterrows():

            name = row["name"]
            description = row.description
            price = decimal.Decimal(str(row.price))
            expired_date = row.expired_date
            tenant_id = row.tenant_id

            mutation = """mutation {
        createProduct(input: {
            tenant_id: "%s",
            name: "%s",
            description: "%s",
            price: %s,
            expired_date: "%s"
        }){id tenant_id name description price expired_date}}""" % (tenant_id, name, description.replace("\n", ""), price, expired_date)

            # print(mutation)
            response = insertItem(mutation)

            # response = Product.put_item(
            #    Item={
            #         'id': str(bson.objectid.ObjectId()),
            #         'tenant_id': tenant_id,
            #         'name': name,
            #         'description': description,
            #         'price': price,
            #         'expired_date': expired_date
            #     }
            # )
        # except:
        #     continue
    return response.json()
