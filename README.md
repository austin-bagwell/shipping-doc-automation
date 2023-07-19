# Project Goals

Schedule pickups and create BOLs/shipping labels by parsing a CSV file and POSTing the parsed data to ODFL's API. The CSV will be generated from a Netsuite export.

Initial user interface will be CLI-based. Users will input the path to a local CSV file and the application will parse that file, handle HTTP requests, and write results and/or errors to the CLI.

The eventual goal is to make this a full stack application with a basic UI created with React, Node backend, and Postgres database (in Docker) for storing address information.

## Frontend

The initial plan is to KISS and have no front end. The app will request the path to a .csv file from the CLI and then do all its magic from there.

After I get the actual functionality up and running, I plan to create a basic front end that allows file upload and provides better visibility to shipment info, possible errors, etc.

That front end will use the following libraries/frameworks:

- React TS
- Chakra UI

## Backend

Everything is going to be running in Node to begin with. Eventually, I want to add support for the following:

- Docker
- PostgreSQL
