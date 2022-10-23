# Colab Calendar | Web

> MERN Stack

## Table of Contents

- Quick Start
  - [Installation](#installation)
  - [Mongo URI](#Mongo-URI)
  - [Dev server](#Dev-server)
- [Documentations and Additional Resources](#Documentations-and-Additional-Resources)
- Contributing
  - [Workflow](#Workflow)
  - [Directories Structure](#Directories-Structure)
  - [Code Style](#Code-Style)
- [Developers](#Developers)

## Quick start

### Installation

```sh
git clone git@github.com:Colab-Calendar/web.git
cd web
npm install
```

### Mongo URI

For MongoDB to work, you need to create a new URI and create a `.env` file with
the following content:

```sh
MONGODB_URI="[URI]"
```

To get this `URI`, follow this
[guide](https://www.mongodb.com/docs/atlas/driver-connection/?tck=docs_driver_nodejs).

**NOTE** that MongoDB Atlas requires no installation and has a free forever
plan. Do not pay.

### Dev server

To run a dev server:

```sh
npm run dev
```

If nothing is prompted, go to your web browser and visit `localhost:3000`

## Documentations and Additional Resources

For the tech we are using:

- [Next JS](https://nextjs.org/docs/getting-started)
  - [CSS Modules with Next JS](https://nextjs.org/docs/basic-features/built-in-css-support)
- [Mongoose](https://mongoosejs.com/docs/api.html)
- [MUI Bootstrap](https://mui.com/material-ui/getting-started/overview/)
- [FullCalendar](https://fullcalendar.io/docs)
- [Twilio](https://www.twilio.com/docs)

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

_(Last update: Oct 21, 2022)_

- [Workflow](#Workflow)
- [Code Style](#Code-Style)
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
   - [ ] TODO: get uniform git branch names.

   _Note_: if you are just staring out with Github, checkout the [resources](#Resources) section.

2. **Do not** push/merge things directly into the `main` branch (unless specified by one of the
   team-leads).

   - _Note_ that as of this moment, we have no way of enforcing this behavior, and while
     things are reversible with `git`, let's save us all some time and headache.

3. Communication is key (cliche 101), if a bug is encountered, create as issue, even if it's
   something you cannot handle/have time to fix it. Self-asign otherwise.

4. Although Github is used a lot in terms of task management, the main form of communication
   takes place in the Discord server.

5. As far as meetings concern, only the ones with breaking changes or of importance will be
   [documented](./docs/meetings).

### Directories Structure

- All `stylesheets` live in the `/src/styles/` dir. Adding a dir for each pages, for example:
  All stylesheets being used in the homepage would go into `src/styles/home/` dir.

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

- [BenReichwein](https://github.com/BenReichwein)
- [buddy326](https://github.com/buddy326)
- [toanhminh0412](https://github.com/toanhminh0412)
- [hn275](https://github.com/hn275)
