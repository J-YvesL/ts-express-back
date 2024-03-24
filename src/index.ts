if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}

import startApp from '@/boot';

startApp();
