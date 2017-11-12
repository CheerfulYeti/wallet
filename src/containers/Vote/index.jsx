import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from 'redux-form-material-ui';

// import store from 'reduxConfig/store';
// import Actions from 'reduxConfig/actions/`FactAdd`Actions';
import Form from './Form';
import async from 'reduxConfig/actions/async';

import { Container, Button } from './styled';
import {
  required,
  positiveNumber,
} from 'validation/fields';

class Vote extends Component {

  state = {
    vote: null,
    commission: 0,
  };

  static propTypes = {
    hash: PropTypes.string.isRequired,
  };

  componentWillReceiveProps(props) {

  };

  componentWillMount() {

  };

  render() {
    const { commission } = this.state;

    return (
      <Container>
        <Button primary label="True" onClick={() => this.handleVote(true)}/>
        <Button secondary label="False" onClick={() => this.handleVote(false)}/>
        <TextField
          name={'commission'}
          type={'number'}
          required
          floatingLabelText={'Commission'}
          onChange={this.handleSetCommission}
          validate={[required, positiveNumber]}
        />
      </Container>
    )
  };

  handleSetCommission = (e) => {
    console.log('handleSetCommission: ', e.target.value);
    this.setState({
      commission: e.target.value,
    });
  }

  handleVote = (value) => {
    const { commission } = this.state;

    this.props.vote({
      commission: parseFloat(commission),
      voteEventSighash: this.props.hash,
      vote: Boolean(value),
    });
  }
};

const mapStateToProps = function (state, ownProps) {
  return {
    voteFact: async.getStoreState(state, async.methodList.event.vote.alias),
    form: state.form[`voteFact_${ownProps.hash}`],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    vote: (params) => {
      dispatch(async.load(async.methodList.event.vote.alias, {
        ...params,
        type: 3,
      }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
