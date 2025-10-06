import { obtenerFichas } from './fichas-adso.js';
import { obtenerAprendices } from './aprendices-ficha.js';

const usuario = localStorage.getItem("usuario");
if (!usuario) {
    alert("Debes primero ingresar con un usuario y contraseña");
    window.location.href = "index.html";
} else {
    document.querySelector(".user-info").textContent = `Bienvenido, ${usuario}`;
}

document.getElementById("btnSalir").addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
});


const selectFicha = document.getElementById('selectFicha');
const selectAprendiz = document.getElementById('selectAprendiz');

const programaAprendiz = document.getElementById('programaAprendiz');
const documentoAprendiz = document.getElementById('documentoAprendiz');
const nombreAprendiz = document.getElementById('nombreAprendiz');
const apellidosAprendiz = document.getElementById('apellidosAprendiz');
const estadoAprendiz = document.getElementById('estadoAprendiz');

const aprobados = document.getElementById('aprobados');
const porEvaluar = document.getElementById('porEvaluar');
const resultadosAprendiz = document.getElementById('resultadosAprendiz').querySelector('tbody');

let aprendicesCargados = [];

async function cargarFichas() {
    const datos = await obtenerFichas();
    datos.fichas.forEach(ficha => {
        const option = document.createElement('option');
        option.value = ficha.url;
        option.textContent = ficha.codigo;
        selectFicha.appendChild(option);
    });
}

async function cargarAprendices(urlFicha) {
    const datos = await obtenerAprendices(urlFicha);
    aprendicesCargados = datos;
    while (selectAprendiz.options.length > 1) {
        selectAprendiz.remove(1);
    }
    const aprendicesUnicos = new Map();
    datos.forEach(registro => {
        const documento = registro["Número de Documento"];
        if (!aprendicesUnicos.has(documento)) {
            aprendicesUnicos.set(documento, registro);
        }
    });
    aprendicesUnicos.forEach(aprendizUnico => {
        const option = document.createElement('option');
        option.value = aprendizUnico["Número de Documento"];
        option.textContent = `${aprendizUnico["Nombre"]} ${aprendizUnico["Apellidos"]} - ${aprendizUnico["Número de Documento"]}`;
        selectAprendiz.appendChild(option);
    });
}

function mostrarDatosAprendiz(documento) {
    const aprendizFiltrado = aprendicesCargados.filter(a => String(a["Número de Documento"]) === String(documento));
    if (aprendizFiltrado.length > 0) {
        const aprendiz = aprendizFiltrado[0];
        programaAprendiz.textContent = aprendiz["PROGRAMA"] || '';
        documentoAprendiz.textContent = aprendiz["Número de Documento"] || '';
        nombreAprendiz.textContent = aprendiz["Nombre"] || '';
        apellidosAprendiz.textContent = aprendiz["Apellidos"] || '';
        estadoAprendiz.textContent = aprendiz["Estado"] || '';
        let countAprobado = 0;
        let countPorEvaluar = 0;
        resultadosAprendiz.innerHTML = '';
        aprendizFiltrado.forEach(juicio => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${juicio["Resultado de Aprendizaje"] || ''}</td>
                <td>${juicio["Juicio de Evaluación"] || ''}</td>
                <td>${juicio["Fecha y Hora del Juicio Evaluativo"] || ''}</td>
                <td>${juicio["Funcionario que registro el juicio evaluativo"] || ''}</td>
            `;
            resultadosAprendiz.appendChild(row);
            if (juicio["Juicio de Evaluación"] === 'APROBADO') countAprobado++;
            else if (juicio["Juicio de Evaluación"] === 'POR EVALUAR') countPorEvaluar++;
        });
        aprobados.textContent = countAprobado;
        porEvaluar.textContent = countPorEvaluar;
    } else {
        programaAprendiz.textContent = 'Texto inicial';
        documentoAprendiz.textContent = 'Texto inicial';
        nombreAprendiz.textContent = 'Texto inicial';
        apellidosAprendiz.textContent = 'Texto inicial';
        estadoAprendiz.textContent = 'Texto inicial';
        aprobados.textContent = 0;
        porEvaluar.textContent = 0;
        resultadosAprendiz.innerHTML = '';
    }
}

selectFicha.addEventListener('change', () => {
    const urlFicha = selectFicha.value;
    if (urlFicha === '') return;
    cargarAprendices(urlFicha);
});

selectAprendiz.addEventListener('change', () => {
    const documento = selectAprendiz.value;
    mostrarDatosAprendiz(documento);
});

cargarFichas();
