import { useState } from 'react'

function LoginForm ({ login }) {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  async function handleLogin (event) {
    event.preventDefault()

    try {
      await login({ username, password })

      setUsername(null)
      setPassword(null)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            name='username'
            id='username'
            value={username ?? ''}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password ?? ''}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
