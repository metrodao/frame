import React, { useState } from 'react'

const findIndex = (options, value) => {
  const index = options.findIndex((option) => option.value === value)
  return index >= 0 ? index : null
}

const Dropdown = ({ options, initialValue, style, className, onChange }) => {
  // Hooks
  const [index, setIndex] = useState(findIndex(options, initialValue) || 0) // default
  const [expanded, setExpanded] = useState(false)

  // Style calculations
  const height = (options.length * 26) + 'px'
  const marginTop = (-26 * index) + 'px'

  // Callback: handle select item
  const handleSelect = (newIndex) => {
    // Trigger only on selecting new item
    if (newIndex !== index) {
      // Return new value
      onChange(options[newIndex].value)
      // Update state
      setIndex(newIndex)
    }
  }

  // JSX
  return (
    <div
      className={expanded ? `dropdown dropdownExpanded ${className}` : `dropdown ${className}`}
      style={expanded ? { ...style, height } : { ...style }}
      onMouseDown={(e) => { setExpanded(!expanded) }}
    >
      <div className='dropdownItems' style={expanded ? {} : { marginTop }}>
        { options.map((option, index) => {
          return <div className='dropdownItem' onMouseDown={() => handleSelect(index)}>{ option.text }</div>
        })}
      </div>
    </div>
  )
}

export default Dropdown
