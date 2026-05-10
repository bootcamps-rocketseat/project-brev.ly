export const formatUrl = (url: string) => {
  const urlFormated = url.split("/").reverse()[0];

  return urlFormated;
};
