import React, { Component } from "react";
import { InputGroup, Input, FormFeedback } from "reactstrap";

export default class InputText extends Component {
  render() {
    const {
      type,
      placeholder,
      onChange,
      value,
      icon,
      disabled,
      name,
      className,
      invalid,
      feedback
    } = this.props;
    return (
      <InputGroup className={className}>
        <div className="input-group-prepend">
          <span className="input-group-text">{icon}</span>
        </div>
        <Input
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          invalid={invalid}
        />
        <FormFeedback>{feedback}</FormFeedback>
      </InputGroup>
    );
  }
}
