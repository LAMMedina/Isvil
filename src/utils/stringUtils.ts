// Función para normalizar el nombre del producto
function normalizeString(str) {
    return str
      .normalize("NFD") // Normaliza el texto
      .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
      .replace(/\s*-\s*/g, '-') // Reemplaza espacios alrededor de guiones
      .replace(/\s+/g, '-') // Reemplaza espacios simples por guiones
      .toLowerCase(); // Convierte a minúsculas
  }

  export default normalizeString;