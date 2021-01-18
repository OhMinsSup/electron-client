import { atom } from 'recoil';
import type { UserModel } from '../libs/api/model/user';
import RECOIL_KEY from './contant';

export interface UserState {
  user: UserModel | null;
}

const initialState: UserState = {
  user: null,
};

export const userState = atom<UserState>({
  key: RECOIL_KEY.USER,
  default: initialState,
});
