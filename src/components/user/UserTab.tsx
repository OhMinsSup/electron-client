import React from 'react';
import styled from 'styled-components';
import palette from '../../libs/styles/palette';
import PlainNavLink from '../common/PlainNavLink';

interface UserTabProps {
  id: string;
  tab: 'live' | 'scheduled' | 'upcoming';
}

const tabIndexMap = {
  live: 0,
  scheduled: 1,
  upcoming: 2,
};

const UserTab: React.FC<UserTabProps> = ({ id, tab }) => {
  const url = `/@${id}`;
  const withPrefix = (path: string) => `${url}/${path}`;
  const tabIndex = tabIndexMap[tab];

  return (
    <div className="flex justify-center md:my-20">
      <TabWrapper className="flex relative">
        <TabItem exact to={url}>
          라이브 미팅룸
        </TabItem>
        <TabItem exact to={withPrefix('scheduled')}>
          예약 미팅룸
        </TabItem>
        <TabItem exact to={withPrefix('upcoming')}>
          대기 미팅룸
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
