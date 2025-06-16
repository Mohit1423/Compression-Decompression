export const rleCompress = (text)=>{
  let result = '';
  let count = 1;

  for (let i = 1; i <= text.length; i++) {
    if (text[i] === text[i - 1]) {
      count++;
    } else {
      result += count + text[i - 1];
      count = 1;
    }
  }

  return result;
}



export const rleCompressBytes = (byteArray)=>{
   
  const result = [];

  let count = 1;

  for (let i = 1; i <= byteArray.length; i++) {
    if (byteArray[i] === byteArray[i - 1] && count < 255) {
      count++;
    } else {
      result.push(count, byteArray[i - 1]);
      count = 1;
    }
  }

  return Uint8Array.from(result);


}