let params = () => {
  if (!!window.location.search) {
    let urlParam = window.location.search.split("?")[1].split("&");
    let allParam = {};
    urlParam.forEach((item) => {
      let key = item.split("=")[0];
      let value = decodeURI(item.split("=")[1]);
      allParam[key] = value;
    });
    // console.log(allParam);
    return allParam;
  }
};

export default params;
