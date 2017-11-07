import FileSaver from 'file-saver';

export const saveToFile = (fileName, data) => {
  console.log("point-1510081862704", fileName, data);
  let blob = new Blob([JSON.stringify(data)], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, fileName);
};