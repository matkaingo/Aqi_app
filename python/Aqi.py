import numpy as np
import pandas as pd
from scipy.interpolate import griddata
import json 

customer_json_file ='Datos_SIATA_Aire_pm25.json'
customers_json = pd.read_json(customer_json_file, convert_dates=True)

latitudes = customers_json.latitud.values.tolist()
longitudes = customers_json.longitud.values.tolist()

tam = len(customers_json.datos[1])

datos = {}
datos['app'] = []
datos['app'].append({
    'nombre' : 'la america',
    'Coordenadas' : [6.24989184652452, -75.61641254187703],
    'aqi'   : []}) 
datos['app'].append({
    'nombre' : 'Robledo',
    'Coordenadas' : [6.266110119867184, -75.59954896793089],
    'aqi'   : []})
  

def calcularAqi(pm25):
    if pm25 > 0 and pm25 <= 12:
        return(((50 - 0)/(12-0))*(pm25-0)+0)
        
    elif pm25 > 12 and pm25 <= 35.4:
        return(((100 - 51)/(35.4-12.1))*(pm25-12.1)+51)
        
    elif pm25 > 35.4 and pm25 <= 55.4:
        return(((150 - 101)/(55.4-35.5))*(pm25-35.5)+101)
        
    elif pm25 > 55.4 and pm25 <= 150.4:
        return(((200 - 151)/(150.4-55.5))*(pm25-55.5)+151)
        
    elif pm25 > 150.4 and pm25 <= 250.4:
        return(((300 - 201)/(250.4-150.5))*(pm25-150.5)+201)
        
    elif pm25 > 250.4 and pm25 <= 500.4:
        return(((500 - 301)/(500-250.5))*(pm25-250.5)+301)
   
for dato in datos['app']:
    for i in range(100):#cantidad de datos que se quiere
        m = []
        coor = dato['Coordenadas']
        for j in range(21):
            m.append(customers_json.datos[j][i].get('valor'))
    
        m = np.array(m)
        grid_z2 = griddata((latitudes, longitudes), m, (coor[0], coor[1]), method='cubic')
        
        if grid_z2 > 0 and grid_z2 < 150:
            dato['aqi'].append(calcularAqi(grid_z2))
            print(calcularAqi(grid_z2))
            print(grid_z2)
        else:
            i=i-1
            
with open('appAqi.json', 'w') as file:
    json.dump(datos, file)
    
with open('appAqi.json', 'r') as file:
    data = json.load(file)
    print(data)
 # Descomentar para obtener todo el historial (Se demora MUUUUCHOOOOO)

