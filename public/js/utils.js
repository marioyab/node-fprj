//import { ConverteJSON } from '/controllers/ConverteJSON.js'

export const DateToStr = (data) => {
  let dt = (data == null || data == undefined)?new Date():data
  let dia = dt.getDate()
  let mes = dt.getMonth() +1
  let ano = dt.getFullYear()
  
  return (dia < 10?'0'+dia:dia) + '/' + (mes < 10?'0'+mes:mes) + '/' + ano
}

export const DateYMD = (data) => {
  let dt = data.value
  if(dt == "" || dt == undefined || dt == null) {
      let hoje = new Date()
      let dia = hoje.getDate()
      let mes = hoje.getMonth() +1
      dt = hoje.getFullYear() + '-' + (mes<10?'0'+mes:mes) + '-' + (dia < 10?'0'+dia:dia)
      data.value = dt
  }
}

export const RemoveMascara = (value) => {
    return value.replace(/[.\/-]/g,'') 
}

export function formatar(mask, number) {
    let valor = RemoveMascara(number)
    var s = ''+valor, r = '';
    for (var im=0, is = 0; im<mask.length && is<s.length; im++) {
      r += mask.charAt(im)=='#' ? s.charAt(is++) : mask.charAt(im);
    }
    return r;
 }    

//  export function ConverteFormJSON(formulario) {
//     const fd = new FormData(formulario)
//     return ConverteJSON(fd)
//  }