Mission
Parse a CSV file, sending fetch() requests to ODFL's API to schedule a pickup, create a BOL and shipping labels, and send PDFs of those shipping documents to an email and/or add them to a Google Calendar event if I can sort out how to actually connect them. Maybe just have a script that stores them in Drive too?

Frontend

React TS
Chakra UI components
csv-parse

Backend ?
might be helpful to cache some things (addresses etc.)
but to start with I think I can safely just store that in memory ie hardcode those few addresses I need for ship-from, consignee, etc
