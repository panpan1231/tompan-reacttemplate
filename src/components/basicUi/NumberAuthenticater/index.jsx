import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import style from "../dist/NumberAuthenticate.module.scss";
import AuthInfo from "../store/context";
import LinearButton from "../components/basicUi/button/LinearButton";
import { apiGetVcode, apiGetPhoneVcode } from "../apis/api";
import { useTranslation } from "react-i18next";
import BackspaceRoundedIcon from "@material-ui/icons/BackspaceRounded";
import massageHandler from "../components/basicUi/message";

// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     position: 'relative',
//   },
//   title: {
//     marginLeft: theme.spacing(2),
//     flex: 1,
//   },
// }));

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const NumberAuthenticate = (props) => {
  // const classes = useStyles();
  const { t } = useTranslation();
  let count = "";
  // const {open,mobile,closeDialog} = props;
  const [{ isOpen }, setState] = useState({
    isOpen: false,
  });
  const [validText, setValidText] = useState(t("register.getVcode"));
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [{ inputNumber }, setInputeNubmer] = useState({
    inputNumber: [],
  });
  const [{ randomArray, lastValue }, setRandomNumber] = useState({
    randomArray: [],
    lastValue: 0,
  });
  const [{ vcode }, setVcode] = useState({
    vcode: "",
  });

  const handleClickOpen = () => {
    setState({
      isOpen: true,
    });
    // setOpen(true);
  };
  const checkDisabled = () => {
    if (!buttonDisabled) {
      props.openDialog();
    }
  };
  const disabledPhone = () => {
    count = 60;
    if (!buttonDisabled) {
      let timer = setInterval(function () {
        if (count > 0) {
          count = count - 1;
          setValidText("00:" + count);
          setButtonDisabled(true);
          // odiv.innerHTML = count;
        } else {
          clearInterval(timer);
          setButtonDisabled(false);
          setValidText(t("register.getVcode"));
        }
      }, 1000);
    }
  };

  const handleClose = () => {
    setState({
      isOpen: false,
    });
    // setOpen(false);
  };
  // const test = {
  //   height: auto;
  //   bottom: 0px;
  //   position: absolute;
  // }
  const randomNumber = () => {
    // const {randomArray} = this.state;
    let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      i = nums.length,
      newArray = [],
      lastValue = 0;
    // debugger;
    while (i--) {
      let j = Math.floor(Math.random() * (i + 1));
      newArray.push(nums[j]);
      nums.splice(j, 1);
    }
    lastValue = newArray.pop();
    setRandomNumber((state) => ({
      // ...state,
      randomArray: newArray,
      lastValue: lastValue,
    }));
    console.log(randomArray);
  };
  const changeValue = (item) => {
    let nowValue = inputNumber === undefined ? [] : inputNumber;
    if (item !== "") {
      nowValue.push(item);
      // if(nowValue.length < 4) {
      setInputeNubmer((state) => ({
        inputNumber: nowValue,
      }));
      if (nowValue.length === 4) {
        getPhoneValidCode();
      }
    } else {
      let val = nowValue.length > 0 ? nowValue.pop() : "";
      setInputeNubmer((state) => ({
        inputNumber: nowValue,
      }));
    }
  };
  const getPhoneValidCode = () => {
    let vcodeForm = {
        mobile: props.mobile,
        token: vcode.token,
        vcode: inputNumber.join(""),
        lang: parseInt(window.localStorage.getItem("lang"), 10),
      },
      result = false;
    //disabledPhone();
    //props.closeDialog();
    window.emitter.emit("loading-start");
    apiGetPhoneVcode(vcodeForm)
      .then((res) => {
        // debugger;
        result = res.data.data;
        props.closeDialog();
        disabledPhone();
        massageHandler(t("normal.mailSended"), 1);
        window.emitter.emit("loading-end");
      })
      .catch((e) => {
        massageHandler(e, 2);
        window.emitter.emit("loading-end");
      });
  };
  const getVcode = () => {
    window.emitter.emit("loading-start");
    apiGetVcode({})
      .then((res) => {
        setVcode({
          vcode: res.data.data,
        });
        window.emitter.emit("loading-end");
      })
      .catch((e) => {
        massageHandler(e, 2);
        window.emitter.emit("loading-end");
      });
  };
  useEffect(() => {
    randomNumber();
    getVcode();
    setInputeNubmer((state) => ({
      inputNumber: [],
    }));
  }, [props.open]);
  return !props.open ? (
    <LinearButton title={validText} onClick={checkDisabled} />
  ) : (
    <div>
      <Dialog
        className={style.numberDialog}
        // fullScreen
        bottom
        open={props.open}
        onClose={(e) => {
          e.preventDefault();
          props.closeDialog();
          // setState({open: false});
          // setInputeNubmer((state) => ({
          //   inputNumber: '',
          // }));
          // randomNumber();
          // getVcode();
        }}
        PaperProps={{
          style: {
            maxWidth: "unset",
            width: "100%",
            position: "absolute",
            bottom: "0",
            margin: "0",
            borderRadius: "10px",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
          },
        }}
      >
        <List
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            {!!vcode ? (
              <img src={vcode.images} onClick={getVcode} alt="" />
            ) : null}
          </div>
          <div className={style.inputArea}>
            {inputNumber !== undefined && inputNumber.length > 0 ? (
              <input type="text" value={inputNumber[0]} readOnly />
            ) : (
              <input type="text" value="" readOnly />
            )}
            {inputNumber !== undefined && inputNumber.length > 1 ? (
              <input type="text" value={inputNumber[1]} readOnly />
            ) : (
              <input type="text" value="" readOnly />
            )}
            {inputNumber !== undefined && inputNumber.length > 2 ? (
              <input type="text" value={inputNumber[2]} readOnly />
            ) : (
              <input type="text" value="" readOnly />
            )}
            {inputNumber !== undefined && inputNumber.length > 3 ? (
              <input type="text" value={inputNumber[3]} readOnly />
            ) : (
              <input type="text" value="" readOnly />
            )}
          </div>
          <span className={style.desFont}>{t("normal.phoneVaild")}</span>
          <div className={style.btnArea}>
            {randomArray !== undefined
              ? randomArray.map(function (item, id) {
                  return (
                    <Button
                      key={id}
                      color="default"
                      onClick={() => changeValue(item)}
                    >
                      {item}
                    </Button>
                  );
                })
              : ""}
            <div className={style.btnBottom}>
              <Button
                className={style.lastBtn}
                color="default"
                onClick={() => changeValue(lastValue)}
              >
                {lastValue}
              </Button>
              <Button
                className={style.backBtn}
                color="default"
                onClick={() => changeValue("")}
              >
                <BackspaceRoundedIcon position="start"></BackspaceRoundedIcon>
              </Button>
            </div>
          </div>
        </List>
      </Dialog>
    </div>
  );
};

export default NumberAuthenticate;
