const validationMessages = {
  requiredMsg: 'Este campo es obligatorio.',
  invalidMsg: 'El valor ingresado no es válido.',
  minCharactersMsg: (n: number) => `Debe tener al menos ${n} caracteres.`,
  password: {
    minCharactersMsg: (n: number) => `La contraseña debe tener al menos ${n} caracteres.`
  },
  email: {
    invalidMsg: 'El formato del correo no es válido.'
  }
};

export default validationMessages;
