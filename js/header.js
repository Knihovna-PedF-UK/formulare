// tenhle kód už nepoužíváme, hlavička je v tpl/header.html
window.addEventListener("load", (event) => {
  const header = document.getElementById("header")
  if(header){
    header.innerHTML = ``
  }
});
