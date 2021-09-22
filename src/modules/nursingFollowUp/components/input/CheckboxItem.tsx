import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

export default function CheckboxItem(props: any) {

  return (
    <label>
      <div className="itemAnswer">
        <input
          type="checkbox"
          name={props.name}
          value={props.saveValue}
          checked={props.checked}
          onClick={props.event}
        />
        {props.value}
      </div>
    </label>
  )
}