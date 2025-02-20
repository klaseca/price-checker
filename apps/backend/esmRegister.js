import { register } from 'node:module';
import { setUncaughtExceptionCaptureCallback } from 'node:process';

/**
 * @see {@link https://github.com/TypeStrong/ts-node/issues/2026}
 */
setUncaughtExceptionCaptureCallback((error) => {
  console.error(error);
  process.exit(1);
});

register('./esmHooksWithSettings.js', import.meta.url);
