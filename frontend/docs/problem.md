# Next.js - problem with middleware redirection when calling server action from the client component

Hi, currently I'm working on a project in Next.js, and I stumbled upon an interesting case.

I have created such middleware, it's nothing fancy, it just checks whether the current route is public or protected and if it's protected then checks for the 'session' cookie and based on its presence it calls `onSuccess` or `onFailure` function.

```ts
'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { isPublicRoute } from './publicRoutes';

export async function authMiddleware(
  req: NextRequest,
  onSuccess: (req: NextRequest) => any,
  onFailure: (req: NextRequest) => any,
) {
  const path = req.nextUrl.pathname;
  const isPublic = isPublicRoute(path);
  if (isPublic) {
    return onSuccess(req);
  }

  try {
    const cookie = cookies().get('session')?.value;
    const session = jwtDecode<{ userId?: string }>(cookie || '');
    const isAuth = !!session.userId;

    if (isAuth) {
      return onSuccess(req);
    } else {
      return onFailure(req);
    }
  } catch (err) {
    console.log(err);
    return onFailure(req);
  }
}
```

And I'm using it like this in `src/middleware.ts`.

```ts
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './security/authMiddleware';

export default function middleware(req: NextRequest) {
  return authMiddleware(
    req,
    () => NextResponse.next(),
    () => NextResponse.redirect(new URL('/login', r.nextUrl)),
  );
}
```

I've also created an example server action, all it does is returning some constant value.

```ts
'use server';

export async function getProfileData() {
  return {
    username: 'johndoe',
    email: 'johndoe@mail.com',
  };
}
```

And I'm using this action in an exemplary client component, it's just a button calling this server action when pressed.

```ts
'use client';

import { Button } from '@mui/material';
import { getProfileData } from './actions';

export default function FetchButton() {
  const onClickHandler = async () => {
    const data = await getProfileData();
    console.log(data);
  };

  return <Button onClick={onClickHandler}>Fetch</Button>;
}
```

In next steps, I'll use the following naming:

- client component = `FetchButtton`
- server action = `getProfileData`

Now, let's assume this client component is rendered on a **non-public** (protected) page. So, every action invoked from this component will go through auth middleware and check for 'session' cookie.

Now, if my session cookie is correct (not expired), everything works ok:

1. server action is invoked from the client component,
2. it goes through the middleware,
3. auth check passes correctly,
4. request leaves middleware,
5. and a response is returned.

But the problem happens when the cookie is invalid, let's say expired. Then it looks like this:

1. server action is invoked from the client component,
2. it goes through the middleware,
3. auth check doesn't pass,
4. redirection happens (it redirects to the login page),

And now important note, in my client component I'm invoking server action by using on click listener. It's not form submission, but an AJAX request (using fetch API or XMLHttpRequest). By default, if browser gets redirection as a response to AJAX request, then it automatically follows this redirection (source: <https://stackoverflow.com/questions/282429/returning-redirect-as-response-to-ajax-fetch-xhr-etc-request>). So in this case we have:

5. browser receives redirection in a response,
6. it automatically performs next request to the redirection URL (to the login page),
7. (**TO CHECK**) ??? login route is public so 200 is returned ??? But it's a post so...
