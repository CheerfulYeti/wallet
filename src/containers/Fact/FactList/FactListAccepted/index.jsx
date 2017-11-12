import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import async from 'reduxConfig/actions/async';
import Fact from 'components/Fact';
import appConstants from 'constants/app';
import { sha256 } from 'helpers/crypto';
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
        this.load();
      }
    }, 3000);
  };
  
  componentWillReceiveProps(props) {
  
  };
  
  render() {
    const { listState } = this.props;
    let list = listState.data;
    const newList = [];
    if (!Array.isArray(list)) {
      list = [
        // {
        //   signature: "grr",
        //   data: {
        //     title: 'fact 1',
        //     content: 'content 1',
        //     votes: 0,
        //   }
        // },
        // {
        //   signature: "Dwdw",
        //   data: {
        //     title: 'fact 2',
        //     content: 'content 2',
        //     votes: 99,
        //   }
        // },
      ];
    }
  
    list.forEach((item) => {
      newList.push({
        ...item,
        sighash: sha256(item.signature),
      });
    });
    return (
      <Container>
        <TitleStyled>{this.renderTitle()}</TitleStyled>
        {
          newList.length > 0
            ? this.renderList(newList)
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
      <ItemContainerStyled key={item.sighash}>
        <Fact title={item.data.title} content={item.data.content} hash={item.sighash} />
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
