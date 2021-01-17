import { atom } from 'recoil';
import type { User } from '../libs/api/client';
import RECOIL_KEY from './contant';

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userState = atom<UserState>({
  key: RECOIL_KEY.USER,
  default: initialState,
});
