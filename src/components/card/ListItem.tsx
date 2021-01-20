import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import format from 'date-fns/format';
import { ListMeetingModel } from '../../libs/api/model/list-meeting';
import palette from '../../libs/styles/palette';
import SubInfo from '../common/SubInfo';

interface ListItemProps {
  meeting: ListMeetingModel;
}
const ListItem: React.FC<ListItemProps> = ({ meeting }) => (
  <PostItemBlock className="border-gray-300 border-b-2">
    <h2>
      <Link className=" hover:text-teal-500" to={`/meeting/@${meeting.id}`}>
        {meeting.topic}
      </Link>
    </h2>
    <SubInfo
      hasMarginTop
      publishedDate={meeting.start_time}
      timeZone={meeting.timezone}
    />
    {meeting.type === 2 ? (
      <div>
        <p>회의시간: {meeting.duration || ''}분</p>
        <p>
          회의 시작시간:{' '}
          {meeting.start_time
              ? format(new Date(meeting.start_time), `yyyy-MM-dd HH:mm a`)
              : '없음'}
        </p>
        <p>{meeting.agenda || ''}</p>
      </div>
      ) : (
        <p>{meeting.agenda || ''}</p>
      )}
  </PostItemBlock>
  );

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
