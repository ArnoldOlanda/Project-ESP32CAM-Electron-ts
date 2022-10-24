var CryptoJS = require("crypto-js");
export const AES_en = ( message: Object)=>{
  let ciphertext = algorithm(message);
  ciphertext = CryptoJS.AES.encrypt(ciphertext, 'esp-32-project').toString();
  return ciphertext;
}

export const AES_de = (message: any)=>{
    var bytes  = CryptoJS.AES.decrypt(message, 'esp-32-project');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return algorithm2(originalText)
}


export const algorithm =(val: any) => {
  let aux=JSON.stringify(val);
  let dist = aux.length % 27
  let temp=""
  aux.split("").map((e,i)=>{
      let pal = e.charCodeAt(0) + dist
      e = String.fromCharCode (pal)
      temp +=e
  })
  return temp
}

export const algorithm2 =(val: string) => {
  let dist = val.length % 27
  let temp=""
  val.split("").map((e,i)=>{
      let pal = e.charCodeAt(0) - dist
      e = String.fromCharCode (pal)
      temp +=e
  })
  return JSON.parse(temp)
}
