import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
} from "react";

const FileBox = (props, ref) => {
  const inputRef = useRef(null);
  const { onChange, value } = props;
  const [fileValue, setFileValue] = useState("");
  useImperativeHandle(ref, () => ({
    inputRef: inputRef.current,
    click: () => {
      inputRef.current.click();
    },
    reset: () => {
      onChange(null);
    },
  }));
  const changeHandler = (e) => {
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <div value={value}>
      <input
        {...props}
        type="file"
        ref={inputRef}
        onChange={changeHandler}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default forwardRef(FileBox);
