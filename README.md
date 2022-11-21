# ESP32 electron react app
Esta es la aplicacion de escritorio multiplataforma para el sistema de camaras de visualizacion de camaras ESP32 UCSM 

---
## 📂 Estructura de directorios 


```tree
├── electron                  Electron-related code
│   ├── main                  Main-process source code
│   ├── preload               Preload-scripts source code
│   └── resources             Resources for the production build
│       ├── icon.icns             Icon for the application on macOS
│       ├── icon.ico              Icon for the application
│       ├── installerIcon.ico     Icon for the application installer
│       └── uninstallerIcon.ico   Icon for the application uninstaller
│
├── release                   Generated after production build, contains executables
│   └── {version}
│       ├── {os}-unpacked     Contains unpacked application executable
│       └── Setup.{ext}       Installer for the application
│
├── public                    Static assets
└── src                       Renderer source code, your React application
```

**Comando para reconstruir los modulos de node**
```
npm install
```
o
```
npm i
```
Para ejecutar la aplicacion en modo desarrollo ejecute el siguiente comando
```
npm run dev
```
Si desea conectarse a la api en modo de desarrollo actualice el archivo `config.js` y cambie la url base.
```javascript
const url_base = 'https://esp32-api-production.up.railway.app';
// const url_base = 'http://localhost:5000';

export default url_base
```
## Hacer el build de la aplicacion electron
Para hacer el build de la aplicacion ejecute el siguiente comando que generara el archivo `.exe` que podra instalar en su sistema operativo, este archivo se encuentra en la carpeta `release`
```
npm run build 
```