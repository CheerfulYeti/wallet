import React, { Component } from 'react';
import { connect } from 'react-redux';
import FactList from 'containers/Fact/FactList';
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
    <Tab label="FactList">
      <FactList history={props.history}/>
    </Tab>
  </Tabs>
);

export default connect(mapStateToProps)(Profile);
