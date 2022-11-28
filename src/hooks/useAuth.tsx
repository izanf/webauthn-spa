import React, { createContext, useState, useContext } from 'react';

import authService from '../services/auth';

type AuthType = {
  token: string;
  username: string;
}

interface IAuthContext {
  auth: AuthType,
  login: ({ username, password}: { username: string, password: string }, callback: () => void) => void;
}

const DEFAULT_PROPS = {
  auth: { token: '', username: '' },
  login: () => null
};

export const AuthContext = createContext<IAuthContext>(DEFAULT_PROPS);

export const AuthContextProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthType>(DEFAULT_PROPS.auth);

  const login = async ({ username, password}: { username: string, password: string }, callback: () => void) => {
    try {
      const response = await authService.login({ username, password });

      setAuth({ username, token: response.access_token });

      window.setTimeout(() => callback(), 300)

      return response;
    } catch (error) {
      if (typeof error === "string") {
        throw new Error(error.toUpperCase());
      } else if (error instanceof Error) {
        console.error(error);
      }

      return [];
    }
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
