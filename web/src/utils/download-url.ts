export const downloadUrl = (url: string) => {
  const link = document.createElement("a");

  const urlObj = new URL(url);
  const filename = urlObj.pathname.split("/").pop();

  if (!filename) {
    throw new Error("Invalid filename");
  }

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
