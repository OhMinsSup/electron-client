import styled from 'styled-components';
import palette from '../../libs/styles/palette';

const EmptyBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 6rem;
  margin-bottom: 3rem;
  .message {
    font-size: 2rem;
    color: ${palette.gray6};
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
`;

export default EmptyBlock;
