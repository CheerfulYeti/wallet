import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Form from './Form';
import SaveDataToFile from './SaveDataToFile';
import styled from 'styled-components';

const list = {
  Form,
  SaveDataToFile,
};

export const GoBack = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
`;

class Test extends Component {
  render() {
    const { pathname } = document.location;
    let params = (new URL(document.location)).searchParams;
    let name = params.get("component");
    
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