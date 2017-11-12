import React, { Component } from 'react';
import { connect } from 'react-redux';
import FactListAccepted from 'containers/Fact/FactList/FactListAccepted';
import FactListUnAccepted from 'containers/Fact/FactList/FactListUnAccepted';

import FactAdd from 'containers/Fact/FactAdd';
import AccountInfo from './AccountInfo';
import Transfer from './Transfer';
import { Container } from './styled';
import { Tabs, Tab } from 'material-ui/Tabs';

const mapStateToProps = function () {
  return {
  };
};

class Profile extends Component {

  static propTypes = {};

  static defaultProps = {};

  componentWillReceiveProps(props) {

  };

  componentWillMount() {

  };

  render() {
    const { history } = this.props;

    return (
      <Container>
        <TabsComponent history={history}/>
      </Container>
    )
  };
}

const TabsComponent = (props) => (
  <Tabs>
    <Tab label="Account & transfer" >
      <AccountInfo />
      <Transfer />
    </Tab>
    <Tab label="Add fact" >
      <FactAdd history={props.history}/>
    </Tab>
    <Tab label="FactList" >
      <FactListUnAccepted history={props.history}/>
      <FactListAccepted history={props.history}/>
    </Tab>
  </Tabs>
);

export default connect(mapStateToProps)(Profile);
