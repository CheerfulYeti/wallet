import React, { Component } from 'react';
import GenerateKeys from './GenerateKeys';
import ImportKeys from './ImportKeys';

class Keys extends Component {
  render() {
    return (
      <div>
        <GenerateKeys/>
        <ImportKeys/>
      </div>
    );
  }
}


export default Keys;