import React from 'react';
import styled from 'styled-components';
import palette from '../../libs/styles/palette';
import PlainNavLink from '../common/PlainNavLink';

interface UserTabProps {
  id: string;
  tab: 'meeting' | 'recording' | 'test';
}

const tabIndexMap = {
  meeting: 0,
  recording: 1,
  test: 2,
};

const UserTab: React.FC<UserTabProps> = ({ id, tab }) => {
  const url = `/@${id}`;
  const withPrefix = (path: string) => `${url}/${path}`;
  const tabIndex = tabIndexMap[tab];

  return (
    <div className="flex justify-center md:my-20">
      <TabWrapper className="flex relative">
        <TabItem exact to={url}>
          미팅룸
        </TabItem>
        <TabItem exact to={withPrefix('recording')}>
          레코딩
        </TabItem>
        <TabItem exact to={withPrefix('test')}>
          로그
        </TabItem>
        <Indicator
          style={{
            left: `${tabIndex * 33.3333}%`,
          }}
        />
      </TabWrapper>
    </div>
  );
};

export default UserTab;

const TabWrapper = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TabItem = styled(PlainNavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.325rem;
  width: 8rem;
  height: 3rem;
  color: ${palette.gray7};
  text-decoration: none;
  transition: 0.25s color ease-in-out;
  font-weight: 600;
  &.active {
    color: ${palette.teal5};
    /* font-weight: bold; */
  }

  @media (max-width: 768px) {
    flex: 1;
    font-size: 1rem;
    height: 2.5rem;
  }
`;

const Indicator = styled.div`
  width: 8rem;
  height: 2px;
  background: ${palette.teal5};
  position: absolute;
  bottom: -2px;
  transition: 0.25s left ease-in-out;

  @media (max-width: 768px) {
    width: 33.3333%;
  }
`;
