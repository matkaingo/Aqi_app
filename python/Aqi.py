import numpy as np
import pandas as pd
from scipy.interpolate import griddata
import json 

customer_json_file ='Datos_SIATA_Aire_pm25.json'
customers_json = pd.read_json(customer_json_file, convert_dates=True)

latitudes = customers_json.latitud.values.tolist()
longitudes = customers_json.longitud.values.tolist()

miY = 6.249534 #Latitud de mi casa
miX = -75.608652 #Longitud de mi casa

tam = len(customers_json.datos[1])


def graficarHistorial(coordenadaX, coordenadaY):
    #plt.figure('Historial Completo') 
    for i in range(100):#cantidad de datos que se quiere
        m = []
        for j in range(21):
            m.append(customers_json.datos[j][i].get('valor'))
    
        m = np.array(m)
        #fecha = customers_json.datos[1][i].get('fecha')
        grid_z2 = griddata((latitudes, longitudes), m, (coordenadaY, coordenadaX), method='cubic')
        #plt.xticks(rotation=90)
        if grid_z2 > 0 and grid_z2 < 150:
            #plt.plot(fecha, grid_z2, 'r.', ms=5)
            print(grid_z2)
        else:
            i=i-1
    #titulo = 'Lon: ' + str(coordenadaX) + ' Lat: ' + str(coordenadaY)
    #plt.title(titulo)
    #plt.show()

graficarHistorial(miX, miY) # Descomentar para obtener todo el historial (Se demora MUUUUCHOOOOO)

