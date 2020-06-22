export const passwordLength = password => password.length > 6 ? '' : 'sign_up_password_length_validation';

const emailRegex = /^\S+@\S+\.\S+$/;
export const emailComposition =  email => emailRegex.test(email) ? '' : 'sign_up_validation_email';

export const nameComposition = name => name.length !== 0 ? '' : 'sign_up_validation_name';