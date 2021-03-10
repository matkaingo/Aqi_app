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
    'Barrio' : 'UPB',
    'Coordenadas' : [6.242637280603178, -75.58945342238027],
    'aqi'   : []}) 
datos['app'].append({
    'Barrio' : 'La America',
    'Coordenadas' : [6.250081569077918, -75.61670894284408],
    'aqi'   : []}) 
datos['app'].append({
    'Barrio' : 'Santa Monica',
    'Coordenadas' : [6.248792644957115, -75.60899911732578],
    'aqi'   : []}) 
datos['app'].append({
    'Barrio' : 'San Javier',
    'Coordenadas' : [6.255813108611198, -75.61829808398893],
    'aqi'   : []}) 
datos['app'].append({
    'Barrio' : 'Belén',
    'Coordenadas' : [6.231531796377768, -75.59232027670221],
    'aqi'   : []}) 
datos['app'].append({
    'Barrio' : 'La Mota',
    'Coordenadas' : [6.210879176579839, -75.59774092474163],
    'aqi'   : []}) 
datos['app'].append({
    'Barrio' : 'El Poblado',
    'Coordenadas' : [6.203488762945017, -75.570242357202],
    'aqi'   : []}) 
datos['app'].append({
    'Barrio' : 'Conquistadores',
    'Coordenadas' : [6.242113476057693, -75.58124632873206],
    'aqi'   : []}) 
datos['app'].append({
    'Barrio' : 'El Danubio',
    'Coordenadas' : [6.255396824565169, -75.60699831045234],
    'aqi'   : []}) 
datos['app'].append({
    'Barrio' : 'San Diego',
    'Coordenadas' : [6.232445332769878, -75.56876073878705],
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
        
        if grid_z2 > 0 and grid_z2 < 300:
            dato['aqi'].append("{0:.2f}".format(calcularAqi(grid_z2)))
        else:
            i=i-1
            
with open('appAqi.json', 'w') as file:
    json.dump(datos, file)
    
with open('appAqi.json', 'r') as file:
    data = json.load(file)
    print(data)
 # Descomentar para obtener todo el historial (Se demora MUUUUCHOOOOO)

