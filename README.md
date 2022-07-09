# LSDRS: Laboratory Sample Drop-off/Reception System
![GitHub last commit](https://img.shields.io/github/last-commit/jlmichels/lsdrs?style=plastic)

LSDRS is a PostgreSQL/Express/React/Node (PERN) full-stack app that enables factory workers to drop off samples and laboratory workers to receive samples.

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## Live Demo
[LSDRS on Heroku](https://lsdrs.herokuapp.com/)

## Technologies
### Front-end
- [React.js](https://reactjs.org/)
- [React-Bootstrap](https://www.npmjs.com/package/react-bootstrap)

### Back-end
- [PostgreSQL](https://www.postgresql.org/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)

### Other
- [Postman API Platform](https://www.postman.com/) - Test app API
- [nodemon](https://www.npmjs.com/package/nodemon) - Restart Node app on file changes
- [dotenv](https://www.npmjs.com/package/dotenv) - Load environment variables

## Features
- Drop off sample
  - Select material, enter lot number, and select quantity
- Accept sample
- Reject sample
  - Select preset reason, or select "Other" and input reason
- Developer Options
  - Reset all sample statuses to pending
  - Clear all samples from table
  - Repopulate table with default test samples
  - Clear all samples and repopulate (options 2 + 3)

## Roadmap
- User authentication system
- Display rejection notices to factory side
- Implement Jest tests
- Consider using Redux

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
