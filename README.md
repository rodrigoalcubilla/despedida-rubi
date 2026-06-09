# Despedida Rubi 2026

Tarjetas de retos interactivas para la despedida de soltero de Rubi.

## Funcionalidades

- **Aleatoria**: saca una tarjeta al azar entre las que quedan sin usar
- **Ver todas**: desplázate por las 20 tarjetas del mazo
- **Usar esta tarjeta**: marca una tarjeta como usada (se guarda en `localStorage` del navegador)
- Las tarjetas usadas no salen en el modo aleatorio y aparecen atenuadas con la etiqueta **USADA**

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Despliegue en Vercel

1. Sube el repositorio a GitHub
2. Importa el proyecto en [vercel.com](https://vercel.com)
3. Despliega (Next.js se detecta automáticamente)

## Resetear tarjetas

Pulsa **Resetear** en la barra superior para borrar el historial de tarjetas usadas en este navegador.
