import boto3
import json
import decimal
import datetime
import bson
from io import StringIO
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
import pandas as pd
import numpy as np
import json


tableName = {
    "Tenant": "Tenant-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Product": "Product-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Invoices": "Invoices-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Invoice_Item": "InvoiceItem-audikvopovh2tbgiuxmmbys7vu-vvsiigo",
    "Customer": "Customer-audikvopovh2tbgiuxmmbys7vu-vvsiigo"
}


class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        else:
            return super(NpEncoder, self).default(obj)


def lambda_handler(event, context):

    tenant_id = event["tenant_id"]
    dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
    Invoices = dynamodb.Table(tableName["Invoices"])
    InvoiceItem = dynamodb.Table(tableName["Invoice_Item"])
    Customer = dynamodb.Table(tableName["Customer"])

    response = Invoices.scan(
        FilterExpression=Key("tenant_id").eq(tenant_id),
        # Limit=50
    )

    df_Invoices = pd.DataFrame(response["Items"], columns=["id", "tenant_id", "customer_id", "doc_date",
                                                           "doc_number", "total_discount", "total_tax", "total_value"])

    customers = Customer.scan(FilterExpression=Key("tenant_id").eq(tenant_id))["Items"]
    nro_customers = len(customers)
    df_Invoices = df_Invoices.loc[:, ["customer_id", "doc_date", "total_value"]]

    df_Customers = df_Invoices.loc[:, ["customer_id", "doc_date", "total_value"]]
    df_Customers_value = df_Customers.loc[:, ["customer_id", "doc_date"]]
    df_Customers_value["doc_date"] = pd.to_datetime(df_Customers_value["doc_date"])
    df_Customers["doc_date"] = pd.to_datetime(df_Customers["doc_date"])
    # df_Invoices_value["total_value"] = df_Invoices_value["total_value"].astype(float)
    # df_Customers_value.index = df_Customers_value['doc_date']


    df_Invoices_value = df_Invoices.loc[:, ["doc_date", "total_value"]]
    df_Invoices_value["doc_date"] = pd.to_datetime(df_Invoices_value["doc_date"])
    df_Invoices_value["total_value"] = df_Invoices_value["total_value"].astype(float)
    df_Invoices_value.index = df_Invoices_value['doc_date']
    # total_invoices = df_Invoices.shape[0]

    # df_Invoices_days = df_Invoices_value.groupby(by=df_Invoices_value.doc_date.dt.month)

    with pd.option_context('display.max_rows', None, 'display.max_columns', None):
        dir_bucket = "vv2020siigo-vvsiigo"
        s3_resource = boto3.resource('s3')
        # first_object = s3_resource.Object(bucket_name=dir_bucket, key="public/analytics")
        respuesta = {}

        # Mean Money Collected Graphics

        # print("Mean Money Collected per Invoice Yearly")
        # sf1 = df_Invoices_value.loc[:, "total_value"].resample('Y').mean()
        # df1 = pd.DataFrame({'doc_date': sf1.index, 'mean_money_collected': sf1.values})
        # print("")

        print("Mean Money Collected per Invoice Monthly")
        sf2 = df_Invoices_value.loc[:, "total_value"].resample('M').mean()
        df2 = pd.DataFrame({'doc_date': sf2.index, 'mean_money_collected': sf2.values})
        print("")

        csv_buffer = StringIO()
        df2.to_csv(csv_buffer)
        # s3_resource.Object(dir_bucket, 'Valor_Factura_Promedio_Mensual.csv').put(Body=csv_buffer.getvalue())


        # Total Money Collected Graphics

        print("Total Money Collected Per Year")
        sf3 = pd.to_numeric(df_Invoices_value.loc[:, "total_value"].resample('Y').sum())
        df3 = pd.DataFrame({'doc_date': sf3.index, 'mean_money_collected': sf3.values})
        print("")


        csv_buffer = StringIO()
        df3.to_csv(csv_buffer)
        # s3_resource.Object(dir_bucket, 'Valor_Factura_Promedio_Anual.csv').put(Body=csv_buffer.getvalue())

        # print("Total Money Collected Per Month", df_Invoices_value.loc[:, "total_value"].resample('M').sum())
        # print("")

        # Invoices Ammount Graphics

        # print("Mean Invoices Ammount Yearly")
        # print(df_Invoices_value.loc[:, "total_value"].resample('Y').count().mean())
        # print("")

        # print("Invoices Ammount per Year")
        # print(df_Invoices_value.loc[:, "total_value"].resample('Y').count())
        # print("")

        print("Invoices Ammount per Month")
        sf4 = df_Invoices_value.loc[:, "total_value"].resample('M').count()
        df4 = pd.DataFrame({'doc_date': sf4.index, 'mean_money_collected': sf4.values})

        csv_buffer = StringIO()
        df4.to_csv(csv_buffer, index=False)
        s3_resource.Object(dir_bucket, 'Numero_Facturas_Mensual.csv').put(Body=csv_buffer.getvalue())


        # Customers Proportion Graphics

        # print("Customers Proportion per Year")
        # print(df_Customers.groupby([pd.Grouper(freq='1Y', key='doc_date'), 'customer_id']).count().groupby('doc_date').count()/nro_customers * 100)
        # print("")

        print("Customers Proportion per Month")
        sf5 = df_Customers.groupby([pd.Grouper(freq='1M', key='doc_date'), 'customer_id']).count().groupby('doc_date').count()/nro_customers * 100
        # df5 = pd.DataFrame({'doc_date': sf5.index, 'mean_money_collected': sf5.values})

        csv_buffer = StringIO()
        sf5.to_csv(csv_buffer)
        # s3_resource.Object(dir_bucket, 'Tasa_clientes_Mensual.csv').put(Body=csv_buffer.getvalue())

        # ####################################################################################################################
        # Descriptive Metrics
        ##################################################################################################################3
        # Mean Money Collected Metric

        print("Mean Money Collected per Invoice")
        # print(df_Invoices_value.loc[:, "total_value"].resample('Y').mean().mean())
        respuesta["Media_Valor_Factura"] = df_Invoices_value.loc[:, "total_value"].resample('Y').mean().mean()
        print("")

        # Customers Proportion Metrics
        print("Customers Proportion")
        # print(df_Customers.groupby([pd.Grouper(freq='1Y', key='doc_date'), 'customer_id']).count().groupby('customer_id').count().count())
        # print()
        respuesta["Tasa_clientes"] = df_Customers.groupby([pd.Grouper(freq='1Y', key='doc_date'), 'customer_id']).count().groupby('customer_id').count().count()[0]
        print("")


        # Total Money Collected Metrics

        # print("Total Money Collected", df_Invoices_value.loc[:, "total_value"].resample('M').sum().sum())
        respuesta["Monto_total_facturas"] = df_Invoices_value.loc[:, "total_value"].resample('M').sum().sum()
        print("")

        print("Total Invoices Ammount")
        # print(df_Invoices_value.loc[:, "total_value"].resample('M').count().sum())
        respuesta["Numero_total_facturas"] = df_Invoices_value.loc[:, "total_value"].resample('M').count().sum()
        print("")

        # print("Number of Customers Created ", nro_customers)
        respuesta["Numero_Clientes"]= nro_customers
        print("")

    return json.dumps(respuesta, cls=NpEncoder)


print(lambda_handler({"tenant_id": "hola"}, 4))