import ProfileDto from "../dtos/profile.dto";

class RegistrationService {
  baseUrl = 'http://localhost:5000/registration'
  digitRegex = /\d/;
  specialCharacterRegex = /[!@#$%^&*]/;
  lowerCaseRegex = /(?=.*[a-z])/;
  upperCaseRegex = /(?=.*[A-Z])/;
  minLength = 8;
  
  validatePassword(password: string): string {
    if (!this.digitRegex.test(password)) {
      return 'atleast one digit 0-9';
    }
    if (!this.specialCharacterRegex.test(password)) {
      return 'atleast special character !@#$%^&*';
    }
    if (!this.lowerCaseRegex.test(password)) {
      return 'atleast lowercase character a-z';
    }
    if (!this.upperCaseRegex.test(password)) {
      return 'atleast uppercase character A-Z';
    }
    if (password.length < this.minLength) {
      return 'length must be > 8'
    }
    return '';
  }

  async validateEmail(email: string): Promise<string> {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      }
    };
    const response = await fetch(`${this.baseUrl}/validate/email/${email}`, requestInit);
    if (response.ok) {
      return '';
    }
    const data = await response.json();
    return data.message[0];
  }

  async validateUsername(username: string): Promise<string> {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      }
    };
    const response = await fetch(`${this.baseUrl}/validate/username/${username}`, requestInit);
    if (response.ok) {
      return '';
    }
    const data = await response.json();
    return data.message[0];
  }

  async registerUser(user: any): Promise<ProfileDto> {
    const requestInit: RequestInit = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      }
    };
    const response = await fetch(`${this.baseUrl}/user`, requestInit);
    return await response.json();
  }
}

export default new RegistrationService();