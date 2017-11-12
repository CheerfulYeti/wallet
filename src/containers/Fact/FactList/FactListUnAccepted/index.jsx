import React, { Component } from 'react';
import { connect } from 'react-redux';
import async from 'reduxConfig/actions/async';
import appConstants from 'constants/app';
import { facts } from 'constants/texts';

import { FactListAccepted } from 'containers/Fact/FactList/FactListAccepted';

class FactListUnAccepted extends FactListAccepted {
  renderTitle() {
    return facts.NOT_ACCEPTED;
  }
}

function getApiRequest() {
  return async.methodList.event.getUnacceptedList;
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

export default connect(mapStateToProps, mapDispatchToProps)(FactListUnAccepted);