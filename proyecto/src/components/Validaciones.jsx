// src/Validaciones.jsx

export const validarNombre = (nombre) => {
    if (!nombre) {
        return 'El nombre no puede estar vacío';
    }
    if (nombre.length > 15) {
        return 'El nombre no puede tener más de 15 caracteres';
    }
    if (/\d/.test(nombre)) {
        return 'El nombre no puede contener números';
    }
    return null;
};

export const validarCorreo = (correo) => {
    if (!correo) {
        return 'El correo no puede estar vacío';
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(correo)) {
        return 'El correo no es válido';
    }
    return null;
};

export const validarContrasena = (contrasena) => {
    if (!contrasena) {
        return 'La contraseña no puede estar vacía';
    }
    if (contrasena.length < 6) {
        return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
};

export const validarSeleccion = (id) => {
    if (!id) {
        return 'Debe seleccionar un tipo';
    }
    return null;
};