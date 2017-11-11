import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CircularProgress from 'material-ui/CircularProgress';
import Loader from 'components/Loader';

import './styles.scss';

export default class AsyncBlock extends Component {
  static propTypes = {
    asyncState: PropTypes.object,
    className: PropTypes.string,
    renderData: PropTypes.func,
  };
  
  static defaultProps = {
    asyncState: {},
    className: '',
    renderData: () => {},
    renderError: () => {},
  };
  
  render() {
    const {asyncState} = this.props;
    const className = (this.props.className)
      ? this.props.className
      : "component-async-block";
    
    return (
      <div className={className}>
        {
          (asyncState.needShowLoader)
          &&
          <div className="loader-component">
            <CircularProgress/>
          </div>
        }
        {
          this.props.children
        }
        <div className="response">
          {
            (asyncState.needShowData) && this.props.renderData()
          }
          
          {
            (asyncState.needShowError)
            &&
            this.props.renderError()
          }
        </div>
      
      </div>
    )
  }
};