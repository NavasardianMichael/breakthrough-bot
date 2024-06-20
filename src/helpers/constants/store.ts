import { ChatsSlice } from 'store/chats/types';
import { ROLES } from './chat';

export const STATE_SLICE_NAMES = {
  app: 'app',
  chats: 'chats',
} as const;

export const CHATS_LIST_INITIAL_STATE: ChatsSlice['list'] = {
  byId: {
    'temp-id-1': {
      id: 'temp-id-1',
      messages: [
        {
          id: 'temp-message-id-1',
          role: ROLES.user,
          value: 'Give me a random color, Give me a random color, Give me a random color, Give me a random color, Give me a random color, Give me a random color, Give me a random color, Give me a random color, Give me a random color, Give me a random color'
        },
        {
          id: 'temp-message-id-2',
          role: ROLES.system,
          value: 'Yes of course, here are they: ...'
        },
      ]
    }
  },
  allIds: ['temp-id-1'],
  currentId: 'temp-id-1',
}