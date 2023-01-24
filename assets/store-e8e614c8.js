const o=(e,t)=>{t==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))},r=(e,t)=>{const s=localStorage.getItem(e);return s!==null?JSON.parse(s):t};export{r as g,o as s};
