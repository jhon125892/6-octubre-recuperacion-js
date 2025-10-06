export async function obtenerFichas() {
    const response = await fetch('https://raw.githubusercontent.com/CesarMCuellarCha/apis/refs/heads/main/JUICIOS_ADSO.json');
    const datos = await respuesta.json();
    return datos;
}