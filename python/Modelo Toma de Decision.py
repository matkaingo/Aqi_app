# Programa creado por: Diana Cristina Rodríguez García

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from scipy.interpolate import griddata

# Paso 1: Toma de los datos de la base de Datos_SIATA_Aire_pm25
# Extraemos los datos de calidad del aire PM25
customer_json_file ='Datos_SIATA_Aire_pm25.json'
customers_json = pd.read_json(customer_json_file, convert_dates=True)

# Sacamos las latitudes y longitudes de los sensores
latitudes = customers_json.latitud.values.tolist()
longitudes = customers_json.longitud.values.tolist()

# Tomamos los datos de esos sensores en una fecha y hora específica
m = []

for i in range(21):
    m.append(customers_json.datos[i][500].get('valor'))

# Paso 2 transformacion de los datos ETL para darlo al modelo
m = np.array(m)

# Establecemos los límites superiores e inferiores de las posiciones de los sensores
ymin = min(latitudes)
ymax = max(latitudes)
xmin = min(longitudes)
xmax = max(longitudes)

# Creamos las mallas x y y de tamaño 100x100 de los sensores
grid_x, grid_y = np.meshgrid(np.linspace(xmin,xmax,100), np.linspace(ymin,ymax,100))

# Aplicamos el modelo nearest y cúbico
grid_z0 = griddata((latitudes, longitudes), m, (grid_y, grid_x), method='nearest')
grid_z1 = griddata((latitudes, longitudes), m, (grid_y, grid_x), method='cubic')

# Se rellena los valores nulos del modelo cúbico con los de nearest
for x in range(len(grid_z0)):
    for y in range(len(grid_z0)):
        if np.isnan(grid_z1[x,y]):
            grid_z1[x,y]=grid_z0[x,y]

# Graficamos el modelo cúbico ya completo
plt.figure('Grilla')
plt.contourf(grid_x, grid_y, grid_z1)
plt.plot(longitudes, latitudes, 'r.', ms=1)
plt.title('Cúbico')
plt.colorbar()
plt.show()

# Paso 3 aplicar el modelo (modelo para toma de decision ON-OFF)
# Paso 3.1 ejecutar el modelo

# Variables para el modelo AQI
AQI = grid_z1
aqiLo = 0
aqiHi = 0
concLo = 0
concHi = 0
conci = grid_z1

# Tomamos la malla creada con el modelo cúbico para obtener todos los datos y llenamos la malla nueva AQI procesando los datos con la ecuación AQI
for x in range(len(AQI)):
    for y in range(len(AQI)):
        if grid_z1[x,y] >= 0 and grid_z1[x,y] <= 12:
            aqiLo = 0
            aqiHi = 50
            concLo = 0
            concHi = 12
            
        elif grid_z1[x,y] >= 12.1 and grid_z1[x,y] <= 35.4:
            aqiLo = 51
            aqiHi = 100
            concLo = 12.1
            concHi = 35.4
            
        elif grid_z1[x,y] >= 35.5 and grid_z1[x,y] <= 55.4:
            aqiLo = 101
            aqiHi = 150
            concLo = 35.5
            concHi = 55.4
            
        elif grid_z1[x,y] >= 55.5 and grid_z1[x,y] <= 150.4:
            aqiLo = 151
            aqiHi = 200
            concLo = 55.5
            concHi = 150.4
            
        elif grid_z1[x,y] >= 150.5 and grid_z1[x,y] <= 250.4:
            aqiLo = 201
            aqiHi = 300
            concLo = 150.5
            concHi = 250.4
            
        elif grid_z1[x,y] >= 250.5 and grid_z1[x,y] <= 500.4:
            aqiLo = 301
            aqiHi = 500
            concLo = 250.5
            concHi = 500.4
        
        if grid_z1[x,y] >= 0 or grid_z1[x,y] <= 500.4:
            AQI[x,y] = ((aqiHi - aqiLo)/(concHi - concLo)) * (conci[x,y] - concLo) + aqiLo
        elif grid_z1[x,y] < 0 or grid_z1[x,y] > 500.4:
            AQI[x,y] = 0

# Graficamos
plt.figure('AQI')
plt.contourf(grid_x, grid_y, AQI)
plt.title('AQI')
plt.colorbar()
plt.show()

# Paso 3.2 calcular el estimador
# Variables para estimar los niveles AQI
nivelesAQI = AQI # Malla de los niveles
buena = 0 # Nivel 1: Bueno
moderada = 0 # Nivel 2: Moderado
malaSensibles = 0 # Nivel 3: Insalubre para grupos sensibles
malaSalud = 0 # Nivel 4: Insalubre
muyMala = 0 # Nivel 5: Muy insalubre
peligroso = 0 # Nivel 6: Peligroso
total = 0 # Total de datos AQI

# Llenamos una nueva malla con el nivel correspondiente de acuerdo al rango de los niveles según el valor AQI
for x in range(len(AQI)):
    for y in range(len(AQI)):
        total += 1
        if AQI[x,y] >= 0 and AQI[x,y] <= 50:
            buena += 1
            nivelesAQI[x,y] = 1
            
        elif AQI[x,y] > 50  and AQI[x,y] <= 100:
            moderada += 1
            nivelesAQI[x,y] = 2
            
        elif AQI[x,y] > 100 and AQI[x,y] <= 150:
            malaSensibles += 1
            nivelesAQI[x,y] = 3
        
        elif AQI[x,y] > 150 and AQI[x,y] <= 200:
            malaSalud += 1
            nivelesAQI[x,y] = 4
            
        elif AQI[x,y] > 200 and AQI[x,y] <= 300:
            muyMala += 1
            nivelesAQI[x,y] = 5
            
        elif AQI[x,y] > 300:
            peligroso += 1
            nivelesAQI[x,y] = 6

# Graficamos
plt.figure('Niveles AQI')
plt.contourf(grid_x, grid_y, nivelesAQI)
plt.title('Niveles AQI')
plt.colorbar()
plt.show()

# Paso 3.3 aplicar la hipotesis de solucion
# Se saca el porcentaje de cada nivel con respecto a toda la malla
buenaP = (buena * 100) / total
moderadaP = (moderada * 100) / total
malaSensiblesP = (malaSensibles * 100) / total
malaSaludP = (malaSalud * 100) / total
muyMalaP = (muyMala * 100) / total
peligrosoP = (peligroso * 100) / total

# Se crean los 3 grupos para la hipótesis
buenas = buenaP + moderadaP
medias = malaSensiblesP + malaSaludP
malas = muyMalaP + peligrosoP

"""
print(buenaP)
print(moderadaP)
print(malaSensiblesP)
print(malaSaludP)
print(muyMalaP)
print(peligrosoP)

print('Sumas')
print(buenas)
print(medias)
print(malas)
"""

# Paso 4 notificar la decision + visualizacion

if((buenas > 80 and buenaP > moderadaP) or (buenas > medias and buenas > malas and medias > malas)):
    print("La calidad del aire es excelente")
elif((buenas > 80 and buenaP < moderadaP) or (buenas > medias and buenas > malas and medias < malas)):
    print("Es aceptable para la gran mayoría de personas, pero para aquellos extremadamente sensibles puede existir una preocupación de salud")
elif((medias > 80 and malaSensiblesP > malaSaludP) or (medias > buenas and medias > malas and buenas > malas)):
    print("No se recomienda realizar actividades al aire libre de manera prolongada, sobre todo para las personas que pertenezcan a grupos sensibles")
elif((medias > 80 and malaSensiblesP < malaSaludP) or (medias > buenas and medias > malas and buenas < malas)):
    print("No se recomienda realizar actividades al aire libre a nadie, ya que TODOS están expuestos a problemas de salud")
elif((malas > 40) or (malas > buenas and malas > medias)):
    print("No se recomienda ningún tipo de exposición al aire libre. Se deben imponer medidas para los posibles contaminantes de la ciudad, como vehículos y fábricas. Además las personas que se expongan deben usar medidas de protección") 