import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(null)

  function hide () {
    setVisible(false)
  }
  function show () {
    setVisible(true)
  }

  useImperativeHandle(refs, () => {
    return {
      hide
    }
  })

  const hideStyle = {
    display: visible ? 'none' : ''
  }
  const showStyle = {
    display: visible ? '' : 'none'
  }

  return (
    <div>
      <div id='hide' style={hideStyle}>
        <button onClick={show}>{buttonLabel}</button>
      </div>
      <div id='show' style={showStyle}>
        <div>
          {children}
        </div>
        <div>
          <button onClick={hide}>cancel</button>
        </div>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
