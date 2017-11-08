import styled from 'styled-components';
import { Field } from 'redux-form';

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  
  margin: 0 auto; 
`;

export const FieldStyled = styled(Field)`
  margin-bottom: 30px;
`;