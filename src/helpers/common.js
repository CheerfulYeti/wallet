import uuid from 'uuid';

export const guId = () => {
  return uuid.v4(new Date().getTime());
};