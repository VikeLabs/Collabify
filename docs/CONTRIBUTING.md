# CONTRIBUTE

This doc serves as an entry point for all future devs, it will be maintained and updated
during stages of the development.

_(Last update: Oct 21, 2022)_

- [Workflow](#Workflow)
- [Code Style](#Code-Style)
- [Resources](#Resources)
- [Documentations](#Documentations)

## Workflow

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
   [documented](./meetings).

## Directories Structure

- TBD

## Code Style

- TBD

## Documentations

All the docs for this project!

- [Next JS](https://nextjs.org/docs/getting-started)
- [Mongoose](https://mongoosejs.com/docs/api.html)
- [MUI Bootstrap](https://mui.com/material-ui/getting-started/overview/)
- [FullCalendar](https://fullcalendar.io/docs)
- [Twilio](https://www.twilio.com/docs)

## Resources

Additional resources.

- Getting started with git (thanks [Aman](https://github.com/buddy326?tab=rhttps://learngitbranching.js.org/epositories)!)
  - [Learn Git Branching](https://learngitbranching.js.org/)
  - [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [MDN](https://developer.mozilla.org/en-US/): Documentations for modern web technologies.
- [Learn X in Y minutes](https://learnxinyminutes.com/): A cheat-sheet for literally anything
  programming related, which includes `JavaScript`, and `MongoDB` queries (We are using
  `Mongoose`, which is an JS interface for `MongoDB`, the general idea is the same though).
