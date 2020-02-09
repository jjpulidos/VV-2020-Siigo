# VVC Hackathon Siigo 2020

![](https://i.imgur.com/TDOpbPy.jpg)

**Integrantes:**

* Ronald Prato
* Juan Pulido


## Problema:

Se cuenta con el modelo de Datos Multitenant; este modelo cuenta con un simple esquema de facturación y donde nos centraremos en las tablas clientes/ productos.

1. Desarrollar un API que permita la consulta de estas tablas con su CRUD básico
2. Se debe simular el proceso de transacción en el que la empresa CUEROS Colombia tiene un grupo de productos, el cual ingresará de manera masiva utilizando un archivo de carga (CSV,XLS, o manualmente)
3. Se debe simular el comportamiento normal de un conjunto de N Usuarios de M Empresas, realizando operación de rutina: buscar, crear, modificar y solicitar (clientes, productos)
4. Se debe crear una funcionalidad de búsqueda de productos, esta debe contar con un esquema que permita predecir el producto a escoger, y deben almacenar temporalmente datos de preferencia de búsqueda.
5. Se debe crear una funcionalidad de búsqueda de terceros, esta debe contar con un esquema que permita predecir el cliente a escoger, y deben almacenar temporalmente datos de preferencia de búsqueda, por usuario.
6. Las búsquedas deben funcionar sincronizadas con los datos que se están ingresando, es decir, el usuario que realiza la búsqueda debe poder visualizar, sin refrescar la página, los datos que se están creando/modificando desde la simulación del punto 3, garantizado rendimiento y sorteando el problema de contención de datos por concurrencia. 
 
- Ítems que se valorarán como adicionales:
    - Uso de algoritmia adecuada
    - Seguridad y vulnerabilidad
    - Buenas prácticas de uso de código
    - Documentación
    - Infraestructura Nube


## Solución

### Arquitectura

Se usó una arquitectura Serverless con procesamiento distribuido para el segundo literal, para asegurar el punto 6 se utilizaron suscribciones.

![](https://i.imgur.com/IGwBJb0.jpg)

### Problemas Adicionales

- Posible colapso de la base de datos por mucho flujo de facturas

- Pobre experiencia de Usuario al intentar subir varios archivos CSVs por demora en la ingesta masiva

### Tecnologías Usadas

- Amazon Cloud Services (Cognito, appsync, dynamodb, lambda y S3)
- ReactJS
- GraphQL
- Jupyter Notebook (Prophet para análisis de Series de tiempo y Predicción)
- Python Scripting (Pandas, Numpy y Faker)



### ¿Qué se logró?

- Suscripciones
- Generación datos aleatorios consistentes basados en un dataset de productos de Kaggle
- Notebook para el análisis de series temporales de ventana de tiempo diaria
- Factor de Doble autenticación para mayor seguridad, así como autorizaciones por medio de roles asignado
- Manejo de S3 (almacenamiento), con fin de aliviar la carga en el proceso de Ingesta Masiva
- Reducción de Costos fijos al usar arquitectura Serverless así como aumento en la rapidez de procesamiento al ser distribuido

### ¿Qué no se alcanzo a lograr?

- Encriptar el Sub proveniente de Cognito (Para mayor seguridad)
- Agregar compatibilidad con formato .xls en la Ingesta masiva de datos
- SNS como soporte a la ingesta de datos
- Reportes de analítica diarios al correo usando SES
- Gráfica y analítica sobre productos que son tendencia (Moda) positiva o negativamente


### Resultados

Se buscó ampliar el concepto de la aplicación y centrarlo a que le aportaba el mismo para su empresa, por lo tanto nos enfocamos en la analítica e inteligencia de negocios.

-----------------------------------------------
Se halló que la **Media aritmética para el Valor Factura con ventana de tiempo diarias** es de:

    Predicción 9 de Febrero 2020: 338.651,37 COP
    
* **Modelo entrenado con Librería Prophet**
![](https://i.imgur.com/Llfu9Nx.png)

* **Gráfica de componentes**
![](https://i.imgur.com/hZDStds.png)


Esto permite al empresario realizar Análisis de Tendencia, Decisiones de Negocio y/o Análisis de Estabilidad

-----------------------------------------------

Se halló que la **Suma del Valor de las Facturas con ventana de tiempo diaria** es de:

    Predicción 9 de Febrero 2020: 906.901,70 COP
    
    
* **Modelo entrenado con Librería Prophet**
![](https://i.imgur.com/uM3ceNH.png)


* **Gráfica de componentes**
![](https://i.imgur.com/Geb5l4T.png)

Esto permite al empresario realizar Decisiones Financieras


-----------------------------------------------

Se halló que el **Número de Facturas por Día** es de:

    Predicción 9 de Febrero 2020: Aproximadamente 3 Facturas
    
    
* **Modelo entrenado con Librería Prophet**
![](https://i.imgur.com/o4j3CyZ.png)



* **Gráfica de componentes**
![](https://i.imgur.com/nQcdLBY.png)


Esto permite al empresario evaluar un posible aumento o disminución de recursos computacionales


----------------------------------------------

Se halló que la **Tasa de Clientes Activos** es de:

    Predicción 9 de Febrero 2020: Aproximadamente 5.21 % de los clientes realizará compras
    
* **Modelo entrenado con Librería Prophet**
![](https://i.imgur.com/UMRu2AG.png)


* **Gráfica de componentes**
![](https://i.imgur.com/aBa0qgV.png)


Esto permite al empresario evaluar Promociones y Seguimiento



### ¿Cómo correr la solución?

- Web App

En la consola ejecutar los siguientes comandos (Se debe tener instalado node.js y npm):

    1) npm install
    2) npm start

- Notebook Analítica

En la consola ejecutar los siguientes comandos (Se debe tener instalado python y jupyter notebook):

    jupyter notebook





