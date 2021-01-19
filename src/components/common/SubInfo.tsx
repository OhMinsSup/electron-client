import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../libs/styles/palette';

type SubInfoBlock = {
  hasMarginTop?: boolean;
};

// eslint-disable-next-line no-redeclare
const SubInfoBlock = styled.div<SubInfoBlock>`
  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}
  color: ${palette.gray6};
  /* span 사이에 가운뎃점 문자 보여주기*/
  span + span:before {
    color: ${palette.gray4};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7'; /* 가운뎃점 문자 */
  }
`;

interface SubInfoProps {
  publishedDate: Date | number;
  timeZone: string;
  hasMarginTop?: boolean;
}
const SubInfo: React.FC<SubInfoProps> = ({
  publishedDate,
  hasMarginTop,
  timeZone,
}) => (
  <SubInfoBlock hasMarginTop={hasMarginTop}>
    <span>{new Date(publishedDate).toLocaleDateString()}</span>
    <span>{timeZone}</span>
  </SubInfoBlock>
);

export default SubInfo;
