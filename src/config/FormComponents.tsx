import React from "react"

export function TextInput(props: {
  label: string
  value: string
  setValue: (value: string) => void
  extra?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}) {
  return (
    <div className="input-container ic1">
      <input
        className="input"
        type="text"
        placeholder=" "
        value={props.value}
        pattern="[\d]"
        onChange={(e) => props.setValue(e.target.value)}
        {...(props.extra || {})}
      />
      <div className="cut"  style={{ width: "5.5em" }}></div>
      <label className="label-placeholder">{props.label}</label>
    </div>
  )
}

export function SelectOption(props: { setValue: (value: string) => void }) {
  return (
    <div className="input-container ic1">
      <select title="Program" className="input" onChange={(e) => props.setValue(e.target.value)}>
        <option value="MAC Summer 22">MAC Summer 22</option>
        <option value="MAC Fall 22">MAC Fall 22</option>
        <option value="MAC Winter 23">MAC Winter 23</option>
        <option value="Undergrad">Undergrad</option>
        <option value="Phd">Phd</option>
      </select>
      <div className="cut" style={{ width: "6.5em" }}></div>
      <label className="label-placeholder">{"Your Program"}</label>
    </div>
  )
}
