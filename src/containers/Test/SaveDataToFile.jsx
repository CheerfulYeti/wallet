import React, { Component } from 'react';
import FileSaver from 'file-saver';

class SaveDataToFile extends Component {
  render() {
    return (
      <div>
        <button onClick={this.onClick}>Create file</button>
      </div>
    );
  }
  
  onClick = () => {
    let text = "3232";
    let filename = "proveit.keys";
    let blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename);
  }
}


export default SaveDataToFile;