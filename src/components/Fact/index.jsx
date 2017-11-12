import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Vote from 'containers/Vote';

export const Fact = ({ title, content, hash }) => (
  <Card>
    <CardHeader
      title={title}
      subtitle="To vote or not to vote"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
      <Vote hash={hash} />
    </CardActions>
    <CardText expandable={true}>
      {content}
    </CardText>
  </Card>
);

Fact.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  hash: PropTypes.string.isRequired,
};
Fact.defaultProps = {
  title: 'London is the capital of Great Britain',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
  '      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.\n' +
  '      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.\n' +
  '      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
};

export default Fact;
