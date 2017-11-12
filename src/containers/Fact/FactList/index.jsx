import React, { Component } from 'react';
import FactListAccepted from 'containers/Fact/FactList/FactListAccepted';
import FactListUnAccepted from 'containers/Fact/FactList/FactListUnAccepted';

export default () => {
  return (
    <div>
      <FactListUnAccepted />
      <FactListAccepted />
    </div>
  )
};