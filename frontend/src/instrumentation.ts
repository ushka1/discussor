/**
 * Msw is only registered for the server environment. This is
 * not a problem if browser uses **server actions** instead
 * of directly sending requests to the API. In that way every
 * request sent from the browser, will go through the server
 * and can be mocked.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    /*
     * Imports must be dynamically called inside the register
     * function, otherwise errors will be thrown.
     */
    const { server } = await import('@mocks/node');
    server.listen({
      onUnhandledRequest: 'bypass',
    });
  }
}
