import React, { useState, useEffect } from "react";
import PropType from "prop-types";
import "./style.scss";

const PoyueInput = (props) => {
  const {
    onChange,
    maxLength,
    id,
    type,
    label,
    errorMsg,
    placeholder,
    value,
    BottomLineMode,
    renderLeft,
    renderRight,
  } = props;
  const [inputValue, setInputValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const inputLeft = () => {
    return (
      <div className={renderLeft ? "p-ui__input-context-afert" : ""}>
        {renderLeft ? renderLeft() : ""}
      </div>
    );
  };
  const inputRight = () => {
    return (
      <div className={renderRight ? "p-ui__input-context-before" : ""}>
        {renderRight ? renderRight() : ""}
      </div>
    );
  };
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const changeHandler = (e) => {
    setInputValue(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };
  return (
    <>
      <div className="p-ui__input">
        <p>{label}</p>
        <div
          className={`
          p-ui__input-context ${BottomLineMode ? "bottom-line " : ""} ${
            isFocus ? "focus" : ""
          }
          `}
        >
          {renderLeft ? inputLeft() : <></>}
          <input
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              setIsFocus(false);
            }}
            type={type}
            id={id}
            value={inputValue}
            maxLength={maxLength}
            onChange={changeHandler}
            placeholder={placeholder}
            className={BottomLineMode ? "bottom-line" : ""}
          />
          {renderRight ? inputRight() : <></>}
        </div>
        <span className="p-ui-errormsg__input">{errorMsg}</span>
      </div>
    </>
  );
};

PoyueInput.propTypes = {
  onChange: PropType.func,
  maxLength: PropType.number,
  label: PropType.string,
  rules: PropType.arrayOf(PropType.func),
  errorMsg: PropType.any,
  placeholder: PropType.string,
  value: PropType.any,
  valueChange: PropType.func,
  BottomLineMode: PropType.any,
  renderLeft: PropType.func,
  renderRight: PropType.func,
};
PoyueInput.defaultProps = {};

export default PoyueInput;
