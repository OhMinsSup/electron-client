import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ListMeetingModel } from '../../libs/api/model/list-meeting';
import palette from '../../libs/styles/palette';
import SubInfo from '../common/SubInfo';
// import { ZoomMtg as ZoomMtgType } from '@zoomus/websdk';
// import Button from '../common/Button';

// declare const ZoomMtg: typeof ZoomMtgType;

interface ListItemProps {
  meeting: ListMeetingModel;
}
const ListItem: React.FC<ListItemProps> = ({ meeting }) => {
  console.log(meeting);

  return (
    <PostItemBlock>
      <h2>
        <Link to="/@1232131">{meeting.topic}</Link>
      </h2>
      <SubInfo publishedDate={meeting.start_time} timeZone={meeting.timezone} />
      <p>{meeting.timezone}</p>
    </PostItemBlock>
  );
};

export default React.memo(ListItem);

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  @media (max-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray2};
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray6};
    }
  }
  p {
    margin-top: 2rem;
  }
`;
