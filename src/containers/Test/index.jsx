import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Form from './Form';
import SaveDataToFile from './SaveDataToFile';
import GenerateKeys from './GenerateKeys';
import ImportKeys from './ImportKeys';
import Keys from './Keys';
import styled from 'styled-components';

const list = {
  Form,
  SaveDataToFile,
  GenerateKeys,
  ImportKeys,
  Keys,
};

export const GoBack = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
`;

const getComponent = () => {
  if (window.location.search) {
    let params = {};
    window.location.search.split('?')[1].split('&').forEach(function (pair) {
      pair = (pair + '=').split('=').map(decodeURIComponent);
      if (pair[0].length) {
        params[pair[0]] = pair[1];
      }
    });
    return params['component']
  }
  return null;
};

class Test extends Component {
  render() {
    const { pathname } = document.location;
    let name = getComponent();

    if (name) {
      if (list[name]) {
        const Component = list[name];
        return (
          <div>
            <GoBack>
              <Link to={pathname}>GoBack</Link>
            </GoBack>
            <Component/>
          </div>
        );
      } else {
        console.warn(`Unknown component ${name}`);
      }
    }
    
    return (
      <div>
        {
          Object.keys(list).map((name, key) => (
            <div key={key}>
              <Link to={`${pathname}?component=${name}`}>{name}</Link>
            </div>
          ))
        }
      </div>
    );
  }
}


export default Test;