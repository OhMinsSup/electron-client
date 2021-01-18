import React from 'react';
import { useRecoilState } from 'recoil';
import { userFn } from '../../libs/api/client';
import type { UserModel } from '../../libs/api/model/user';
import { userState } from '../../store/user';

interface CoreProps {}
const Core: React.FC<CoreProps> = () => {
  const [state, setUser] = useRecoilState(userState);
  React.useEffect(() => {
    if (!state.user) {
      const user = userFn() as UserModel | null;
      if (user) {
        setUser((oldUser) => ({
          ...oldUser,
          user,
        }));
      }
    }
  }, []);
  return null;
};

export default Core;
