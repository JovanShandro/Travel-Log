import { MiddlewareFn } from 'type-graphql';
import { Context } from '@/types';

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('You are not authenticated');
  }
  return next();
};
