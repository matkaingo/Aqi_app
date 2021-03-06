import pandas as pd
import numpy as np
from scipy.interpolate import griddata
import matplotlib.pyplot as plt

customer_json_file ='Datos_SIATA_Aire_pm25.json'
customers_json = pd.read_json(customer_json_file, convert_dates=True)
latitudes = customers_json.latitud.values.tolist()
longitudes = customers_json.longitud.values.tolist()
fecha = []
m=[]
datos=[]
tamanio = len(customers_json.datos[0])

ymin = min(latitudes)
ymax = max(latitudes)
xmin = min(longitudes)
xmax = max(longitudes)

def fechavscontaminacion(dia, mes, anio, hora):
    return fecha.index(anio+'-'+mes+'-'+dia+' '+hora+':00:00')

grid_x, grid_y = np.mgrid[6.08:6.5:100j, -75.3:-75.7:100j]

for i in range(tamanio):
    fecha.append(customers_json.datos[1][i].get('fecha'))
    print(fecha[i])

posicion = fechavscontaminacion('03', '01', '2020', '00')

for j in range(21):
    m.append(customers_json.datos[j][posicion].get('valor'))
    x=[latitudes[j], longitudes[j]]
    datos.append(x)
    
points = np.array(datos)
values = np.array(m)
grid_z0 = griddata(points, values, (grid_x, grid_y), method='nearest')
grid_z2 = griddata(points, values, (grid_x, grid_y), method='cubic')

#Interpolacion
filas = grid_z0.shape[0]
columnas = grid_z0.shape[1]

for x in range(0, columnas -1):
    for y in range(0, filas -1):
        if np.isnan(grid_z2[x,y]):
            grid_z2[x,y]=grid_z0[x,y]

#Graficacion
plt.imshow(grid_z2.T, extent=(xmin,xmax,ymin,ymax), origin='lower')
plt.colorbar()
plt.title(fecha[posicion])

plt.show()
