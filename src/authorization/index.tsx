import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import useWebAuthn from "../hooks/useWebAuthn"

const Authorization = () => {
  const [username, setUsername] = useState<string>('')
  const navigate = useNavigate()
  const { login } = useAuth();
  const { authenticate } = useWebAuthn()

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const onSubmit = () => {
    login({ username: 'john', password: 'changeme' }, () => navigate('/dashboard'))
  }

  const onBiometry = () => {
    authenticate()
  }

  return (
    <div>
      <h1>Authentication</h1>
      <label htmlFor="username">Usuario</label>
      <input id="username" type="text" value={username} onChange={handleUsername} />
      <button onClick={onSubmit}>Login</button>
      <button onClick={onBiometry}>Biometria</button>
    </div>
  )
};

export default Authorization
