import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from scipy.interpolate import griddata

customer_json_file ='Datos_SIATA_Aire_pm25.json'
customers_json = pd.read_json(customer_json_file, convert_dates=True)

latitudes = customers_json.latitud.values.tolist()
longitudes = customers_json.longitud.values.tolist()

ymin = min(latitudes)
ymax = max(latitudes)
xmin = min(longitudes)
xmax = max(longitudes)

miY = 6.249534 #Latitud de mi casa
miX = -75.608652 #Longitud de mi casa

tam = len(customers_json.datos[1])
fecha = []

grid_x, grid_y = np.meshgrid(np.linspace(xmin,xmax,100), np.linspace(ymin,ymax,100))

for i in range(tam):
    fecha.append(customers_json.datos[1][i].get('fecha'))

def fechavscontaminacion(dia, mes, anio, hora):
    return fecha.index(anio+'-'+mes+'-'+dia+' '+hora+':00:00')

# Punto 1
def construirGrillaEnCiertaFecha(dia, mes, anio, hora):
    plt.figure('Grilla')
    m = []
    p = fechavscontaminacion(dia, mes, anio, hora)
    for j in range(21):
        m.append(customers_json.datos[j][p].get('valor'))
    m = np.array(m)
    grid_z0 = griddata((latitudes, longitudes), m, (grid_y, grid_x), method='nearest')
    grid_z2 = griddata((latitudes, longitudes), m, (grid_y, grid_x), method='cubic')
    
    #Interpolacion
    for x in range(len(grid_z0)):
        for y in range(len(grid_z0)):
            if np.isnan(grid_z2[x,y]):
                grid_z2[x,y]=grid_z0[x,y]
    
    #Graficacion
    plt.contourf(grid_x, grid_y, grid_z2)
    plt.title(fecha[p])
    plt.show()

# Punto 2
def graficarHistorial(coordenadaX, coordenadaY):
    plt.figure('Historial Completo') 
    for i in range(tam):
        m = []
        for j in range(21):
            m.append(customers_json.datos[j][i].get('valor'))
    
        m = np.array(m)
        fecha = customers_json.datos[1][i].get('fecha')
        grid_z2 = griddata((latitudes, longitudes), m, (coordenadaY, coordenadaX), method='cubic')
        plt.xticks(rotation=90)
        if grid_z2 > 0 and grid_z2 < 150:
            plt.plot(fecha, grid_z2, 'r.', ms=5)
    titulo = 'Lon: ' + str(coordenadaX) + ' Lat: ' + str(coordenadaY)
    plt.title(titulo)
    plt.show()

# Punto 2
def graficarFechaEnCoordenadaXY(coordenadaX, coordenadaY, dia, mes, anio, hora):
    plt.figure('Coordenada X y Y en una Fecha') 
    p = fechavscontaminacion(dia, mes, anio, hora)
    m = []
    for j in range(21):
        m.append(customers_json.datos[j][p].get('valor'))

    m = np.array(m)
    fecha = customers_json.datos[1][p].get('fecha')
    grid_z2 = griddata((latitudes, longitudes), m, (coordenadaY, coordenadaX), method='cubic')
    plt.xticks(rotation=90)
    if grid_z2 > 0 and grid_z2 < 1000:
        plt.plot(fecha, grid_z2, 'r.', ms=5)
    print(grid_z2)
    titulo = 'Lon: ' + str(coordenadaX) + ' Lat: ' + str(coordenadaY)
    plt.title(titulo)
    plt.show()

# Punto 5
def animacion():
    plt.figure('Animación') 
    t=0
    muestras = 50
    m = []
    f = []
    grid_z0 =[]
    grid_z2 =[]
    
    for i in range(muestras):
        m = []
        for j in range(21):
            m.append(customers_json.datos[j][i].get('valor'))
            
        m = np.array(m)
        f.append(customers_json.datos[1][i].get('fecha'))
        grid_z0.append(griddata((latitudes, longitudes), m, (grid_y, grid_x), method='nearest'))
        grid_z2.append(griddata((latitudes, longitudes), m, (grid_y, grid_x), method='cubic'))

                    
    while t < muestras:
        for x in range(len(grid_z0)):
            array = grid_z2[t]
            array2 = grid_z0[t]
            for y in range(len(grid_z0)):
                if np.isnan(array[x,y]):
                    array[x,y]=array2[x,y]
        plt.contourf(grid_x, grid_y, grid_z2[t])
        plt.title(f[t])
        plt.show()
        t = t+1
        plt.pause(0.1)

# Punto 1
construirGrillaEnCiertaFecha('21', '02', '2020', '04')
# Punto 2
graficarHistorial(miX, miY) # Descomentar para obtener todo el historial (Se demora MUUUUCHOOOOO)
graficarFechaEnCoordenadaXY(miX, miY, '21', '02', '2020', '04')
# Punto 5
#animacion()
