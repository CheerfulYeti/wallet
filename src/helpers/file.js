import FileSaver from 'file-saver';
import { guId } from 'helpers/common';

export const saveToFile = (fileName, data) => {
  let blob = new Blob([JSON.stringify(data)], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, fileName);
  console.log("point-1510392583360", FileSaver);
};


export function loadFromFile(target, callback) {
  if (!target || !target.files) {
    return null;
  }
  let files = target.files; // FileList object
  
  if (files.length > 0) {
    const blob = files[0];
  
    const token = guId();
    // Always create a new instance of FileReader every time.
    const reader = new FileReader();
  
    // Attach the token as a property to the FileReader Object.
    reader.token = token;
  
    reader.onerror = function (event) {
      console.error(new Error(event.target.error.code).stack);
    };
  
    reader.onloadend = function (evt) {
      // The reader operation is complete.
      // Now we can retrieve the unique token associated
      // with this instance of FileReader.
      callback(this.result, this.token);
    };
    reader.readAsText(blob, 'UTF-8');
  }
}