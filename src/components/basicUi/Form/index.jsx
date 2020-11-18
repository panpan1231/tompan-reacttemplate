import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import PropType from "prop-types";
import "./style.scss";

let GlobalFormData = {};
let validFunctions = {};

const Item = (props) => {
  const { value, rules, name, onError } = props;
  const [childError, setChildError] = useState("");
  const [nowValue, setNowValue] = useState(value);
  const [errorTrigger, setErrorTrigger] = useState(false);
  let onChange = props.children.props.onChange;
  const childValueChange = (child) => {
    let childValue = "";
    if (onChange) {
      onChange(child);
    }
    if (child && child.target) {
      childValue = child.target.value;
    } else if (child || child === 0) {
      childValue = child;
    }

    GlobalFormData[name] = childValue;

    // console.log(nowValue, childValue);
    setNowValue(childValue);
    valueValidation(childValue);
  };

  const valueValidation = (v) => {
    if (rules) {
      let errorMsg = rules.find((rule) => typeof rule(v) == "string");

      setChildError(errorMsg ? errorMsg(v) : "");

      if (errorMsg) {
        setErrorTrigger(!errorTrigger);
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  useEffect(() => {
    validFunctions[name] = () => valueValidation(nowValue);

    GlobalFormData[name] = value;
  }, []);
  useEffect(() => {
    if (onError && childError) {
      onError(childError);
    }
  }, [childError, errorTrigger]);
  useEffect(() => {
    setNowValue(value);
  }, [value]);
  useEffect(() => {
    validFunctions[name] = () => valueValidation(nowValue);
    GlobalFormData[name] = nowValue;
  }, [nowValue]);

  const cloneChildren = React.cloneElement(props.children, {
    value: nowValue,
    onChange: childValueChange,
    errorMsg: childError,
  });

  return <>{cloneChildren}</>;
};

const Form = forwardRef((props, ref) => {
  const { initValues } = props;
  const [nowInitValues, setNowInitValues] = useState(initValues);

  useEffect(() => {
    return () => {
      GlobalFormData = {};
      validFunctions = {};
    };
  }, []);

  useImperativeHandle(ref, () => ({
    validationForm: () => {
      let isValid = true;

      Object.keys(validFunctions).forEach((key) => {
        if (!validFunctions[key]()) {
          isValid = false;
        }
      });

      return isValid ? GlobalFormData : false;
    },
    reloadForm: () => {
      setNowInitValues(initValues);
    },
  }));

  const formItemHandler = (child, index) => {
    let childProps = {};
    childProps.key = index;
    if (child.type.isForm && child.props.name && nowInitValues) {
      childProps.value = nowInitValues[child.props.name];
    }

    let propsInChildren = React.cloneElement(child, {
      ...childProps,
    });

    return propsInChildren;
  };

  const renderChild = () => {
    if (props.children) {
      return props.children.map((child, index) => {
        return formItemHandler(child, index);
      });
    } else {
      return <></>;
    }
  };

  return <>{renderChild()}</>;
});
Item.isForm = true;

Item.propTypes = {
  rules: PropType.arrayOf(PropType.func),
  value: PropType.any,
  name: PropType.string,
  lazy: PropType.bool,
  onError: PropType.func,
};
Item.defaultProps = {
  lazy: false,
};

Form.Item = Item;
Form.propType = {
  initValues: PropType.object,
};
export default Form;
