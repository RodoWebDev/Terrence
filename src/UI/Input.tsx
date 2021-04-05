import styled from 'styled-components';

export const InputBox = styled.input`
  padding: 15px;
  margin: 10px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  min-width: 350px;  
  &.addCycle-modal__input {
    min-width: 170px;
    width: calc(100% - 30px);
    padding: 20px 15px;
    margin: 0px;
  }
  @media (max-width: 425px) {
    padding: 10px;
    min-width: unset;
    width: 232px;
  }
`;

export const Textarea = styled.textarea`
  padding: 15px;
  margin: 10px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  min-width: 350px;  
  &.addCycle-modal__input {
    min-width: 170px;
    width: calc(100% - 30px);
    padding: 20px 15px;
    margin: 0px;
  }
  @media (max-width: 425px) {
    padding: 10px;
    min-width: unset;
    width: 232px;
  }
`;
