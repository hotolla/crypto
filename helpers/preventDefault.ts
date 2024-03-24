import { BaseSyntheticEvent } from 'react';

type Event = BaseSyntheticEvent<object, any, any> | undefined;

export const preventDefault = (handler: (event?: Event) => Promise<void>) => (event: Event) => {
  event?.preventDefault();

  handler(event);
};
