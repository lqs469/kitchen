import { Context } from 'midway';

module.exports = () => {
  return async (ctx: Context, next: any) => {
    ctx.socket.emit('res', 'connected!');

    await next();

    console.log('disconnection!');
  };
};
