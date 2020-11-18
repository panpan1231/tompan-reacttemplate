import React, { useState, useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import useLocalStorage from "../../store/useLocalStorage";
import i18next from "i18next";
// import { Lang } from "../../store/context";
import ContextHandler, { LangContext } from "../../../src/context";
import SvgIcon from '@material-ui/core/SvgIcon';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
/*
props:

title

ItemList

err:onclick
*/
const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(2),
    minWidth: 120,
    width: '100%',
    position: 'relative',
    marginBottom: '18px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function LanguageSelect({
  title = "未設定",
  ItemList = [1, 2, 3],
  defaultSelect = null,
}) {
  const classes = useStyles();
  const {t} = useTranslation();  
  // const [lang, setLang] = useLocalStorage("lang");
  const Lang = useContext(LangContext);
  let [chooseLang, setLang] = useState(1);
  // let chooseLang = "";
  const changeLang = (lang) => {
    Lang.CHANG_LANG(lang.id);
    chooseLang = lang.name;
    // let langName = Lang.GET_LANG == 1 ? "Zh" : "En";
    // i18next.changeLanguage(langName, (err, t) => {
    //   if (err) return console.log("something went wrong loading", err);
    //   t("key"); // -> same as i18next.t
    // });
  };
  useEffect(() => {
    setLang(Lang.langList[Lang.GET_LANG()-1].name);
    // chooseLang = 
  }, [Lang]);

  return (
    <ContextHandler>
      {/* <Lang.Provider value={lang}> */}
        <FormControl className={classes.formControl}style={{borderBottom: '.3px solid white'}}>
        <SvgIcon className="MuiSvgIcon-root MuiSelect-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
          <ExpandMoreRoundedIcon style={{color:'white',opacity:'.3'}}></ExpandMoreRoundedIcon>
        </SvgIcon>

          <LanguageRoundedIcon 
            style={{
              position: "absolute",
              top: "3px",
              opacity: ".6",
              
            }} 
            position="start"
          />
          
          <Select
          IconComponent="display"
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            // placeholder="语系"
            value={chooseLang}//t('setting.English')
            style={{
              paddingLeft: "2.4rem",
              color: "white",
            }}
            // value={age}
            // onChange={handleChange}
            renderValue={(value) => `${value}`}
          >
            
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            {Lang.langList.map((item,index) => (
              <MenuItem onClick={ () => changeLang(item)} value={item.name} key={item.id}>{item.name}</MenuItem>
            ))}
            {/* <MenuItem onClick={ () => changeLang(1)} value={t('setting.China')}>{t('setting.China')}</MenuItem>
            <MenuItem onClick={ () => changeLang(2)} value={t('setting.English')}>{t('setting.English')}</MenuItem> */}
            {/* <MenuItem onClick={ () => changeLang(3)} value={t('setting.Indonesian')}>{t('setting.Indonesian')}</MenuItem> */}
            
          </Select>
          {/* <FormHelperText>Error</FormHelperText> */}
        </FormControl>
      {/* </Lang.Provider> */}
    </ContextHandler>
  );
}

Select.prototype = {
  title: PropTypes.string,
  ItemList: PropTypes.array,
};
