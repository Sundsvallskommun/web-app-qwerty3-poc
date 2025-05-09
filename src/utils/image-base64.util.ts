export const base64ToBlob = (base64?: string) => {
  if (!base64) return null;

  const binaryString = atob(base64);

  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  if (bytes.buffer) {
    return new Blob([bytes.buffer]);
  } else {
    return null;
  }
};

export const fileTobase64 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
};
