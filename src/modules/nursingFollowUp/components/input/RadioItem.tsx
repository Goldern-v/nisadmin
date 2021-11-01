import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

export default function RadioItem(props: any) {
  return (
    <div className="itemAnswer">
      <label>
        <input type="radio"
          name={props.name}
          disabled={props.disabled}
          value={props.saveValue}
          checked={props.checked}
          data-checked={props.checked || false}
          onClick={props.event}
        />{props.value}
      </label>
    </div>
  )
}