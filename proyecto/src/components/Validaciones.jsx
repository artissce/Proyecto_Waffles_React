// src/validaciones.jsx
export const validarNombre = (nombreRol) => {
    if (!nombreRol) {
        return 'El nombre del rol no puede estar vacío';
    }
    if (nombreRol.length > 15) {
        return 'El nombre del rol no puede tener más de 15 caracteres';
    }
    if (/\d/.test(nombreRol)) {
        return 'El nombre del rol no puede contener números';
    }
    return null;
};
