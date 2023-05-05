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
    <div className='togglable'>
      <div id='hide' className='togglable-container' style={hideStyle}>
        <button className='togglable-show togglable-button' onClick={show}>{buttonLabel}</button>
      </div>
      <div id='show' className='togglable-container' style={showStyle}>
        <div className='togglable-main'>
          {children}
        </div>
        <div className='togglable-footer'>
          <button className='togglable-hide togglable-button' onClick={hide}>cancel</button>
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
