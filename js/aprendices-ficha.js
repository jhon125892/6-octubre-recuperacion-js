export async function obtenerAprendices(urlFicha) {
    const response = await fetch(urlFicha);
    const datos=await response.json();
    return datos;
}