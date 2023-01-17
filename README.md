# BetterBudget
A lightweight budgeting web app built with MERN + Typescript.
Link to live project: https://betterbudget.up.railway.app/

## How It's Made:

**Tech used:** TypeScript, CSS, React, NodeJS, Express, MongoDB

Made with the MERN stack with TypeScript, this full-stack application allows the user to track their expenses and create a personalized monthly budget. Animations are done with the react library [Framer Motion](https://www.framer.com/motion/), and the charts on the dashboard are created using another library called [ChartJS](https://www.chartjs.org/) along with [react-chartjs-2](https://react-chartjs-2.js.org/) to allow react components for ChartJS. To style the app, a Mobile-first approach was used to ensure accessability across multiple devices.

## Optimizations

Optimizations include reducing time complexity of certain setter functions, especially when those functions delete certain elements from the state arrays. Also, component structure could use more work, as many states could be lifted to reduce code clutter. 

## Lessons Learned:

During this project I learned about multiple react libraries including Framer Motion, ChartJS, and React-Icons. I improved my React skills by being able to learn how to more efficiently render components and pass props. I also learned how to connect a React frontend to a MongoDB, Express backend using Axios. Most importantly, I learned how to use TypeScript in a Full-stack MERN application, and I am confident that my projects going forward will be developed in TS instead of JS, since TS made my life much easier during the development of this project.


