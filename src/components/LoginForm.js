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
    <div className='loginform'>
      <h2 className='loginform-title'>log in to application</h2>
      <form className='loginform-form' onSubmit={handleLogin}>
        <div className='loginform-form-item loginform-form-username'>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            name='username'
            id='username'
            value={username ?? ''}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className='loginform-form-item loginform-form-password'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password ?? ''}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className='loginform-form-submit'>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
