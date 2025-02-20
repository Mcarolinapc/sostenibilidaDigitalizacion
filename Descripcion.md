# Descripción del Proyecto  

## Funcionamiento del Proyecto  

Hemos instalado **npm** y creado un proyecto con el comando `npm init`.  
Luego, creamos un archivo `index.js`, que más adelante modificamos y ampliamos para adaptarlo al esquema definido en la práctica anterior.  

### Archivos JSON  

Hemos creado cuatro ficheros JSON:  

- `Recurso.json`  
- `Reserva.json` (corregido, antes decía "Reserba")  
- `Usuario.json`  
- `Notificacion.json`  

Junto a estos ficheros, hemos creado un archivo `index[nomFicher].js` para cada JSON, además de un request HTTP para cada uno de ellos.  

Para evitar reiniciar el servidor manualmente cada vez que hacemos cambios, instalamos **nodemon** con el comando:  

```bash
npm install -g nodemon