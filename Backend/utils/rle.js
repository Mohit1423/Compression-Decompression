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

export const rleDecompressText = (compressed) => {
  let result = '';
  let i = 0;
  

  while (i < compressed.length) {
    let countStr = '';

    // Extract the number (could be multiple digits)
    while (i < compressed.length && !isNaN(compressed[i])) {
      countStr += compressed[i];
      i++;
    }

    const count = parseInt(countStr, 10);
    const char = compressed[i++]; // The character to repeat
    result += char.repeat(count);
  }

  return result;
};

// For binary files (compressed using `rleCompressBytes`)
export const rleDecompressBytes = (compressedBytes) => {
  const decompressed = [];

  for (let i = 0; i < compressedBytes.length; i += 2) {
    const count = compressedBytes[i];        // Number of times to repeat
    const value = compressedBytes[i + 1];    // Byte value to repeat

    for (let j = 0; j < count; j++) {
      decompressed.push(value);
    }
  }

  return Uint8Array.from(decompressed);
};
