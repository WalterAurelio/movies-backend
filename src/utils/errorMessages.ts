export const ERROR_MESSAGES = {
  USER: {
    NOT_FOUND: 'El usuario no fue encontrado.',
    ALREADY_EXISTS: 'Ya existe un usuario registrado con este correo electrónico.',
    INVALID_CREDENTIALS: 'Credenciales inválidas.'
  },
  DB: {
    CONNECTION_FAILED: 'Error al conectar con la base de datos.'
  },
  VALIDATION: {
    USERNAME_REQUIRED: 'El nombre de usuario es obligatorio.',
    USERNAME_MIN: 'El nombre de usuario debe tener al menos 4 caracteres.',
    EMAIL_REQUIRED: 'El correo electrónico es obligatorio',
    EMAIL_INVALID: 'El correo electrónico no tiene un formato válido.',
    PASSWORD_REQUIRED: 'La contraseña es obligatoria.',
    PASSWORD_MIN: 'La contraseña debe tener al menos 8 caracteres.'
  },
  GENERAL: {
    UNKNOWN: 'Ha ocurrido un error inesperado.'
  }
};