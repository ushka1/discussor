# Notes

1. By using **server actions** you don't have to mock browser environment, because every request made in the browser will go through the server environment, and this environment will made the request to the API and then return results to the browser.

    Browser &rarr; Server &rarr; API &rarr; Server &rarr; Browser

    Browser &rarr; Server &rarr; Mock &rarr; Server &rarr; Browser
