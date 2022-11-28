import useWebAuthn from "../hooks/useWebAuthn"

const Dashboard = () => {
  const { authenticate, register } = useWebAuthn()


  return (
    <div>
      <p>Seja bem vindo, </p>
      <button>Logout</button>
      <button onClick={register}>RegisterCredential</button>
      <button onClick={authenticate}>Authenticate</button>
    </div>
  )
}

export default Dashboard
