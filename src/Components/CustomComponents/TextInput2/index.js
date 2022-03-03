import React from "react";
import { Input, FormGroup, Label } from "reactstrap";

import PropTypes from "prop-types";

const TextInputIndex = ({
  inputType,
  onChange,
  onBlur,
  borderRadius,
  label,
  ...props
}) => {
  return (
    <div className="form-group row">
      {label ? (
        <Label className="col-sm-2 col-form-label">
          <span>{label || ""}</span>
        </Label>
      ) : null}

      <div className="col-sm-10">
        <Input
          {...props}
          type={inputType}
          onChange={onChange}
          onBlur={onBlur}
          className={borderRadius ? "" : "form-control-rounded"}
        />
      </div>
    </div>
  );
};
TextInputIndex.propTypes = {
  handleAction: PropTypes.func.isRequired,
  label: PropTypes.string,
  inputType: PropTypes.string.isRequired,
};
export default TextInputIndex;
