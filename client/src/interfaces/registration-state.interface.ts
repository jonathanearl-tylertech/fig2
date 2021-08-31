export default interface IRegistrationState {
  fields: {
      email: string;
      username: string;
      password: string;
      passwordVerification: string;
  };
  errors: {
      email: string;
      username: string;
      password: string;
      passwordVerification: string;
  };
  isFormEnabled: boolean;
  passwordHelperText: string;
}