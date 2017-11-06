import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';

import './styles.scss';

export default class AsyncBlock extends Component {
  
  static propTypes = {
    asyncState: PropTypes.object,
    className: PropTypes.string,
  };
  
  render() {
    const {asyncState} = this.props;
    const className = (this.props.className)
      ? this.props.className
      : "component-async-block";
    
    return (
      <div className={className}>
        
        {
          (asyncState.needShowLoader) && <Loader/>
        }
        
        <div className="response">
          
          {
            (asyncState.needShowData) &&
            ((this.props.children)
              ? this.props.children
              : <div className="data-text">{JSON.stringify(asyncState.data)}</div>)
            
          }
          
          {
            (asyncState.needShowError) && <div className="error">{asyncState.error.responseData}</div>
            
          }
        
        </div>
      
      </div>
    )
  }
};