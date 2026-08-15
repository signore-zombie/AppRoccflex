# Roccflex · Maqueta de prototipo
### App de comunicación interna y RRHH — faena ↔ oficina

Maqueta navegable del prototipo propuesto para **Roccflex**. Muestra en paralelo la vista del **trabajador de faena** (celular) y la vista de **administración/RRHH** (escritorio), para evidenciar cómo una misma solicitud viaja de terreno a oficina con folio, responsable, estado y trazabilidad.

> Datos ficticios, con fines de demostración. No está conectada a ningún sistema productivo.

---

## Qué incluye

**Vista faena (celular)**
- Inicio con comunicados y accesos rápidos
- Nueva solicitud en 2 pasos (6 categorías, formulario corto, foto como evidencia)
- Generación de folio único
- Mis solicitudes + detalle con línea de tiempo de estados
- Notificaciones push simuladas
- Comunicados con confirmación de lectura, documentos y perfil

**Vista oficina (escritorio)**
- Bandeja de gestión con filtros (abiertas, críticas, sin asignar, por categoría)
- Detalle de caso: acusar recibo, asignar responsable y fecha, pedir información, resolver, rechazar
- Historial de gestión no editable
- Panel de indicadores (tiempos de respuesta, cumplimiento de plazo, adopción, volumen por categoría y faena)
- Comunicados con % de lectura y directorio de trabajadores

**Demo guiada (10 pasos)**
Recorre el caso completo de punta a punta: el trabajador reporta → llega a oficina → se acusa recibo → se asigna → se resuelve → el trabajador confirma → el caso alimenta los indicadores.
Se avanza con el botón **Siguiente** o con las flechas **← →** del teclado. `Esc` cierra la demo.

---

## Cómo verla

**En local:** abrir `index.html` en cualquier navegador. No requiere servidor, instalación ni conexión a internet.

**En GitHub Pages:**

```bash
git init && git add . && git commit -m "Maqueta prototipo Roccflex"
```

```bash
git branch -M main && git remote add origin https://github.com/USUARIO/REPO.git && git push -u origin main
```

Luego, en el repositorio: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `root` → Save**.
En 1–2 minutos queda publicada en `https://USUARIO.github.io/REPO/`.

---

## Recomendaciones para la presentación

1. Abrir en pantalla completa con la vista **"Ambas vistas"** activa: el contraste celular/escritorio es el argumento central.
2. Partir con **▶ Demo guiada** y avanzar con las flechas del teclado. Los 10 pasos cuentan la historia completa en unos 4 minutos.
3. Al terminar la demo, navegar libremente para responder preguntas (crear una solicitud real desde el celular, gestionarla en oficina).
4. **↺ Reiniciar** devuelve todo al estado inicial entre una presentación y otra.
5. Si la conexión falla, la maqueta funciona igual: es 100% estática y sin dependencias externas.
6. Aclarar siempre que es una **maqueta de prototipo**: los flujos son reales, los datos no.

---

## Estructura

```
roccflex-mockup/
├── index.html    Estructura y marcos de celular/navegador
├── styles.css    Diseño completo
├── app.js        Estado, pantallas, acciones y demo guiada
└── README.md
```

Sin dependencias, sin build, sin CDN. Todo el estado vive en memoria y se reinicia al recargar la página.
