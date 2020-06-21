export default (validationValues) => {
  return validationValues.name === '' && validationValues.email === '' && validationValues.password === '';
}