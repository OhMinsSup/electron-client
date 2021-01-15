import React from 'react';

export interface UserState {
  user: any;
}

export const UserStateContext = React.createContext<UserState | undefined>(
  undefined,
);

export type UserAction = {
  type: 'SET_USER';
  payload: any;
};

export type UserDispatch = React.Dispatch<UserAction>;

export const UserDispatchContext = React.createContext<
  UserDispatch | undefined
>(undefined);

export function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'SET_USER': {
      const { payload } = action;

      return {
        ...state,
        user: payload,
      };
    }
    default:
      return state;
  }
}

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(userReducer, {
    user: null,
  });

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
}

export function useUserState() {
  const state = React.useContext(UserStateContext);
  if (!state) throw new Error('UserContextProvider not found');
  return state;
}

export function useUserDispatch() {
  const dispatch = React.useContext(UserDispatchContext);
  if (!dispatch) throw new Error('UserContextProvider not found');
  return dispatch;
}
