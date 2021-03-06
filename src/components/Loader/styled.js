import styled from 'styled-components';
import icon from './ripple.svg';

export const Loader = styled.div`
  idth: 50px;
  height: 50px;
`;

export const ImageContainer = styled.div`
  background-image: url(${icon});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  
  width: 100%;
  height: 100%;
`;