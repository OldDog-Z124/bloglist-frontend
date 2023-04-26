function Message ({ text, type }) {
  const style = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    maxWidth: '500px',
    padding: '10px',
    border: `2px solid ${type === 'error' ? 'red' : 'green'}`,
    borderRadius: '4px',
    backgroundColor: '#fff'
  }

  if (!text) {
    return
  }
  return (
    <div style={style}>
      <p>{text}</p>
    </div>
  )
}

export default Message
