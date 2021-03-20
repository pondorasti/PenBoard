# Pensieve Coding Challenge

Welcome to the Pensieve coding challege! This is a fun exercise where we want to assess your technical chops, ability to pickup new skills, build something out of your comfort zone and ship all of it end-to-end all within a tight time frame.

The problem description is deliberately not detailed, so as to give you creative freedom to design the application the way you see fit, while giving us a chance to evaluate your design, coding and thinking process.

## Submission Guidelines

This coding challenge begins **8PM on Friday 03/19/21** and we expect to have your submissions by **12PM on Tuesday 03/23/21**. We expect the entire submission (code, documentation, tests etc) to be written solely by you. When you are done with your submission, please email your submission with the title **<YOUR NAME - Pensieve Coding Challenge Submission>** to team@pensieve.cloud

## Problem Statement

Design a [Kanban board](https://www.atlassian.com/agile/kanban/boards#:~:text=A%20kanban%20board%20is%20an,order%20in%20their%20daily%20work.)! Kanban boards are often used by Agile teams to monitor, track and update progress on a project. You can read more about it on the linked page and find plenty of articles and videos explaining it. A great example of a Kanban Board you can emulate is the [Todo Board on Notion](https://www.notion.so/0a02d82823ca45f593ec1bcba3dbe8ae?v=7181069004424560813c9e4f24ac1a1e)

### Functional Requirements

- Named columns or buckets (eg, Todo, In Progress and Done)
- Ability to add, remove, delete tasks (also called user stories) to a column
- Add a title and description to the task
- Assign a user to the task.
- Assign story points to a task, alongwith metadata such as date the task was created, last updated.

### Implementation

- Use [React](https://reactjs.org/) to design a frontend WebUI that allows a user to carry out all of aforementioned functional requirements mentioned.
- Use [ExpressJS](https://expressjs.com/) to create a backend REST API. The frontend queries the backend for data and then displays all of it as expected.
  - While we expect you to come up with the API Design and Spec by yourself, the API should facilitate all of the task CRUD operations, column information, etc.
  - Some of your REST endpoints could be be `GET`, `POST` and `DELETE` on `/task`, a `GET` and `PUT` on `/column` , etc. Ofcourse, this is just one way to do it, feel free to design the API the way you see fit.
- Use a database of your choice. We recommend using [MongoDB](https://www.mongodb.com/), but maintaining an inmemory database as a JSON file or object is also fine.
- Once you've implemented this, create a 7-10 minute recorded demo of your implementation. In this demo
  - Run through the frontend code and design (~1-2 mins)
  - Backend code and design (~1-2 mins)
  - Working demo demonstrating functionality (2 mins)
  - Challenges faced and improvements (2 mins)
- Create 3 public GitHub repositories, one that hosts the Backend (_kanban-api_), one for the Frontend (_kanban-ui_) and one simply a README (_kanban-readme_).
- In the _kanban-readme_ repository, in markdown, include a brief writeup documenting your overall architecture, approach, and how to get the software up and running locally. Finally, add a link to the backend repo, frontend repo and embed a link to your video. Email us your submission with simply a link to the kanban-readme repository that should contain everything for us to review!

### Bonus Points

No pressure, but we'd love to see one of these implemented in your submission. More than one if you're up for a challenge!

- Support attaching images to the tasks/user stories, using an object storage as your backend. Using something like [GCP Cloud Storage](https://cloud.google.com/storage) which is free.
- Write atleast 2-3 backend unit test cases using [Mocha](https://mochajs.org/). Mock out your API responses.
- Deploy your React app on [Netifly](https://www.netlify.com/) and backend app on [Heroku](https://www.heroku.com/). You can also use either one of these for both, doesn't matter. Choose your platform for deployment.
- Deploy a containerized version of your application using additionalDocker on Heroku!

## Final Thoughts

While we realise that this coding challenge might seem slightly intimidating, we want all of you to have fun learning and implementing technologies you weren't familiar with. Even if you aren't able to get everything done, please submit your best effort and make sure you portray that via your demo!

Please DO NOT comment below or email us with queries about the coding challenge, as they will not be answered. We believe the problem description is detailed enough for you to go off on. Do ensure, however, that your video addresses all the doubts and questions you may have had initially and the decisions you took to address them.

Good luck, and have fun!
