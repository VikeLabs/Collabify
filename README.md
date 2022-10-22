# Colab Calendar | Web

> MERN Stack

## Table of Contents

- [Documentation](#documentation)
- [Installation](#installation)
- [Quick Start](#quick-start)

## Documentations

- [Next JS](https://nextjs.org/docs/getting-started)
- [Mongoose](https://mongoosejs.com/docs/api.html)
- [MUI Bootstrap](https://mui.com/material-ui/getting-started/overview/)
- [FullCalendar](https://fullcalendar.io/docs)
- [Twilio](https://www.twilio.com/docs)

For onboarding, or for a reference to our development process/environment,
checkout this [contributing guide](./docs/CONTRIBUTING.md)

## Installation

```sh
git clone git@github.com:Colab-Calendar/web.git
cd web
npm install
```

### Create .env in root

For MongoDB to work, you need to create a new URI and create a `.env` file with
the following content:

```sh
MONGODB_URI="mongodb+srv://(MONGO USER):(MONGO PASS)@cluster0.yi8ut.mongodb.net/?retryWrites=true&w=majority" // You can obtain one of these URI's from MongoDB website
```

To get this URI, follow this
[guide](https://www.mongodb.com/docs/atlas/driver-connection/?tck=docs_driver_nodejs).
You will need to substitute `(MONGO USER)` and `(MONGO PASS)` as your own username and
password.

**NOTE** that MongoDB Atlas requires no installation and has a free forever
plan. Do not pay.

### Quick Start

```sh
# Start Development
npm run dev
```

## Developers

- [BenReichwein](https://github.com/BenReichwein)
- [buddy326](https://github.com/buddy326)
- [toanhminh0412](https://github.com/toanhminh0412)
- [hn275](https://github.com/hn275)
