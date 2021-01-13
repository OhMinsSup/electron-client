import React from 'react';

export interface ZoomOptions {
  displayName: string;
  password: string;
  meetingNumber: string;
  email?: string;
  role: string;
  i18n: string;
  lang: string;
}

// 나중에 다른 컴포넌트에서 타입을 불러와서 쓸 수 있도록 내보내겠습니다.
export interface ZoomState extends ZoomOptions {
  apiKey: string;
  signature: string;
}

export const ZoomStateContext = React.createContext<ZoomState | undefined>(
  undefined,
);

export type ZoomAction =
  | {
      type: 'CHANGE';
      payload: { name: keyof ZoomState; value: any };
    }
  | {
      type: 'ALL_CHANGE';
      payload: { key: keyof ZoomState; value: any }[];
    };

export type ZoomDispatch = React.Dispatch<ZoomAction>;
export const ZoomDispatchContext = React.createContext<
  ZoomDispatch | undefined
>(undefined);

export function zoomReducer(state: ZoomState, action: ZoomAction): ZoomState {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case 'ALL_CHANGE': {
      const obj = {};
      action.payload.forEach((data) => {
        Object.assign(obj, { [data.key]: data.value });
      });
      return {
        ...state,
        ...obj,
      };
    }
    default:
      throw new Error('Unhandled action');
  }
}

export function ZoomContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [zoom, dispatch] = React.useReducer(zoomReducer, {
    displayName: '',
    password: '',
    meetingNumber: '',
    email: '',
    role: '',
    i18n: '',
    lang: '',
    apiKey: '',
    signature: '',
  });

  return (
    <ZoomDispatchContext.Provider value={dispatch}>
      <ZoomStateContext.Provider value={zoom}>
        {children}
      </ZoomStateContext.Provider>
    </ZoomDispatchContext.Provider>
  );
}

export function useZoomState() {
  const state = React.useContext(ZoomStateContext);
  if (!state) throw new Error('ZoomContextProvider not found');
  return state;
}

export function useZoomDispatch() {
  const dispatch = React.useContext(ZoomDispatchContext);
  if (!dispatch) throw new Error('ZoomContextProvider not found');
  return dispatch;
}
