import { obtenerFichas } from './fichas-adso.js';

const selectFicha = document.getElementById('selectFicha');

async function cargarFichas() {
  const datos = await obtenerFichas();

  datos.fichas.forEach(ficha => {
    const option = document.createElement('option');
    option.value = ficha.url;
    option.textContent = ficha.codigo;
    selectFicha.appendChild(option);
  });
}

cargarFichas();