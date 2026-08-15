/* ============================================================
   Roccflex · Maqueta de prototipo — lógica de navegación
   Sin dependencias externas. Todo el estado vive en memoria.
   ============================================================ */

/* ---------- Iconos (SVG en línea) ---------- */
const PATHS = {
  plus:      '<path d="M12 5v14M5 12h14"/>',
  user:      '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  users:     '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  tool:      '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  shield:    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  file:      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  alert:     '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
  idea:      '<path d="M9 18h6M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>',
  bell:      '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  doc:       '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  clock:     '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  home:      '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  list:      '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  camera:    '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  check:     '<path d="M20 6 9 17l-5-5"/>',
  checkBig:  '<path d="M20 6 9 17l-5-5" stroke-width="2.6"/>',
  chev:      '<path d="m9 18 6-6-6-6"/>',
  calendar:  '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  chart:     '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
  inbox:     '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  pin:       '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  image:     '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  logout:    '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  send:      '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>'
};
const ic = (n, size = 20, sw = 1.9) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${PATHS[n] || ''}</svg>`;

/* ---------- Configuración de negocio ---------- */
const CATEGORIAS = {
  'Seguridad':      { icon:'shield', color:'#DC2626', bg:'#FEE2E2', sla:'4 h',   area:'Prevención de Riesgos', sub:['Incidente','Casi accidente','Condición insegura','Falta de EPP'] },
  'Operacional':    { icon:'tool',   color:'#EA580C', bg:'#FFEDD5', sla:'24 h',  area:'Administración / Operaciones', sub:['Falta de material','Falla de equipo','Requerimiento de herramienta','Apoyo de personal'] },
  'RRHH':           { icon:'user',   color:'#2563EB', bg:'#DBEAFE', sla:'48 h',  area:'Recursos Humanos', sub:['Permiso','Vacaciones','Licencia médica','Certificado laboral','Consulta de liquidación','Cambio de datos'] },
  'Administrativo': { icon:'file',   color:'#7C3AED', bg:'#EDE9FE', sla:'48 h',  area:'Administración', sub:['Viáticos','Transporte','Alojamiento','Alimentación','Rendición de gastos'] },
  'Reclamo':        { icon:'alert',  color:'#0F766E', bg:'#CCFBF1', sla:'24 h',  area:'RRHH / Gerencia', sub:['Trato laboral','Conflicto interno','Canal de denuncia (anónimo)'] },
  'Sugerencia':     { icon:'idea',   color:'#475569', bg:'#F1F5F9', sla:'7 días',area:'Jefatura', sub:['Mejora operativa','Mejora administrativa'] }
};

const ESTADOS = {
  'Ingresado':                 { pill:'neutral' },
  'Recibido':                  { pill:'info' },
  'En gestión':                { pill:'warn' },
  'En espera de información':  { pill:'purple' },
  'En espera de terceros':     { pill:'purple' },
  'Resuelto':                  { pill:'ok' },
  'Cerrado':                   { pill:'ok' },
  'Rechazado':                 { pill:'danger' },
  'Reabierto':                 { pill:'accent' }
};
const ABIERTOS = ['Ingresado','Recibido','En gestión','En espera de información','En espera de terceros','Reabierto'];

const RESPONSABLES = ['Marcela Soto (RRHH)','Rodrigo Muñoz (Operaciones)','Patricio Aguilera (Administración)','Sandra Lillo (Prevención de Riesgos)'];

const TRABAJADOR = { nombre:'Luis Cárdenas', cargo:'Maestro montajista', faena:'Faena El Roble', rut:'15.842.663-4', iniciales:'LC' };

/* ---------- Datos semilla ---------- */
function seedSolicitudes(){
  return [
    { id:'SOL-1056', cat:'Seguridad', sub:'Condición insegura', faena:'Faena Norte – Planta 2', autor:'Héctor Valdés', fecha:'Hoy 07:20', edad:'hace 2 h',
      urg:'Alta', estado:'Ingresado', resp:null, compromiso:null, sla:'porVencer', foto:true,
      desc:'Barandas sueltas en la plataforma del nivel 2, sector de descarga. Riesgo de caída de altura para el personal que circula por ahí.',
      hist:[{ e:'Ingresado', f:'Hoy 07:20', a:'Héctor Valdés', c:'Reporte creado desde la app en terreno.' }] },

    { id:'SOL-1055', cat:'Operacional', sub:'Falta de material', faena:'Obra Camino Los Aromos', autor:'Camila Reyes', fecha:'Hoy 04:15', edad:'hace 5 h',
      urg:'Media', estado:'En gestión', resp:'Rodrigo Muñoz (Operaciones)', compromiso:'Mañana', sla:'ok', foto:false,
      desc:'Se requieren 20 sacos de cemento adicionales para completar la losa del sector poniente.',
      hist:[{ e:'Ingresado', f:'Hoy 04:15', a:'Camila Reyes', c:'' },
            { e:'Recibido', f:'Hoy 06:02', a:'Sistema', c:'Acuse automático de recepción.' },
            { e:'En gestión', f:'Hoy 06:40', a:'Rodrigo Muñoz', c:'Se coordina despacho con proveedor para mañana temprano.' }] },

    { id:'SOL-1054', cat:'RRHH', sub:'Permiso', faena:'Faena El Roble', autor:'Luis Cárdenas', fecha:'Ayer 16:30', edad:'hace 1 día',
      urg:'Baja', estado:'En espera de información', resp:'Marcela Soto (RRHH)', compromiso:'Viernes', sla:'ok', foto:false, mio:true,
      desc:'Solicito permiso administrativo para el día viernes 22 por trámite médico familiar.',
      hist:[{ e:'Ingresado', f:'Ayer 16:30', a:'Luis Cárdenas', c:'' },
            { e:'Recibido', f:'Ayer 17:10', a:'Sistema', c:'Acuse automático de recepción.' },
            { e:'En espera de información', f:'Hoy 08:05', a:'Marcela Soto', c:'Hola Luis, para cursar el permiso necesito que adjuntes el comprobante de la hora médica.' }] },

    { id:'SOL-1053', cat:'Administrativo', sub:'Viáticos', faena:'Faena Norte – Planta 2', autor:'Ana Sepúlveda', fecha:'Ayer 11:05', edad:'hace 1 día',
      urg:'Media', estado:'Resuelto', resp:'Patricio Aguilera (Administración)', compromiso:'Hoy', sla:'ok', foto:false,
      desc:'Consulta por el pago de viáticos de la semana pasada, no aparecen reflejados.',
      hist:[{ e:'Ingresado', f:'Ayer 11:05', a:'Ana Sepúlveda', c:'' },
            { e:'Recibido', f:'Ayer 11:40', a:'Sistema', c:'' },
            { e:'En gestión', f:'Ayer 12:15', a:'Patricio Aguilera', c:'Se revisa con contabilidad.' },
            { e:'Resuelto', f:'Hoy 09:10', a:'Patricio Aguilera', c:'Viáticos regularizados, se pagan en la liquidación de este mes.' }] },

    { id:'SOL-1052', cat:'Operacional', sub:'Falla de equipo', faena:'Taller Central', autor:'Jorge Fuentes', fecha:'Martes 14:22', edad:'hace 2 días',
      urg:'Alta', estado:'En gestión', resp:'Rodrigo Muñoz (Operaciones)', compromiso:'Ayer', sla:'vencido', foto:true,
      desc:'Compresor N°2 está botando aceite y perdiendo presión. No se puede usar en el turno de noche.',
      hist:[{ e:'Ingresado', f:'Martes 14:22', a:'Jorge Fuentes', c:'' },
            { e:'Recibido', f:'Martes 15:00', a:'Sistema', c:'' },
            { e:'En gestión', f:'Martes 16:30', a:'Rodrigo Muñoz', c:'Se solicita cotización de repuesto al proveedor.' }] },

    { id:'SOL-1051', cat:'Reclamo', sub:'Canal de denuncia (anónimo)', faena:'Faena El Roble', autor:'Anónimo', fecha:'Martes 09:10', edad:'hace 2 días',
      urg:'Alta', estado:'En gestión', resp:'Marcela Soto (RRHH)', compromiso:'Viernes', sla:'ok', foto:false, anon:true,
      desc:'Reporte confidencial sobre trato inadecuado en el turno de noche. Contenido restringido a RRHH y Gerencia.',
      hist:[{ e:'Ingresado', f:'Martes 09:10', a:'Anónimo', c:'' },
            { e:'Recibido', f:'Martes 09:12', a:'Sistema', c:'Acuse automático (canal confidencial).' },
            { e:'En gestión', f:'Martes 10:00', a:'Marcela Soto', c:'Caso derivado a protocolo interno. Acceso restringido.' }] },

    { id:'SOL-1050', cat:'RRHH', sub:'Certificado laboral', faena:'Faena Norte – Planta 2', autor:'Camila Reyes', fecha:'Lunes 10:40', edad:'hace 3 días',
      urg:'Baja', estado:'Cerrado', resp:'Marcela Soto (RRHH)', compromiso:'Martes', sla:'ok', foto:false,
      desc:'Necesito certificado de antigüedad laboral para trámite bancario.',
      hist:[{ e:'Ingresado', f:'Lunes 10:40', a:'Camila Reyes', c:'' },
            { e:'Recibido', f:'Lunes 11:00', a:'Sistema', c:'' },
            { e:'En gestión', f:'Lunes 11:30', a:'Marcela Soto', c:'' },
            { e:'Resuelto', f:'Martes 09:20', a:'Marcela Soto', c:'Certificado emitido y enviado al correo registrado.' },
            { e:'Cerrado', f:'Martes 12:05', a:'Camila Reyes', c:'Recibido conforme.' }] },

    { id:'SOL-1049', cat:'Seguridad', sub:'Falta de EPP', faena:'Obra Camino Los Aromos', autor:'Héctor Valdés', fecha:'Lunes 08:15', edad:'hace 3 días',
      urg:'Alta', estado:'Cerrado', resp:'Sandra Lillo (Prevención de Riesgos)', compromiso:'Lunes', sla:'ok', foto:true,
      desc:'Faltan guantes anticorte talla L para la cuadrilla de montaje.',
      hist:[{ e:'Ingresado', f:'Lunes 08:15', a:'Héctor Valdés', c:'' },
            { e:'Recibido', f:'Lunes 08:22', a:'Sistema', c:'' },
            { e:'En gestión', f:'Lunes 08:45', a:'Sandra Lillo', c:'Se despacha desde bodega central.' },
            { e:'Resuelto', f:'Lunes 15:00', a:'Sandra Lillo', c:'Entregados 12 pares en faena.' },
            { e:'Cerrado', f:'Lunes 17:30', a:'Héctor Valdés', c:'Recibido conforme.' }] },

    { id:'SOL-1048', cat:'Operacional', sub:'Requerimiento de herramienta', faena:'Faena El Roble', autor:'Luis Cárdenas', fecha:'Viernes 13:00', edad:'hace 4 días',
      urg:'Media', estado:'Cerrado', resp:'Rodrigo Muñoz (Operaciones)', compromiso:'Lunes', sla:'ok', foto:false, mio:true,
      desc:'Se solicita esmeril angular adicional para la cuadrilla de estructura.',
      hist:[{ e:'Ingresado', f:'Viernes 13:00', a:'Luis Cárdenas', c:'' },
            { e:'Recibido', f:'Viernes 13:20', a:'Sistema', c:'' },
            { e:'En gestión', f:'Viernes 14:00', a:'Rodrigo Muñoz', c:'' },
            { e:'Resuelto', f:'Lunes 09:00', a:'Rodrigo Muñoz', c:'Herramienta entregada en pañol de faena.' },
            { e:'Cerrado', f:'Lunes 10:15', a:'Luis Cárdenas', c:'Conforme, gracias.' }] },

    { id:'SOL-1047', cat:'Administrativo', sub:'Transporte', faena:'Faena Norte – Planta 2', autor:'Ana Sepúlveda', fecha:'Jueves 17:45', edad:'hace 5 días',
      urg:'Baja', estado:'Rechazado', resp:'Patricio Aguilera (Administración)', compromiso:'Viernes', sla:'ok', foto:false,
      desc:'Solicito traslado particular desde domicilio a faena.',
      hist:[{ e:'Ingresado', f:'Jueves 17:45', a:'Ana Sepúlveda', c:'' },
            { e:'Recibido', f:'Jueves 18:00', a:'Sistema', c:'' },
            { e:'Rechazado', f:'Viernes 09:30', a:'Patricio Aguilera', c:'No procede: el recorrido de acercamiento cubre el sector. Se comparte horario actualizado del bus.' }] },

    { id:'SOL-1043', cat:'RRHH', sub:'Consulta de liquidación', faena:'Faena El Roble', autor:'Luis Cárdenas', fecha:'02 ago 10:20', edad:'hace 12 días',
      urg:'Baja', estado:'Cerrado', resp:'Marcela Soto (RRHH)', compromiso:'04 ago', sla:'ok', foto:false, mio:true,
      desc:'Consulta por descuento aplicado en la liquidación de julio.',
      hist:[{ e:'Ingresado', f:'02 ago 10:20', a:'Luis Cárdenas', c:'' },
            { e:'Recibido', f:'02 ago 10:35', a:'Sistema', c:'' },
            { e:'En gestión', f:'02 ago 11:00', a:'Marcela Soto', c:'' },
            { e:'Resuelto', f:'03 ago 16:40', a:'Marcela Soto', c:'Corresponde a anticipo solicitado en junio. Se adjunta detalle.' },
            { e:'Cerrado', f:'04 ago 08:10', a:'Luis Cárdenas', c:'' }] }
  ];
}

function seedComunicados(){
  return [
    { id:'C-031', area:'Operaciones', titulo:'Cambio de horario del bus de acercamiento – Faena El Roble', fecha:'Hoy 06:00', lectura:84, nuevo:true,
      texto:'A partir de mañana el bus de acercamiento sale a las 06:15 desde el terminal, 15 minutos antes del horario habitual, por trabajos en la ruta.' },
    { id:'C-030', area:'Prevención', titulo:'Uso obligatorio del nuevo arnés con doble cola', fecha:'Ayer 12:30', lectura:91, nuevo:true,
      texto:'Desde esta semana es obligatorio el uso del arnés con doble cola de vida en todo trabajo sobre 1,8 m. Retirar en pañol presentando credencial.' },
    { id:'C-029', area:'RRHH', titulo:'Pago de remuneraciones de agosto', fecha:'Lunes 09:00', lectura:96, nuevo:false,
      texto:'El pago se realizará el día 30 de agosto. Las liquidaciones estarán disponibles en la app desde el día 29.' },
    { id:'C-028', area:'Gerencia', titulo:'Resultados de la auditoría de seguridad', fecha:'Semana pasada', lectura:78, nuevo:false,
      texto:'Se informa el cierre de la auditoría con 0 hallazgos críticos. Agradecemos el compromiso de todas las cuadrillas.' }
  ];
}

const DOCUMENTOS = [
  { t:'Reglamento Interno de Orden, Higiene y Seguridad', m:'PDF · 2,4 MB · actualizado en junio' },
  { t:'Procedimiento de trabajo en altura', m:'PDF · 1,1 MB · actualizado en julio' },
  { t:'Protocolo de entrega de EPP', m:'PDF · 680 KB' },
  { t:'Formulario de solicitud de vacaciones', m:'PDF · 210 KB' },
  { t:'Canal de denuncias – Ley Karin', m:'PDF · 450 KB' }
];

/* ---------- Estado de la aplicación ---------- */
let state;
function resetState(){
  state = {
    view:'both',
    solicitudes: seedSolicitudes(),
    comunicados: seedComunicados(),
    correlativo: 1057,
    phone:  { screen:'home', sel:null, draft:null, push:null, comSel:null },
    office: { screen:'inbox', sel:null, filtro:'abiertas', highlight:null },
    guided: { on:false, i:0 }
  };
}
resetState();

const $  = s => document.querySelector(s);
const byId = id => state.solicitudes.find(s => s.id === id);
const misSolicitudes = () => state.solicitudes.filter(s => s.autor === TRABAJADOR.nombre);
const abiertas = () => state.solicitudes.filter(s => ABIERTOS.includes(s.estado));

function addHist(sol, estado, autor, comentario){
  sol.estado = estado;
  sol.hist.push({ e:estado, f:'Hoy ' + horaActual(), a:autor, c:comentario || '' });
}
function horaActual(){
  const base = 9 * 60 + 41 + state.solicitudes.length; // hora simulada, estable
  const h = String(Math.floor(base / 60)).padStart(2,'0');
  const m = String(base % 60).padStart(2,'0');
  return `${h}:${m}`;
}
function pushPhone(t, x){
  state.phone.push = { t, x };
  clearTimeout(pushPhone._t);
  pushPhone._t = setTimeout(() => { state.phone.push = null; render(); }, 7000);
}
function toast(msg){
  const el = $('#toast');
  el.textContent = msg; el.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { el.hidden = true; }, 2600);
}

/* ---------- Utilidades de presentación ---------- */
const estadoPill = e => `<span class="pill pill--${ESTADOS[e].pill}"><span class="dot"></span>${e}</span>`;
const slaPill = s => ({
  ok:        '<span class="pill pill--ok">En plazo</span>',
  porVencer: '<span class="pill pill--warn">Por vencer</span>',
  vencido:   '<span class="pill pill--danger">Plazo vencido</span>'
}[s] || '<span class="pill pill--neutral">—</span>');
const catChip = c => `<span class="pill" style="background:${CATEGORIAS[c].bg};color:${CATEGORIAS[c].color}">${c}</span>`;
const urgPill = u => u === 'Alta' ? '<span class="pill pill--danger">Alta</span>'
                   : u === 'Media' ? '<span class="pill pill--warn">Media</span>'
                   : '<span class="pill pill--neutral">Baja</span>';

/* ============================================================
   VISTA FAENA (celular)
   ============================================================ */
function renderPhone(){
  const p = state.phone;
  const push = p.push ? `
    <div class="push">
      <div class="push__ic">R</div>
      <div>
        <div class="push__t">${p.push.t}</div>
        <div class="push__x">${p.push.x}</div>
        <div class="push__time">Roccflex · ahora</div>
      </div>
    </div>` : '';

  const screens = {
    login:        pLogin,
    home:         pHome,
    newCat:       pNewCat,
    newForm:      pNewForm,
    sent:         pSent,
    list:         pList,
    detail:       pDetail,
    comunicados:  pComunicados,
    comDetail:    pComDetail,
    docs:         pDocs,
    perfil:       pPerfil
  };
  $('#phoneScreen').innerHTML = push + (screens[p.screen] || pHome)();
}

function pLogin(){
  return `
  <div style="background:linear-gradient(160deg,#0F172A,#1B2942);height:100%;display:flex;flex-direction:column;justify-content:center;padding:34px 26px;color:#fff">
    <div style="width:60px;height:60px;border-radius:17px;background:linear-gradient(145deg,#F97316,#EA580C);display:grid;place-items:center;font-size:29px;font-weight:800;color:#20130A;margin-bottom:24px">R</div>
    <div style="font-size:25px;font-weight:750">Roccflex</div>
    <div style="font-size:13.5px;color:#9FB3CC;margin-top:6px;line-height:1.5">Comunicación interna<br>Faena · Oficina · RRHH</div>
    <div style="margin-top:34px">
      <label class="f-label" style="color:#9FB3CC">RUT</label>
      <input class="f-input" value="15.842.663-4" readonly style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.18);color:#fff">
      <div style="height:14px"></div>
      <label class="f-label" style="color:#9FB3CC">Clave</label>
      <input class="f-input" type="password" value="123456" readonly style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.18);color:#fff">
    </div>
    <button class="f-submit" style="margin-top:26px" data-action="p-nav" data-value="home">Ingresar</button>
    <div style="text-align:center;font-size:12px;color:#63799A;margin-top:18px">¿Olvidaste tu clave? Contacta a RRHH</div>
  </div>`;
}

function pHome(){
  const nuevos = state.comunicados.filter(c => c.nuevo).length;
  const abiertasMias = misSolicitudes().filter(s => ABIERTOS.includes(s.estado)).length;
  const com = state.comunicados.slice(0,2).map(c => `
    <div class="f-com ${c.nuevo ? 'f-com--unread' : ''}" data-action="p-com" data-id="${c.id}">
      <div class="f-com__meta"><span class="f-com__area">${c.area}</span><span class="f-com__date">${c.fecha}</span></div>
      <div class="f-com__t">${c.titulo}</div>
    </div>`).join('');

  return `
  <div class="f-header">
    <div class="f-hello">Buenos días</div>
    <div class="f-name">${TRABAJADOR.nombre}</div>
    <div class="f-faena">${ic('pin',14)} ${TRABAJADOR.faena} · Turno A</div>
  </div>
  <div class="f-body">
    <button class="f-cta" data-action="p-nav" data-value="newCat">
      <span class="f-cta__icon">${ic('plus',24,2.4)}</span>
      <span>
        <span class="f-cta__t">Nueva solicitud</span>
        <span class="f-cta__s">Reporta, pide o informa en 1 minuto</span>
      </span>
    </button>

    <div class="f-section-title">Accesos rápidos</div>
    <div class="f-grid">
      <button class="f-tile" data-action="p-nav" data-value="list">
        ${abiertasMias ? `<span class="f-badge">${abiertasMias}</span>` : ''}
        <span class="f-tile__icon">${ic('list',18)}</span>
        <span class="f-tile__t">Mis solicitudes</span>
      </button>
      <button class="f-tile" data-action="p-nav" data-value="comunicados">
        ${nuevos ? `<span class="f-badge">${nuevos}</span>` : ''}
        <span class="f-tile__icon">${ic('megaphone',18)}</span>
        <span class="f-tile__t">Comunicados</span>
      </button>
      <button class="f-tile" data-action="p-nav" data-value="docs">
        <span class="f-tile__icon">${ic('doc',18)}</span>
        <span class="f-tile__t">Documentos</span>
      </button>
      <button class="f-tile" data-action="p-turno">
        <span class="f-tile__icon">${ic('calendar',18)}</span>
        <span class="f-tile__t">Mi turno</span>
      </button>
    </div>

    <div class="f-section-title">Comunicados de la empresa</div>
    ${com}
    <button class="f-chip" style="width:100%;text-align:center" data-action="p-nav" data-value="comunicados">Ver todos los comunicados</button>
  </div>
  ${navBar('home')}`;
}

function navBar(active){
  const items = [
    { k:'home', l:'Inicio', i:'home' },
    { k:'list', l:'Solicitudes', i:'list' },
    { k:'comunicados', l:'Avisos', i:'bell' },
    { k:'perfil', l:'Perfil', i:'user' }
  ];
  return `<nav class="f-nav">${items.map(x => `
    <button class="f-nav__btn ${active === x.k ? 'is-on' : ''}" data-action="p-nav" data-value="${x.k}">
      ${ic(x.i,20)}<span>${x.l}</span>
    </button>`).join('')}</nav>`;
}

function pNewCat(){
  const cats = Object.entries(CATEGORIAS).map(([k,v]) => `
    <button class="f-cat" data-action="p-cat" data-value="${k}">
      <span class="f-cat__ic" style="background:${v.bg};color:${v.color}">${ic(v.icon,24,2)}</span>
      <span class="f-cat__t">${k}</span>
      <span class="f-cat__s">Respuesta en ${v.sla}</span>
    </button>`).join('');
  return `
  <div class="f-header f-header--compact">
    <button class="f-header__back" data-action="p-nav" data-value="home">←</button>
    <div><div class="f-header__title">Nueva solicitud</div><div class="f-header__sub">Paso 1 de 2 · Elige el tipo</div></div>
  </div>
  <div class="f-body">
    <div class="f-section-title">¿Qué necesitas informar?</div>
    <div class="f-cats">${cats}</div>
    <div class="f-help" style="margin-top:16px">Cada tipo llega automáticamente al área responsable, con un plazo de respuesta comprometido. No necesitas saber a quién escribirle.</div>
  </div>`;
}

function pNewForm(){
  const d = state.phone.draft || {};
  const c = CATEGORIAS[d.categoria];
  const subs = c.sub.map(s => `<option ${d.sub === s ? 'selected' : ''}>${s}</option>`).join('');
  const urg = ['Baja','Media','Alta'].map(u =>
    `<button class="f-chip ${d.urg === u ? 'is-on' : ''}" data-action="p-urg" data-value="${u}">${u}</button>`).join('');
  const foto = d.foto
    ? `<div class="f-photo-preview">
         <div class="f-photo-thumb">${ic('image',22)}</div>
         <div style="flex:1"><div class="f-photo-name">IMG_20260814_0941.jpg</div><div class="f-photo-size">1,8 MB · comprimida a 320 KB</div></div>
         <button class="f-chip" data-action="p-foto" style="padding:7px 10px">Quitar</button>
       </div>`
    : `<button class="f-photo" data-action="p-foto">${ic('camera',26)}Agregar foto</button>`;

  return `
  <div class="f-header f-header--compact">
    <button class="f-header__back" data-action="p-nav" data-value="newCat">←</button>
    <div><div class="f-header__title">${d.categoria}</div><div class="f-header__sub">Paso 2 de 2 · Respuesta en ${c.sla}</div></div>
  </div>
  <div class="f-body" style="padding-bottom:20px">
    <div class="f-field">
      <label class="f-label">¿De qué se trata?</label>
      <select class="f-select" data-field="sub">${subs}</select>
    </div>
    <div class="f-field">
      <label class="f-label">Urgencia</label>
      <div class="f-chips">${urg}</div>
    </div>
    <div class="f-field">
      <label class="f-label">Cuéntanos brevemente</label>
      <textarea class="f-textarea" data-field="desc" placeholder="Escribe lo justo y necesario...">${d.desc || ''}</textarea>
      <div class="f-help">Si puedes, agrega una foto. Vale más que cualquier explicación escrita.</div>
    </div>
    <div class="f-field">
      <label class="f-label">Evidencia (opcional)</label>
      ${foto}
    </div>
    <div class="f-field">
      <label class="f-label">Faena</label>
      <input class="f-input" value="${TRABAJADOR.faena}" readonly style="background:var(--s-100);color:var(--s-500)">
      <div class="f-help">Se completa automáticamente según tu asignación.</div>
    </div>
  </div>
  <div class="f-bottom">
    <button class="f-submit" data-action="p-enviar">${ic('send',18)} &nbsp;Enviar solicitud</button>
  </div>`;
}

function pSent(){
  const s = byId(state.phone.sel);
  return `
  <div class="f-body" style="padding-top:0">
    <div class="f-success">
      <div class="f-success__ring">${ic('checkBig',44)}</div>
      <div class="f-success__t">¡Listo! Tu solicitud fue enviada</div>
      <div class="f-success__folio">${s.id}</div>
      <div class="f-success__x">
        Llegó a <strong>${CATEGORIAS[s.cat].area}</strong>.<br>
        Te avisaremos apenas alguien la tome.<br>
        Compromiso de respuesta: <strong>${CATEGORIAS[s.cat].sla}</strong>.
      </div>
    </div>
    <button class="f-submit" data-action="p-open" data-id="${s.id}">Ver el estado de mi solicitud</button>
    <div style="height:10px"></div>
    <button class="f-submit f-submit--dark" style="background:var(--s-100);color:var(--s-700)" data-action="p-nav" data-value="home">Volver al inicio</button>
  </div>`;
}

function pList(){
  const items = misSolicitudes().map(s => `
    <div class="f-item" data-action="p-open" data-id="${s.id}">
      <div class="f-item__top">
        <span class="f-item__folio">${s.id}</span>
        ${estadoPill(s.estado)}
      </div>
      <div class="f-item__t">${s.sub}</div>
      <div class="f-item__meta">${catChip(s.cat)}<span>${s.fecha}</span></div>
    </div>`).join('');
  return `
  <div class="f-header f-header--compact">
    <button class="f-header__back" data-action="p-nav" data-value="home">←</button>
    <div><div class="f-header__title">Mis solicitudes</div><div class="f-header__sub">${misSolicitudes().length} en total · historial completo</div></div>
  </div>
  <div class="f-body">${items}</div>
  ${navBar('list')}`;
}

function pDetail(){
  const s = byId(state.phone.sel);
  if (!s) return pList();
  const tl = s.hist.map((h,i) => {
    const last = i === s.hist.length - 1;
    return `
    <div class="tl-item ${last ? 'tl-item--current' : 'tl-item--done'}">
      <span class="tl-dot"></span>
      <div class="tl-t">${h.e}</div>
      <div class="tl-m">${h.f} · ${h.a}</div>
      ${h.c ? `<div class="tl-c">${h.c}</div>` : ''}
    </div>`;
  }).join('');

  const acciones = s.estado === 'Resuelto' ? `
    <div class="f-bottom">
      <button class="f-submit" style="background:linear-gradient(145deg,#16A34A,#15803D);box-shadow:none" data-action="p-confirmar" data-id="${s.id}">${ic('check',18)} &nbsp;Confirmar solución</button>
      <div style="height:9px"></div>
      <button class="f-submit f-submit--dark" style="background:var(--s-100);color:var(--s-700)" data-action="p-reabrir" data-id="${s.id}">No quedó resuelto</button>
    </div>` : '';

  return `
  <div class="f-header f-header--compact">
    <button class="f-header__back" data-action="p-nav" data-value="list">←</button>
    <div><div class="f-header__title">${s.id}</div><div class="f-header__sub">${s.cat} · ${s.sub}</div></div>
  </div>
  <div class="f-body" style="padding-bottom:${s.estado === 'Resuelto' ? '10px' : '90px'}">
    <div class="f-card">
      <div style="margin-bottom:10px">${estadoPill(s.estado)}</div>
      <div style="font-size:13.5px;color:var(--s-700);line-height:1.55">${s.desc}</div>
      ${s.foto ? `<div class="f-photo-preview" style="margin-top:12px"><div class="f-photo-thumb">${ic('image',22)}</div><div><div class="f-photo-name">IMG_20260814_0941.jpg</div><div class="f-photo-size">Adjunta al reporte</div></div></div>` : ''}
    </div>
    <div class="f-card">
      <div class="f-kv"><span class="f-kv__k">Responsable</span><span class="f-kv__v">${s.resp ? s.resp.split(' (')[0] : 'Por asignar'}</span></div>
      <div class="f-kv"><span class="f-kv__k">Área</span><span class="f-kv__v">${CATEGORIAS[s.cat].area}</span></div>
      <div class="f-kv"><span class="f-kv__k">Compromiso</span><span class="f-kv__v">${s.compromiso || '—'}</span></div>
      <div class="f-kv"><span class="f-kv__k">Urgencia</span><span class="f-kv__v">${s.urg}</span></div>
      <div class="f-kv"><span class="f-kv__k">Faena</span><span class="f-kv__v">${s.faena}</span></div>
    </div>
    <div class="f-section-title">Seguimiento</div>
    <div class="f-card"><div class="timeline">${tl}</div></div>
  </div>
  ${acciones || navBar('list')}`;
}

function pComunicados(){
  const items = state.comunicados.map(c => `
    <div class="f-com ${c.nuevo ? 'f-com--unread' : ''}" data-action="p-com" data-id="${c.id}">
      <div class="f-com__meta"><span class="f-com__area">${c.area}</span><span class="f-com__date">${c.fecha}</span></div>
      <div class="f-com__t">${c.titulo}</div>
      <div class="f-com__x">${c.texto.slice(0,90)}…</div>
    </div>`).join('');
  return `
  <div class="f-header f-header--compact">
    <button class="f-header__back" data-action="p-nav" data-value="home">←</button>
    <div><div class="f-header__title">Comunicados</div><div class="f-header__sub">Información oficial de la empresa</div></div>
  </div>
  <div class="f-body">${items}</div>
  ${navBar('comunicados')}`;
}

function pComDetail(){
  const c = state.comunicados.find(x => x.id === state.phone.comSel);
  return `
  <div class="f-header f-header--compact">
    <button class="f-header__back" data-action="p-nav" data-value="comunicados">←</button>
    <div><div class="f-header__title">${c.area}</div><div class="f-header__sub">${c.fecha}</div></div>
  </div>
  <div class="f-body">
    <div class="f-card">
      <div style="font-size:16px;font-weight:700;color:var(--s-900);line-height:1.4">${c.titulo}</div>
      <div style="font-size:13.5px;color:var(--s-600);line-height:1.65;margin-top:12px">${c.texto}</div>
    </div>
    <div class="f-card" style="background:var(--ok-bg);border-color:#BBF7D0;display:flex;align-items:center;gap:10px;color:var(--ok);font-size:13px;font-weight:650">
      ${ic('check',18)} Lectura confirmada
    </div>
    <div class="f-help">La confirmación de lectura permite a la empresa saber si la información realmente llegó a terreno.</div>
  </div>
  ${navBar('comunicados')}`;
}

function pDocs(){
  const items = DOCUMENTOS.map(d => `
    <div class="f-item" data-action="p-doc">
      <div style="display:flex;align-items:center;gap:12px">
        <span class="f-tile__icon" style="flex:none">${ic('doc',18)}</span>
        <div style="flex:1"><div class="f-item__t" style="font-size:13.5px">${d.t}</div><div class="f-item__meta" style="margin-top:3px">${d.m}</div></div>
        <span style="color:var(--s-400)">${ic('chev',16)}</span>
      </div>
    </div>`).join('');
  return `
  <div class="f-header f-header--compact">
    <button class="f-header__back" data-action="p-nav" data-value="home">←</button>
    <div><div class="f-header__title">Documentos</div><div class="f-header__sub">Disponibles para descarga</div></div>
  </div>
  <div class="f-body">${items}</div>
  ${navBar('home')}`;
}

function pPerfil(){
  return `
  <div class="f-header">
    <div style="display:flex;align-items:center;gap:14px">
      <div style="width:56px;height:56px;border-radius:50%;background:rgba(249,115,22,.25);border:2px solid rgba(249,115,22,.5);display:grid;place-items:center;font-size:19px;font-weight:750;color:#FDBA74">${TRABAJADOR.iniciales}</div>
      <div>
        <div class="f-name" style="font-size:17px">${TRABAJADOR.nombre}</div>
        <div class="f-hello">${TRABAJADOR.cargo}</div>
      </div>
    </div>
  </div>
  <div class="f-body">
    <div class="f-card">
      <div class="f-kv"><span class="f-kv__k">RUT</span><span class="f-kv__v">${TRABAJADOR.rut}</span></div>
      <div class="f-kv"><span class="f-kv__k">Faena asignada</span><span class="f-kv__v">${TRABAJADOR.faena}</span></div>
      <div class="f-kv"><span class="f-kv__k">Turno</span><span class="f-kv__v">Turno A · 7x7</span></div>
      <div class="f-kv"><span class="f-kv__k">Supervisor</span><span class="f-kv__v">Jorge Fuentes</span></div>
    </div>
    <div class="f-section-title">Contactos útiles</div>
    <div class="f-card">
      <div class="f-kv"><span class="f-kv__k">RRHH</span><span class="f-kv__v">Marcela Soto</span></div>
      <div class="f-kv"><span class="f-kv__k">Prevención</span><span class="f-kv__v">Sandra Lillo</span></div>
      <div class="f-kv"><span class="f-kv__k">Administración</span><span class="f-kv__v">Patricio Aguilera</span></div>
    </div>
    <button class="f-chip" style="width:100%;text-align:center;color:var(--danger)" data-action="p-nav" data-value="login">${ic('logout',15)} Cerrar sesión</button>
  </div>
  ${navBar('perfil')}`;
}

/* ============================================================
   VISTA OFICINA (escritorio)
   ============================================================ */
function renderOffice(){
  const screens = { inbox:oInbox, case:oCase, dashboard:oDashboard, comunicados:oComunicados, equipo:oEquipo };
  $('#officeScreen').innerHTML = `
    <div class="o-shell">
      ${oSidebar()}
      <div class="o-main">${(screens[state.office.screen] || oInbox)()}</div>
    </div>`;
}

function oSidebar(){
  const s = state.office.screen;
  const nav = [
    { k:'inbox', l:'Bandeja de gestión', i:'inbox', n:abiertas().length },
    { k:'dashboard', l:'Indicadores', i:'chart' },
    { k:'comunicados', l:'Comunicados', i:'megaphone' },
    { k:'equipo', l:'Trabajadores', i:'users' }
  ];
  return `
  <aside class="o-side">
    <div class="o-side__brand">
      <div class="o-side__logo">R</div>
      <div><div class="o-side__name">Roccflex</div></div>
    </div>
    <div class="o-side__label">GESTIÓN</div>
    ${nav.map(x => `
      <button class="o-nav ${s === x.k || (s === 'case' && x.k === 'inbox') ? 'is-on' : ''}" data-action="o-nav" data-value="${x.k}">
        ${ic(x.i,17)}<span>${x.l}</span>${x.n ? `<span class="o-nav__count">${x.n}</span>` : ''}
      </button>`).join('')}
    <div class="o-side__user">
      <div class="o-avatar">MS</div>
      <div><div class="o-side__uname">Marcela Soto</div><div class="o-side__urole">Analista de RRHH</div></div>
    </div>
  </aside>`;
}

function oInbox(){
  const f = state.office.filtro;
  const lista = state.solicitudes.filter(s => {
    if (f === 'abiertas') return ABIERTOS.includes(s.estado);
    if (f === 'todas') return true;
    if (f === 'criticas') return s.urg === 'Alta' && ABIERTOS.includes(s.estado);
    if (f === 'sinAsignar') return !s.resp && ABIERTOS.includes(s.estado);
    return s.cat === f;
  });

  const filtros = [
    ['abiertas','Abiertas'], ['criticas','Críticas'], ['sinAsignar','Sin asignar'],
    ['Seguridad','Seguridad'], ['Operacional','Operacional'], ['RRHH','RRHH'], ['todas','Todas']
  ].map(([k,l]) => `<button class="o-filter ${f === k ? 'is-on' : ''}" data-action="o-filtro" data-value="${k}">${l}</button>`).join('');

  const filas = lista.map(s => `
    <tr data-action="o-open" data-id="${s.id}" class="${state.office.highlight === s.id ? 'is-new' : ''}">
      <td><div class="o-folio">${s.id}</div><div class="o-sub">${s.fecha}</div></td>
      <td>${catChip(s.cat)}<div class="o-sub" style="margin-top:4px">${s.sub}</div></td>
      <td><div class="o-strong">${s.autor}</div><div class="o-sub">${s.faena}</div></td>
      <td>${urgPill(s.urg)}</td>
      <td>${estadoPill(s.estado)}</td>
      <td>${s.resp ? `<div class="o-strong" style="font-size:12.5px">${s.resp.split(' (')[0]}</div><div class="o-sub">${s.resp.match(/\(([^)]+)\)/)?.[1] || ''}</div>` : '<span class="pill pill--danger">Sin asignar</span>'}</td>
      <td>${slaPill(s.sla)}</td>
    </tr>`).join('');

  return `
  <div class="o-topbar">
    <div>
      <h1>Bandeja de gestión</h1>
      <p>${abiertas().length} solicitudes abiertas · ${state.solicitudes.filter(s => s.sla === 'vencido' && ABIERTOS.includes(s.estado)).length} con plazo vencido</p>
    </div>
    <button class="o-btn o-btn--primary" data-action="o-nav" data-value="dashboard">${ic('chart',15)} Ver indicadores</button>
  </div>
  <div class="o-content">
    <div class="o-filters">${filtros}<input class="o-search" placeholder="Buscar por folio, trabajador o faena…"></div>
    ${lista.length ? `
    <table class="o-table">
      <thead><tr><th>Folio</th><th>Categoría</th><th>Solicitante</th><th>Urgencia</th><th>Estado</th><th>Responsable</th><th>Plazo</th></tr></thead>
      <tbody>${filas}</tbody>
    </table>` : '<div class="o-empty">No hay solicitudes con este filtro.</div>'}
  </div>`;
}

function oCase(){
  const s = byId(state.office.sel);
  if (!s) return oInbox();
  const tl = s.hist.map((h,i) => {
    const last = i === s.hist.length - 1;
    return `
    <div class="tl-item ${last ? 'tl-item--current' : 'tl-item--done'}">
      <span class="tl-dot"></span>
      <div class="tl-t">${h.e}</div>
      <div class="tl-m">${h.f} · ${h.a}</div>
      ${h.c ? `<div class="tl-c">${h.c}</div>` : ''}
    </div>`;
  }).join('');

  const cerrado = ['Cerrado','Rechazado'].includes(s.estado);
  const opts = RESPONSABLES.map(r => `<option ${s.resp === r ? 'selected' : ''}>${r}</option>`).join('');

  const acciones = cerrado
    ? `<div class="pill pill--ok" style="padding:8px 14px">Caso cerrado · sin acciones pendientes</div>`
    : `
      <div class="o-field">
        <label class="o-flabel">Responsable</label>
        <select class="o-select" id="selResp"><option value="">— Seleccionar —</option>${opts}</select>
      </div>
      <div class="o-field">
        <label class="o-flabel">Fecha comprometida</label>
        <select class="o-select" id="selFecha">
          <option>Hoy</option><option selected>Mañana</option><option>Viernes</option><option>Próxima semana</option>
        </select>
      </div>
      <div class="o-field">
        <label class="o-flabel">Comentario para el trabajador</label>
        <textarea class="o-select" id="txtComentario" style="min-height:78px;resize:vertical" placeholder="Se envía al celular del trabajador…"></textarea>
      </div>
      <div class="o-actions" style="flex-direction:column">
        ${s.estado === 'Ingresado' ? `<button class="o-btn o-btn--primary" style="width:100%" data-action="o-recibir" data-id="${s.id}">${ic('check',15)} Acusar recibo</button>` : ''}
        <button class="o-btn o-btn--accent" style="width:100%" data-action="o-asignar" data-id="${s.id}">Asignar y poner en gestión</button>
        <button class="o-btn" style="width:100%" data-action="o-esperar" data-id="${s.id}">Solicitar más información</button>
        <button class="o-btn o-btn--ok" style="width:100%" data-action="o-resolver" data-id="${s.id}">Marcar como resuelto</button>
        <button class="o-btn" style="width:100%;color:var(--danger);border-color:#FCA5A5" data-action="o-rechazar" data-id="${s.id}">Rechazar / no procede</button>
      </div>`;

  return `
  <div class="o-topbar">
    <div>
      <h1>${s.id} · ${s.sub}</h1>
      <p>${s.cat} · ${s.faena} · ingresada ${s.edad}</p>
    </div>
    <button class="o-btn" data-action="o-nav" data-value="inbox">← Volver a la bandeja</button>
  </div>
  <div class="o-content">
    <div class="o-case">
      <div>
        <div class="o-card">
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
            ${estadoPill(s.estado)} ${urgPill(s.urg)} ${catChip(s.cat)} ${slaPill(s.sla)}
          </div>
          <p class="o-card__t">Descripción del trabajador</p>
          <div class="o-desc">${s.desc}</div>
          ${s.foto ? `<div class="o-attach"><div class="o-attach__thumb">${ic('image',22)}</div><div><div style="font-size:12.5px;font-weight:650">IMG_20260814_0941.jpg</div><div class="o-sub">Adjunta desde terreno</div></div></div>` : ''}
        </div>
        <div class="o-card">
          <p class="o-card__t">Historial de gestión (no editable)</p>
          <div class="timeline">${tl}</div>
        </div>
      </div>
      <div>
        <div class="o-card">
          <p class="o-card__t">Ficha</p>
          <div class="f-kv"><span class="f-kv__k">Solicitante</span><span class="f-kv__v">${s.autor}</span></div>
          <div class="f-kv"><span class="f-kv__k">Faena</span><span class="f-kv__v">${s.faena}</span></div>
          <div class="f-kv"><span class="f-kv__k">Área responsable</span><span class="f-kv__v">${CATEGORIAS[s.cat].area}</span></div>
          <div class="f-kv"><span class="f-kv__k">Plazo comprometido</span><span class="f-kv__v">${CATEGORIAS[s.cat].sla}</span></div>
          <div class="f-kv"><span class="f-kv__k">Fecha comprometida</span><span class="f-kv__v">${s.compromiso || 'Por definir'}</span></div>
        </div>
        <div class="o-card">
          <p class="o-card__t">Gestionar</p>
          ${acciones}
        </div>
      </div>
    </div>
  </div>`;
}

function oDashboard(){
  const total = state.solicitudes.length;
  const ab = abiertas().length;
  const cerradas = state.solicitudes.filter(s => s.estado === 'Cerrado').length;
  const vencidas = state.solicitudes.filter(s => s.sla === 'vencido' && ABIERTOS.includes(s.estado)).length;

  const porCat = {};
  state.solicitudes.forEach(s => porCat[s.cat] = (porCat[s.cat] || 0) + 1);
  const maxCat = Math.max(...Object.values(porCat));
  const barrasCat = Object.entries(porCat).sort((a,b) => b[1] - a[1]).map(([k,v]) => `
    <div class="bar-row">
      <span class="bar-row__l">${k}</span>
      <span class="bar-track"><span class="bar-fill" style="width:${(v/maxCat*100).toFixed(0)}%;background:${CATEGORIAS[k].color}"></span></span>
      <span class="bar-row__v">${v}</span>
    </div>`).join('');

  const porFaena = {};
  state.solicitudes.forEach(s => porFaena[s.faena] = (porFaena[s.faena] || 0) + 1);
  const maxF = Math.max(...Object.values(porFaena));
  const barrasFaena = Object.entries(porFaena).sort((a,b) => b[1] - a[1]).map(([k,v]) => `
    <div class="bar-row">
      <span class="bar-row__l" title="${k}">${k.replace('Faena ','').replace('Obra ','')}</span>
      <span class="bar-track"><span class="bar-fill" style="width:${(v/maxF*100).toFixed(0)}%"></span></span>
      <span class="bar-row__v">${v}</span>
    </div>`).join('');

  const criticos = state.solicitudes.filter(s => ABIERTOS.includes(s.estado) && (s.sla !== 'ok' || s.urg === 'Alta')).slice(0,5).map(s => `
    <div style="display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--s-100)">
      <div style="flex:1"><div class="o-strong" style="font-size:13px">${s.id} · ${s.sub}</div><div class="o-sub">${s.faena} · ${s.edad}</div></div>
      ${slaPill(s.sla)}
    </div>`).join('');

  const kpi = (l,v,d,cls) => `<div class="kpi"><div class="kpi__l">${l}</div><div class="kpi__v">${v}</div><div class="kpi__d kpi__d--${cls}">${d}</div></div>`;

  return `
  <div class="o-topbar">
    <div><h1>Indicadores de comunicación y RRHH</h1><p>Últimos 30 días · todas las faenas</p></div>
    <button class="o-btn" data-action="o-nav" data-value="inbox">← Bandeja</button>
  </div>
  <div class="o-content">
    <div class="o-kpis">
      ${kpi('Solicitudes abiertas', ab, `${total} recibidas en total`, 'flat')}
      ${kpi('Tiempo de 1ª respuesta', '3,2 h', '↓ 1,4 h vs. mes anterior', 'up')}
      ${kpi('Tiempo de resolución', '41 h', 'meta: menos de 48 h', 'up')}
      ${kpi('Cumplimiento de plazo', '87%', 'meta: 85%', 'up')}
      ${kpi('Plazos vencidos', vencidas, vencidas ? 'requieren escalamiento' : 'sin casos vencidos', vencidas ? 'down' : 'up')}
      ${kpi('Adopción en faena', '74%', '↑ 12 pts vs. mes anterior', 'up')}
    </div>

    <div class="o-charts">
      <div class="o-card">
        <p class="o-card__t">Solicitudes por categoría</p>
        ${barrasCat}
      </div>
      <div class="o-card">
        <p class="o-card__t">Solicitudes por faena</p>
        ${barrasFaena}
      </div>
    </div>

    <div class="o-charts">
      <div class="o-card">
        <p class="o-card__t">Requieren atención inmediata</p>
        ${criticos || '<div class="o-empty" style="padding:26px">Sin casos críticos.</div>'}
      </div>
      <div class="o-card">
        <p class="o-card__t">Calidad de la gestión</p>
        <div class="gauge" style="margin-bottom:20px">
          <div><div class="gauge__n">${cerradas}</div><div class="gauge__l">solicitudes cerradas<br>con confirmación del trabajador</div></div>
        </div>
        <div class="gauge" style="margin-bottom:20px">
          <div><div class="gauge__n">6%</div><div class="gauge__l">tasa de reapertura<br>meta: bajo 10%</div></div>
        </div>
        <div class="gauge">
          <div><div class="gauge__n">88%</div><div class="gauge__l">lectura promedio de comunicados<br>meta: 80%</div></div>
        </div>
      </div>
    </div>
  </div>`;
}

function oComunicados(){
  const items = state.comunicados.map(c => `
    <div class="o-com">
      <div>
        <div class="o-com__t">${c.titulo}</div>
        <div class="o-com__m">${c.area} · ${c.fecha}</div>
        <div class="o-sub" style="margin-top:8px;max-width:620px;line-height:1.5">${c.texto}</div>
      </div>
      <div class="o-com__read">
        <div class="o-com__pct">${c.lectura}%</div>
        <div class="o-sub">confirmaron lectura</div>
        <div class="bar-track" style="margin-top:8px"><span class="bar-fill" style="width:${c.lectura}%;background:${c.lectura >= 80 ? 'var(--ok)' : 'var(--accent)'}"></span></div>
      </div>
    </div>`).join('');
  return `
  <div class="o-topbar">
    <div><h1>Comunicados</h1><p>Información oficial publicada a faena · con confirmación de lectura</p></div>
    <button class="o-btn o-btn--accent" data-action="o-publicar">${ic('plus',15)} Nuevo comunicado</button>
  </div>
  <div class="o-content">${items}</div>`;
}

function oEquipo(){
  const gente = [
    ['Luis Cárdenas','Maestro montajista','Faena El Roble','Turno A','LC'],
    ['Héctor Valdés','Supervisor de terreno','Faena Norte – Planta 2','Turno A','HV'],
    ['Camila Reyes','Jornal especializado','Obra Camino Los Aromos','Turno B','CR'],
    ['Jorge Fuentes','Capataz','Taller Central','Turno A','JF'],
    ['Ana Sepúlveda','Administrativa de faena','Faena Norte – Planta 2','Turno B','AS'],
    ['Rodrigo Muñoz','Jefe de Operaciones','Casa matriz','Oficina','RM'],
    ['Sandra Lillo','Prevencionista de riesgos','Todas las faenas','Oficina','SL'],
    ['Patricio Aguilera','Encargado de Administración','Casa matriz','Oficina','PA']
  ];
  const filas = gente.map(([n,c,f,t,i]) => `
    <tr>
      <td><div style="display:flex;align-items:center;gap:11px"><div class="o-avatar" style="background:var(--s-200);color:var(--s-600)">${i}</div><div><div class="o-strong">${n}</div><div class="o-sub">${c}</div></div></div></td>
      <td>${f}</td>
      <td>${t}</td>
      <td>${state.solicitudes.filter(s => s.autor === n).length}</td>
      <td><span class="pill pill--ok">App activa</span></td>
    </tr>`).join('');
  return `
  <div class="o-topbar">
    <div><h1>Trabajadores</h1><p>8 registrados · 74% con la app instalada y activa</p></div>
  </div>
  <div class="o-content">
    <table class="o-table">
      <thead><tr><th>Trabajador</th><th>Faena</th><th>Turno</th><th>Solicitudes</th><th>Estado</th></tr></thead>
      <tbody>${filas}</tbody>
    </table>
  </div>`;
}

/* ============================================================
   RENDER GENERAL
   ============================================================ */
function render(){
  $('#stage').dataset.view = state.view;
  document.querySelectorAll('.segmented__btn').forEach(b =>
    b.classList.toggle('is-active', b.dataset.value === state.view));
  renderPhone();
  renderOffice();
}

/* ============================================================
   ACCIONES
   ============================================================ */
const handlers = {
  /* --- generales --- */
  view(el){ state.view = el.dataset.value; render(); },
  reset(){ const v = state.view; resetState(); state.view = v; render(); toast('Maqueta reiniciada'); },

  /* --- faena --- */
  'p-nav'(el){
    state.phone.screen = el.dataset.value;
    state.phone.push = null;
    render();
  },
  'p-cat'(el){
    const c = el.dataset.value;
    state.phone.draft = { categoria:c, sub:CATEGORIAS[c].sub[0], urg:'Media', desc:'', foto:false };
    state.phone.screen = 'newForm';
    render();
  },
  'p-urg'(el){ state.phone.draft.urg = el.dataset.value; render(); },
  'p-foto'(){ state.phone.draft.foto = !state.phone.draft.foto; render(); },
  'p-enviar'(){
    const t = document.querySelector('[data-field="desc"]');
    const sub = document.querySelector('[data-field="sub"]');
    if (t) state.phone.draft.desc = t.value;
    if (sub) state.phone.draft.sub = sub.value;
    if (!state.phone.draft.desc.trim()){ toast('Escribe una breve descripción'); return; }
    crearSolicitud();
    render();
  },
  'p-open'(el){ state.phone.sel = el.dataset.id; state.phone.screen = 'detail'; state.phone.push = null; render(); },
  'p-com'(el){
    const c = state.comunicados.find(x => x.id === el.dataset.id);
    c.nuevo = false; c.lectura = Math.min(99, c.lectura + 1);
    state.phone.comSel = c.id; state.phone.screen = 'comDetail';
    render();
  },
  'p-confirmar'(el){
    const s = byId(el.dataset.id);
    addHist(s, 'Cerrado', TRABAJADOR.nombre, 'Solución confirmada por el trabajador. Caso cerrado.');
    render(); toast(`${s.id} cerrada con confirmación del trabajador`);
  },
  'p-reabrir'(el){
    const s = byId(el.dataset.id);
    addHist(s, 'Reabierto', TRABAJADOR.nombre, 'El trabajador indica que el problema persiste.');
    render(); toast(`${s.id} reabierta — vuelve a la bandeja de oficina`);
  },
  'p-turno'(){ toast('Módulo "Mi turno" — planificado para la fase 2'); },
  'p-doc'(){ toast('Descarga de documento (simulada en la maqueta)'); },

  /* --- oficina --- */
  'o-nav'(el){ state.office.screen = el.dataset.value; state.office.highlight = null; render(); },
  'o-filtro'(el){ state.office.filtro = el.dataset.value; render(); },
  'o-open'(el){ state.office.sel = el.dataset.id; state.office.screen = 'case'; state.office.highlight = null; render(); },
  'o-recibir'(el){
    const s = byId(el.dataset.id);
    addHist(s, 'Recibido', 'Marcela Soto', 'Recepción confirmada por la oficina.');
    pushPhone('Tu solicitud fue recibida', `${s.id} · la oficina confirmó recepción`);
    render(); toast('Acuse de recibo enviado al trabajador');
  },
  'o-asignar'(el){
    const s = byId(el.dataset.id);
    const r = $('#selResp')?.value, f = $('#selFecha')?.value, c = $('#txtComentario')?.value;
    if (!r){ toast('Selecciona un responsable'); return; }
    s.resp = r; s.compromiso = f; s.sla = 'ok';
    addHist(s, 'En gestión', r.split(' (')[0], c || `Asignado a ${r.split(' (')[0]}. Compromiso: ${f}.`);
    pushPhone('Tu solicitud está en gestión', `${s.id} · responsable: ${r.split(' (')[0]}`);
    render(); toast(`${s.id} asignada a ${r.split(' (')[0]}`);
  },
  'o-esperar'(el){
    const s = byId(el.dataset.id);
    const c = $('#txtComentario')?.value;
    if (!c?.trim()){ toast('Escribe qué información necesitas'); return; }
    addHist(s, 'En espera de información', 'Marcela Soto', c);
    pushPhone('Necesitamos más información', `${s.id} · la oficina te hizo una consulta`);
    render();
  },
  'o-resolver'(el){
    const s = byId(el.dataset.id);
    const c = $('#txtComentario')?.value;
    if (!c?.trim()){ toast('Describe la solución aplicada'); return; }
    addHist(s, 'Resuelto', s.resp ? s.resp.split(' (')[0] : 'Marcela Soto', c);
    pushPhone('Tu solicitud fue resuelta', `${s.id} · confirma si quedó solucionada`);
    render(); toast('Resolución enviada — el trabajador debe confirmar');
  },
  'o-rechazar'(el){
    const s = byId(el.dataset.id);
    const c = $('#txtComentario')?.value;
    if (!c?.trim()){ toast('El rechazo exige un motivo escrito'); return; }
    addHist(s, 'Rechazado', 'Marcela Soto', c);
    pushPhone('Tu solicitud no procede', `${s.id} · revisa el motivo en la app`);
    render();
  },
  'o-publicar'(){ toast('Editor de comunicados — incluido en el MVP'); },

  /* --- demo guiada --- */
  'guided-start'(){ state.guided = { on:true, i:0 }; runStep(); },
  'guided-stop'(){ state.guided.on = false; $('#coach').hidden = true; clearFocus(); },
  'guided-next'(){
    if (state.guided.i < GUIDED.length - 1){ state.guided.i++; runStep(); }
    else handlers['guided-stop']();
  },
  'guided-prev'(){ if (state.guided.i > 0){ state.guided.i--; runStep(); } }
};

function crearSolicitud(){
  const d = state.phone.draft;
  const id = 'SOL-' + state.correlativo++;
  const s = {
    id, cat:d.categoria, sub:d.sub, faena:TRABAJADOR.faena, autor:TRABAJADOR.nombre,
    fecha:'Hoy ' + horaActual(), edad:'recién', urg:d.urg, estado:'Ingresado',
    resp:null, compromiso:null, sla:'ok', foto:d.foto, desc:d.desc, mio:true,
    hist:[{ e:'Ingresado', f:'Hoy ' + horaActual(), a:TRABAJADOR.nombre, c:'Reporte creado desde la app en terreno.' }]
  };
  state.solicitudes.unshift(s);
  state.phone.sel = id;
  state.phone.screen = 'sent';
  state.office.highlight = id;
  state.office.filtro = 'abiertas';
}

document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const h = handlers[el.dataset.action];
  if (h) h(el);
});
document.addEventListener('change', e => {
  const f = e.target.dataset.field;
  if (f && state.phone.draft) state.phone.draft[f === 'sub' ? 'sub' : f] = e.target.value;
});

/* ============================================================
   DEMO GUIADA
   ============================================================ */
const GUIDED = [
  {
    t:'El problema, en una sola pantalla',
    x:'A la izquierda, Luis Cárdenas en Faena El Roble. A la derecha, Marcela Soto en la oficina. Hoy esa conversación ocurre por WhatsApp, por teléfono o de palabra: sin folio, sin responsable y sin registro. Veamos cómo cambia.',
    focus:'both',
    run(){ const v = state.view; resetState(); state.view = v; state.guided = { on:true, i:0 }; }
  },
  {
    t:'1 · El trabajador reporta desde el celular',
    x:'Falta material en faena. Luis abre la app y toca "Nueva solicitud". Todo el diseño apunta a que esto tome menos de un minuto: botones grandes, categorías predefinidas y el mínimo de texto que escribir.',
    focus:'phone',
    run(){ state.phone.screen = 'newCat'; }
  },
  {
    t:'2 · Elige la categoría, no el destinatario',
    x:'Seis categorías, un toque. La categoría define automáticamente a qué área llega la solicitud y con qué plazo comprometido. El trabajador no necesita saber a quién escribirle ni tener el teléfono de nadie.',
    focus:'phone',
    run(){
      state.phone.draft = {
        categoria:'Operacional', sub:'Falta de material', urg:'Alta', foto:true,
        desc:'Quedamos sin pernos de anclaje de 5/8" para terminar el montaje del módulo 3. Con el stock actual alcanzamos hasta mañana al mediodía.'
      };
      state.phone.screen = 'newForm';
    }
  },
  {
    t:'3 · Formulario corto y foto como evidencia',
    x:'Cuatro campos y una foto. La foto reemplaza tres párrafos escritos: en terreno, con guantes y con apuro, esa diferencia es la que define si el trabajador reporta o simplemente no reporta.',
    focus:'phone',
    run(){ state.phone.screen = 'newForm'; }
  },
  {
    t:'4 · Se genera el folio',
    x:'Al enviar, el sistema asigna un folio único. Desde este segundo hay trazabilidad: quién reportó, qué, cuándo y desde qué faena. Se terminó el "yo avisé" contra el "a mí no me llegó".',
    focus:'phone',
    run(){ if (!byId('SOL-1057')) crearSolicitud(); else state.phone.screen = 'sent'; }
  },
  {
    t:'5 · Llega a la oficina al instante',
    x:'La misma solicitud aparece encabezando la bandeja de gestión, marcada como Ingresado y con el reloj del plazo corriendo. Nadie tuvo que transcribir, reenviar ni recordar nada.',
    focus:'office',
    run(){ state.phone.screen = 'list'; state.office.screen = 'inbox'; state.office.filtro = 'abiertas'; state.office.highlight = 'SOL-1057'; }
  },
  {
    t:'6 · La oficina acusa recibo',
    x:'Marcela abre el caso y confirma la recepción. El trabajador recibe la notificación en el celular. Este solo paso elimina la mayor fuente de frustración en terreno: no saber si alguien leyó tu reporte.',
    focus:'both',
    run(){
      state.office.sel = 'SOL-1057'; state.office.screen = 'case';
      const s = byId('SOL-1057');
      if (s && s.estado === 'Ingresado') addHist(s, 'Recibido', 'Marcela Soto', 'Recepción confirmada por la oficina.');
      state.phone.screen = 'list';
      pushPhone('Tu solicitud fue recibida', 'SOL-1057 · la oficina confirmó recepción');
    }
  },
  {
    t:'7 · Responsable y fecha comprometida',
    x:'Ninguna solicitud puede quedar sin dueño ni sin fecha: es la regla central del sistema. Se asigna a Operaciones con compromiso para mañana, y el trabajador lo ve en su celular.',
    focus:'both',
    run(){
      const s = byId('SOL-1057');
      if (s && s.estado !== 'En gestión'){
        s.resp = 'Rodrigo Muñoz (Operaciones)'; s.compromiso = 'Mañana';
        addHist(s, 'En gestión', 'Rodrigo Muñoz', 'Se coordina despacho de pernos desde bodega central para mañana a primera hora.');
      }
      state.phone.sel = 'SOL-1057'; state.phone.screen = 'detail';
      state.office.screen = 'case';
      pushPhone('Tu solicitud está en gestión', 'SOL-1057 · responsable: Rodrigo Muñoz');
    }
  },
  {
    t:'8 · Se resuelve y el trabajador confirma',
    x:'La oficina marca la solución. El trabajador —el único que sabe si el problema realmente se resolvió— confirma o reabre el caso. Ese cierre en dos partes es lo que hace confiables los indicadores.',
    focus:'both',
    run(){
      const s = byId('SOL-1057');
      if (s && ['En gestión','Recibido'].includes(s.estado)){
        addHist(s, 'Resuelto', 'Rodrigo Muñoz', 'Pernos despachados y recepcionados en pañol de faena. Stock repuesto para 3 semanas.');
      }
      state.phone.sel = 'SOL-1057'; state.phone.screen = 'detail';
      state.office.screen = 'case';
      pushPhone('Tu solicitud fue resuelta', 'SOL-1057 · confirma si quedó solucionada');
    }
  },
  {
    t:'9 · Todo lo anterior se convierte en datos',
    x:'Cada caso alimenta los indicadores: tiempo de respuesta, cumplimiento de plazos, qué faena reporta más y en qué categoría. Por primera vez la empresa puede medir su comunicación interna, no solo intuirla.',
    focus:'office',
    run(){
      const s = byId('SOL-1057');
      if (s && s.estado === 'Resuelto') addHist(s, 'Cerrado', TRABAJADOR.nombre, 'Solución confirmada por el trabajador. Caso cerrado.');
      state.phone.screen = 'home';
      state.office.screen = 'dashboard';
    }
  }
];

function clearFocus(){
  document.querySelectorAll('.pane').forEach(p => p.classList.remove('is-focus','is-dim'));
}
function runStep(){
  const step = GUIDED[state.guided.i];
  step.run();
  render();
  clearFocus();
  if (state.view === 'both'){
    const faena = $('#paneFaena'), ofi = $('#paneOficina');
    if (step.focus === 'phone'){ faena.classList.add('is-focus'); ofi.classList.add('is-dim'); }
    else if (step.focus === 'office'){ ofi.classList.add('is-focus'); faena.classList.add('is-dim'); }
  }
  $('#coach').hidden = false;
  $('#coachStep').textContent = `Paso ${state.guided.i + 1} de ${GUIDED.length}`;
  $('#coachTitle').textContent = step.t;
  $('#coachText').textContent = step.x;
  $('#coachNext').textContent = state.guided.i === GUIDED.length - 1 ? 'Terminar ✓' : 'Siguiente →';
}

/* Navegación con teclado durante la presentación */
document.addEventListener('keydown', e => {
  if (!state.guided.on) return;
  if (e.key === 'ArrowRight' || e.key === ' '){ e.preventDefault(); handlers['guided-next'](); }
  if (e.key === 'ArrowLeft'){ e.preventDefault(); handlers['guided-prev'](); }
  if (e.key === 'Escape'){ handlers['guided-stop'](); }
});

/* Arranque */
render();
