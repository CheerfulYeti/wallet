import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';

import { Response, DataText, Error } from './styled';

export default class ApiResponse extends Component {

  static propTypes = {
    asyncState: PropTypes.object
  }

  render() {
    const {asyncState} = this.props;

    return (
      <div>
        {
          (asyncState.needShowLoader) && <Loader />
        }

        <Response>
          {
            (asyncState.needShowData) &&
            ((this.props.children)
              ? this.props.children
              : <DataText>{ JSON.stringify(asyncState.data) }</DataText>)

          }

          {
            (asyncState.needShowError) && <Error>{asyncState.error.responseData}</Error>

          }
        </Response>
      </div>
    )
  }
};