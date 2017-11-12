import React, { Component } from 'react';
import { connect } from 'react-redux';
// import store from 'reduxConfig/store';
// import Actions from 'reduxConfig/actions/`FactAdd`Actions';
import Form from './Form';
import async from 'reduxConfig/actions/async';

import { Container } from './styled';

class FactAdd extends Component {

  static propTypes = {};

  static defaultProps = {};

  componentWillReceiveProps(props) {

  };

  componentWillMount() {

  };

  render() {
    return (
      <Container>
        <Form
          handleSubmit={this.handleConfirm}
          onLoadFile={this.handleLoadFile}
          // asyncError={error}
        />
      </Container>
    )
  };

  handleConfirm = (e) => {
    e.preventDefault(e);
    const { form: { values = {} } } = this.props;

    this.props.addFact({
      commission: parseFloat(values.commission),
      title: values.title,
      content: values.content,
    });
  }
};

const mapStateToProps = function (state) {
  return {
    addFact: async.getStoreState(state, async.methodList.event.add.alias),
    form: state.form['addFact'],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFact: (params) => {
      dispatch(async.load(async.methodList.event.add.alias, {
        ...params,
        type: 1,
      }));
    },

    setError: (error) => {
      dispatch(async.actions.fail({
        method: async.methodList.account.getInfo.alias,
        data: error,
      }))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FactAdd);
