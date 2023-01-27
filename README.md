# Colab Calendar | Web

> MERN Stack

## Table of Contents

- Quick Start
  - [Installation](#installation)
  - [Mongo URI](#Mongo-URI)
  - [Dev server](#dev-server)
- [Tech stacks](#tech-stacks)
- Contributing
  - [Workflow](#workflow)
  - [Directories Structure](#directories-structure)
  - [Code Style](#code-style)
- [Developers](#developers)

### Installation

```sh
git clone git@github.com:Colab-Calendar/web.git
cd web
npm ci --legacy-peer-deps
```

- `ci` respects `package-lock.json`

### `.env`

An example:

```sh
DATABASE_URL=postgres://<postgres-username>:<postgres-password>@localhost:5432/collabify
FROM_NUMBER=<Get from Ben>
TWILIO_ACCOUNT_SID=<Get from Ben>
TWILIO_AUTH_TOKEN=<Get from Ben>
PRIVATE_GROUP_SECRET=<Any random string 8 - 32 chars>
```

#### PostGres

For Postgres to work as expected (assuming it's been installed and configured on your machine),
you will have to create a database `collabify` in the `psql` shell

```sql
CREATE DATABASE collabify;
```

DB migration is needed, you only need to do this whenever there's a change in the db schema.

```sh
npm run db:migrate
```

To see the database, you can continue to use the `psql` shell with regular SQL queries,
or you could use the GUI client provided by Prisma, to start this GUI, open a new terminal:

```sh
npm run db:view
```

Then head over to <localhost:5555> in your browser (if it doesn't open automatically).

### Dev server

To run a dev server:

```sh
npm run dev
```

If nothing is prompted, go to your web browser and visit <http://localhost:3000>

## Tech stacks

For the tech we are using:

- Frontend

  - [Next JS](https://nextjs.org/docs/getting-started)
  - [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support).
  - [MUI Bootstrap](https://mui.com/material-ui/getting-started/overview/)
  - [FullCalendar](https://fullcalendar.io/docs), calendar API.

- Backend

  - [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
  - [JsonWebToken](https://github.com/auth0/node-jsonwebtoken)
  - [Prisma](https://www.prisma.io/docs/reference)
  - [Twilio](https://www.twilio.com/docs) handles messaging.
  - [Jest](https://jestjs.io/docs/api), the testing library.

Additional resources:

- Getting started with git (thanks [Aman](https://github.com/buddy326?tab=rhttps://learngitbranching.js.org/epositories)!)
  - [Learn Git Branching](https://learngitbranching.js.org/)
  - [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [MDN](https://developer.mozilla.org/en-US/): Documentations for modern web technologies.
- [Learn X in Y minutes](https://learnxinyminutes.com/): A cheat-sheet for literally anything
  programming related, which includes `JavaScript`, and `MongoDB` queries (We are using
  `Mongoose`, which is an JS interface for `MongoDB`, the general idea is the same though).

## Contribute

This section of the doc serves as an entry point for all future devs, it will be maintained and updated
during stages of the development.

_(Last update: Jan 12, 2023)_

- [Workflow](#workflow)
- [Code Style](#code-style)
- [Resources](#Resources)
- [Documentations](#Documentations)

### Workflow

To prevent from becoming a self-fulfilling meme(s), here are the general rules!

1. Keeping it simple, tasks are going to be managed via the issue/ticket system on Github. The
   general workflow can be described as following:

   > self-asign &#8594; new branch &#8594; code &#8594; create pull request &#8594; request review.

   - Issues and tickets are created for anyone to work on, just make sure
     to self-asign it before **creating a new branch** and start working on it. This is to avoid
     having multiple devs working on the same thing unknowingly.

   _Note_: if you are just staring out with Github, checkout the [resources](#Resources) section.

2. **When working with the backend** **_PLEASE_** **write tests for your code**. If you are new to
   testings, your peers are more than happy to help.

- In `/tests` write a test for the function or file you made so the code reviewer can verify it works

3. **Do not** push/merge things directly into the `main` branch (unless specified by one of the
   team-leads).

   - _Note_ that as of this moment, we have no way of enforcing this behavior, and while
     things are reversible with `git`, let's save us all some time and headache.

4. New issues can be created by everyone, and they are encouraged to do so. This is to keep
   track of development process:

   - If you find a bug, create a new issue. This is a way to notify other devs that there
     might be breaking changes in relative to their code that they need to plan around.
   - Fix and push your bug fix into a **new branch**, PR and link it to the issue (include
     `close #<issue number>` somewhere in your summary), request review, etc..

5. Although Github is used a lot in terms of task management, the main form of communication
   takes place in the Discord server.

6. As far as meetings concern, only the ones with breaking changes or of importance will be
   [documented](./docs/meetings).

### Directories Structure

- All `stylesheets` live in the `/src/styles/` dir. Adding a dir for each pages, for example:
  All stylesheets being used in the homepage would go into `src/styles/home/` dir.
- In `/src/components` if it is not a globally used component (only used in a certain page) then name the component after the page you are using it in. Eg: `components/Home` has components that are used in Home page
- `/src/helper` and `/src/hooks` are globally used (used in more then one file). If you are making a helper or hook for a specific component, please do that inside of the components folder. Eg: `/components/GroupCalendar` a helper function relating to it is put inside of the folder.

### Code Style

#### Absolute imports

Absolute import path has been set up, the `src` dir is the starting point. For example, if
you are working in `./src/pages/_app.js` and need to import the `globals.css` stylesheet from
`./src/styles/`:

```js
import 'styles/globals.css';
```

For a more detailed [explanation](https://nextjs.org/docs/advanced-features/module-path-aliases).

#### CSS Modules

**NEXT.js** supports `CSS Modules` out of the box. It works very similar to regular CSS, you
do not have to worry about potentially clashing class names. For a detail explanation, checkout
the [doc](#Documentations-and-Additional-Resources) section.

A quick example:

```js
// At the top of the file the index.js file
import style from 'styles/home/home.module.css'; // note the required `.module` extension
// ...
return <div className={style.anExample}>{/* ... */}</div>;
```

```css
/* in home.module.css */
/* for javascript support, use camelCase */
.anExample {
  /* regular css code */
}
```

## Developers

- [Ben](https://github.com/BenReichwein)
- [Aman](https://github.com/buddy326)
- [Hal](https://github.com/hn275)
- [Ani](https://github.com/AniTheNinja)
- [Ekam](https://github.com/ekamk)
