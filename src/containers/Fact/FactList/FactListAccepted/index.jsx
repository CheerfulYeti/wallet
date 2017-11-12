import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import async from 'reduxConfig/actions/async';
import AsyncBlock from 'components/AsyncBlock';
import appConstants from 'constants/app';
import { facts } from 'constants/texts';

import { Container, TitleStyled, ItemContainerStyled } from './styled';

export class FactListAccepted extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    accepted: PropTypes.bool,
  };
  
  static defaultProps = {
    accepted: false,
  };
  
  componentWillMount() {
    this.load();
  };
  
  load = () => {
    this.props.load();
    setTimeout(() => {
      if (!this.props.listState.needShowError) {
        // this.load();
      }
    }, 3000);
  };
  
  componentWillReceiveProps(props) {
  
  };
  
  render() {
    const { listState } = this.props;
    let list = listState.data;
    if (!Array.isArray(list)) {
      list = [
        {
          title: 'fact 1',
          content: 'content 1',
          votes: 0,
        },
        {
          title: 'fact 2',
          content: 'content 2',
          votes: 99,
        },
      ];
    }
    return (
      <Container>
        <TitleStyled>{this.renderTitle()}</TitleStyled>
        {
          list.length > 0
            ? this.renderList(list)
            : this.renderEmptyList()
        }
      </Container>
    );
  };
  
  renderTitle() {
    return facts.ACCEPTED;
  }
  
  renderEmptyList = () => {
    return facts.EMPTY_LIST;
  };
  
  renderList = (list) => {
    return  list.map((item, key) => this.renderItem(item, key));
  };
  
  renderItem = (item, key) => {
    return (
      <ItemContainerStyled key={key}>
        {item.title} {FactListAccepted.renderAddVote(item, key)}
      </ItemContainerStyled>
    );
  };
  
  static renderAddVote(item, key) {
    return null;
  }
  
  getApiList() {
    return async.methodList.event.getAcceptedList;
  }
}

function getApiRequest() {
  return async.methodList.event.getAcceptedList;
}

const mapStateToProps = function (state) {
  const apiObject = getApiRequest();
  return {
    listState: async.getStoreState(state, apiObject.alias),
  };
};

const mapDispatchToProps = (dispatch) => {
  const apiObject = getApiRequest();
  return {
    load: () => {
      dispatch(async.load(apiObject.alias, {type: appConstants.eventTypeList.FACT}));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FactListAccepted);
