# Notes

1. By using **server actions** you don't have to mock browser environment, because every request made in the browser will go through the server environment, and this environment will made the request to the API and then return results to the browser.

    Browser &rarr; Server &rarr; API &rarr; Server &rarr; Browser

    Browser &rarr; Server &rarr; Mock &rarr; Server &rarr; Browser

1. Middleware `matcher` must be constant (because of static analysis), it supports full regex, so negative patterns are ok.

1. If you use anything from the server environment, then file/function must be marked as `server-only`. Then it will be executable only in server environment but will get access to this environment resources (look [axios](../src/config/axios.ts)).

1. If you want to use translations in client environment, then just use `<NextIntlClientProvider>` and be good man.

1. `use server` vs `import 'server only'` <https://www.reddit.com/r/nextjs/comments/18ih6nd/useserver_vs_serveronly/>.

1. `redirect` internally throws an error so it should be called outside of `try/catch` blocks.
