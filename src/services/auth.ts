class AuthService {
  apiUrl: any;

  constructor() {
    // this.apiKey = process.env.REACT_APP_API_KEY;
    // this.apiUrl = `${process.env.REACT_APP_API_URL}/api/${process.env.REACT_APP_API_VERSION}`;
    this.apiUrl = 'http://localhost:5000';
  }

  async login(data: { username: string; password: string }) {
    const response = await fetch(`${this.apiUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'include'
    });

    return await response.json();
  }

  async authnRegister(token: string, data: any) {
    const response = await fetch(`${this.apiUrl}/authn/register`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })
    
    return await response.json()
  }

  async authnRegistrationOptions(token: string) {
    const response = await fetch(`${this.apiUrl}/authn/registration-options`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        authorization: `Bearer ${token}`
      },
      credentials: 'include',
    })
    
    return await response.json()
  }

  async authnAuthenticate(token: string, data: any) {
    const response = await fetch(`${this.apiUrl}/authn/authenticate`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })
    
    return await response.json()
  }

  async authnAuthenticateOptions(token: string) {
    const response = await fetch(`${this.apiUrl}/authn/authenticate-options`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        authorization: `Bearer ${token}`
      },
      credentials: 'include',
    })
    
    return await response.json()
  }
}

export default new AuthService();