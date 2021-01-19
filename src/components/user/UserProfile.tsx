import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import palette from '../../libs/styles/palette';
import { userState } from '../../store/user';
import defaultImage from '../../styles/svg/user.svg';
import Button from '../common/Button';

interface UserProfileProps {
  id: string;
}
const UserProfile: React.FC<UserProfileProps> = () => {
  const user = useRecoilValue(userState);
  const history = useHistory();

  const onClick = React.useCallback(() => {
    history.push('/meeting/create');
  }, []);

  React.useEffect(() => {
    if (!user.user) {
      history.push('/');
    }
  }, []);

  if (!user.user) return null;

  return (
    <>
      <Helmet>
        <title>{`${user.user.last_name}${user.user.first_name} - UserProfile`}</title>
        <meta name="description" content="유저 상세 페이지" />
      </Helmet>
      <div className="px-4 mt-5 lg:px-0">
        <section className="flex sm:items-center sm:flex-row flex-col items-start">
          <img
            className="block sm:w-32 sm:h-32 rounded-full object-cover shadow-md w-20 h-20"
            src={defaultImage}
            alt="profile"
          />
          <div className="flex flex-col justify-center sm:ml-4 sm:mt-0 ml-0 mt-4 font-sans space-y-2">
            <div className="text-xl font-bold">
              <strong>
                <span>{user.user.last_name}</span>
                <span>{user.user.first_name}</span>
              </strong>
            </div>
            <div className="text-lg whitespace-pre-wrap">
              <Button size="medium" onClick={onClick}>
                미팅룸 생성
              </Button>
            </div>
          </div>
        </section>
        <Separator className="sm:mt-8 sm:mb-6 mt-4 mb-4" />
      </div>
    </>
  );
};

export default UserProfile;

const Separator = styled.div`
  background: ${palette.gray2};
  width: 100%;
  height: 1px;
`;
