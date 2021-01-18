import React from 'react';
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
    <div className="mt-20">
      <section className="flex items-center">
        <img
          className="block w-32 h-32 rounded-full object-cover shadow-md"
          src={defaultImage}
          alt="profile"
        />
        <div className="flex flex-col justify-center ml-4 font-sans">
          <div className="text-xl font-bold">
            <strong>
              {user.user.last_name} {user.user.first_name}
            </strong>
          </div>
          <div className="text-lg whitespace-pre-wrap">
            <Button size="medium" onClick={onClick}>
              미팅룸 생성
            </Button>
          </div>
        </div>
      </section>
      <Separator />
    </div>
  );
};

export default UserProfile;

const Separator = styled.div`
  background: ${palette.gray2};
  width: 100%;
  height: 1px;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;
