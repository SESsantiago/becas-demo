// Notificaciones de ejemplo
const notificaciones = [
  { mensaje: "Nueva beca internacional disponible.", fecha: "29/10/2025", leida: false },
  { mensaje: "Tu solicitud ha sido aprobada.", fecha: "27/10/2025", leida: true },
  { mensaje: "Recordatorio: actualiza tu perfil.", fecha: "25/10/2025", leida: false }
];

// Cargar notificaciones
const lista = document.getElementById("lista-notificaciones");
notificaciones.forEach(n => {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${n.mensaje}</strong><br><small>${n.fecha}</small>`;
  li.style.opacity = n.leida ? "0.6" : "1";
  lista.appendChild(li);
});

// Becas dinámicas desde JSON simulado
const becas = [
  { nombre: "Beca Talento Nacional", tipo: "Académica", fecha: "15/12/2025" },
  { nombre: "Beca Internacional Global", tipo: "Internacional", fecha: "10/11/2025" },
  { nombre: "Beca Deportiva Universitaria", tipo: "Deportiva", fecha: "30/11/2025" },
  { nombre: "Beca Excelencia STEAM", tipo: "Científica", fecha: "05/12/2025" }
];

const contenedorBecas = document.getElementById("contenedor-becas");

becas.forEach(b => {
  const card = document.createElement("div");
  card.classList.add("card-beca");
  card.innerHTML = `
    <h4>${b.nombre}</h4>
    <p><strong>Tipo:</strong> ${b.tipo}</p>
    <p><strong>Fecha límite:</strong> ${b.fecha}</p>
    <button>Ver más</button>
  `;
  contenedorBecas.appendChild(card);
});
