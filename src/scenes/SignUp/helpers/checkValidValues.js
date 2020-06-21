const emailRegex = /^\S+@\S+\.\S+$/;

const validations = {
  name: v => v.length !== 0 ? '' : 'sign_up_validation_name',
  email: v => emailRegex.test(v) ? '' : 'sign_up_validation_email',
  password: (v, values) => values.password === values.confirmPassword ? '' : 'sign_up_validation_password',
}

export default (name, value, values) => {
  return validations[name](value, values);
}