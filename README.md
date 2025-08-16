# 🛒 EcomSecure — Ecommerce fullstack con autenticación backend-driven

Comers Shop es una aplicación ecommerce construida con Next.js 15 y Express, que implementa un sistema de autenticación robusto y modular. Los tokens se manejan exclusivamente en el backend mediante cookies, con rotación segura y validación server-side. El frontend aprovecha el entorno server first para flujos desacoplados y seguros.

---

## 🧰 Tecnologías utilizadas

| Tecnología     | Justificación breve |
|----------------|---------------------|
| **Typescript** | Para llevar control preciso de los datos que se mueven a traves de la aplicacion y permitir unaa mejor depuracion de codigo y errores |
| **Next.js 15** | Metodologia server-first, sin exposición de tokens al cliente y servido de data SSR para mejor rendimiento en SEO |
| **NextAuth**   | Ofrece robustos metodos de autenticacion por credenciales y OAuth con una estructura centralizada y sencilla estructurar |
| **TailwindCSS**| Framework CSS de sencilla implementacion y uso con clases concisas y cortas para controlar estilos |
| **Zustand**    | Manejador de estado global moderno de integracion y uso sencillo acorde al alcance requerido |

---

## 🛠️ Instrucciones para levantar el proyecto (local y producción)

### 1. Requerimientos previos

- Node.js ≥ 18
- Npm
- PM2

### 2. Instalación de dependencias

```bash
npm install
```

### 3. Configuración de variables de entorno

Archivos de entorno disponibles en la raiz del proyecto con las variables de entorno requeridas para levantar la aplicación

```bash
Local
.env.local.template

Produccion
.env.production.template
```

### 4. Inicio del servidor de frontend

Con el backend previamene en linea se procede a levantar la aplicación segun el entorno

```bash
#Entorno de desarrollo
    npm run dev
#Entorno de desarrollo

#Entorno de produccion
    npm run build

    #Iniciar la aplicacion usando PM2 
    pm2 start npm --name frontend -- run start

    #Guardar configuración de PM2
    #Para el reinicio automático de los procesos si el servidor se reinicia
    pm2 save
    pm2 startup

    #Para verificar estado y logs de los procesos levantados
    pm2 list
    pm2 logs
#Entorno de produccion

```

### 6. Rutas disponibles

```bash
/api/auth/signin - #Pantalla de autenticación generada por NextAuth con autenticacion OAuth con google
    
/ # Pagina raiz de la aplicacion con el listado de productos general
/category/[slug] # Pagina que muestra los articulos segun las categorias existentes de los productos
/cart # Pagina del carrito compra
/checkout # Pagina de checkout para confirmar la orden
/orders/[id] # Pagina de detalle de orden generada luego de concretar la orden
/orders # Pagina con el listado de ordenes realizadas con el usuario
    
```

### 7. Enlace de demo actualmente en linea

[https://comers-shop-nextjs.vercel.app/](https://comers-shop-nextjs.vercel.app/)
