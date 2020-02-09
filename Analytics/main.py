import boto3
import json
import decimal
import datetime
import bson
from io import StringIO
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
import pandas as pd
from faker import Faker
import random

tableName = {
    "Tenant": "Tenant-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Product": "Product-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Invoices": "Invoices-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Invoice_Item": "InvoiceItem-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Customer": "Customer-audikvopovh2tbgiuxmmbys7vu-vvsiigo"
}


def lambda_handler(event, context):

    num = event["files"]
    folder = event["folder"]

    s3 = boto3.resource('s3')
    dir_bucket = "vv2020siigo-vvsiigo"
    my_bucket = s3.Bucket(dir_bucket)

    # aux = []
    # for file in my_bucket.objects.all():
    #     aux.append(file.key.split("/")[1])

    # csv_list = [i for i in aux if (len(i))]

    dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
    Product = dynamodb.Table(tableName["Product"])

    for i in range(1, num+1):
        obj = s3.Object(dir_bucket, "TailProcessing/{}/{}".format(folder, str(i) + ".csv"))

    # Adding rows into Product from a csv using panditas
    # for csv in csv_list:

        csv_read = obj.get()["Body"].read()
        s = str(csv_read, 'utf-8')

        data = StringIO(s)
        df = pd.read_csv(data)
        try:
            for index, row in df.iterrows():

                name = row["name"]
                description = row.description
                price = decimal.Decimal(row.price)
                expired_date = row.expired_date
                tenant_id = row.tenant_id

                response = Product.put_item(
                   Item={
                        'id': str(bson.objectid.ObjectId()),
                        'tenant_id': tenant_id,
                        'name': name,
                        'description': description,
                        'price': price,
                        'expired_date': expired_date
                    }
                )
        except:
            continue
    return "Hi"


def faker_generator_products(num_prod):
    # Width of the display in characters. If set to None and pandas will correctly auto-detect the width.
    faker = Faker()
    tenant_id = "ec059827-3fdd-4ed7-86c2-0a6ec60b6f3b"
    rows_list = []
    for i in range(num_prod):
        dict1 = {}
        dict1["id"] = bson.objectid.ObjectId()
        dict1["tenant_id"] = tenant_id
        dict1["name"] = faker.name()
        dict1['description'] = faker.text()
        # dict1['price'] = ,
        dict1['expired_date'] = faker.date_between(start_date='today', end_date='+30m')
        # print(dict1)
        rows_list.append(dict1)

    df = pd.DataFrame(rows_list, columns=["id", "tenant_id", "name", "description", "expired_date"])
    df["price"] = round(float(random.uniform(1000.0, 10000.0)),2)
    df.to_csv("test_faker.csv", index=False)

    return 0

# faker_generator_products(10)