let createCopy = (copyValue) => {
  let r = document.createRange();
  let textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = "copyInput";
  textInput.value = copyValue;
  textInput.style.opacity = "0";
  document.body.appendChild(textInput);
  r.selectNode(document.getElementById("copyInput"));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  textInput.remove();
};

export default createCopy;
