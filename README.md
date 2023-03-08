# Props

FX Wood
Sang Choi
Gavin Callander

#### Clone and configure
1. clone repo: `git clone git@github.com:sangchoi/project3`
2. make env file: `cp example_env .env`
3. open .env and configure port, token secret, and db name

#### install packages for express server and react client
1. in project3 directory: `npm install`
2. change to client directory `cd client` 
3. in project3/client: `npm install`

#### start mongoDB, server, and client
1. start mongoDB: `mongod`
2. in project3 directory: `nodemon` or `npm start`
3. in project3/client: `npm start`

## Day 1
The best thing about working as a group is that everyone comes with different ideas and opinions, so that's exactly how we started.
We began by throwing some ideas around and seeing what the interest level was in each. Given the parameters of our project - in essence, a MERN app - we were able to discard certain ideas based on their lack of suitability.
The idea we settled on was PROPS, an application with a focus on employee engagement. The basic premise was that employees could give others props for a job well done, a shout-out that would draw attention to their good work.
Given the nature of the final product, it was decided that the more prudent move would be to create an app focused towards desktop use, rather than mobile. The (extremely witty and clever) name, PROPS, was decided upon due to the function the app was performing, in addition to the front end being built in React. 

## Day 2
Day 2 began with the presentation of our idea in our daily stand-up. With feedback being positive, we felt that we'd made the right choice and moved onwards with our planning stage.
Planning began with user stories and, as is often the case, we got completely lost on a number of tangents, planning amazing features that would make our app the best thing ever. While these ideas are all well and good in theory, we were able to pull ourselves back to reality just long enough to get the basic features set out.
We spent a sizeable portion of the day creating our wireframes and route maps, somehow managing to find consensus on all of these, and were able to create a solid enough framework to begin assigning tasks to each team member. The use of our Trello Board was extremely useful for this.
Afterwards, it was coding time!!!

## Day 3/4
Days 3 and 4 happened to be a weekend, not something any of us had encountered throughout previous projects. As Gavin had to move apartment this weekend, it was left to FX and Sang to hold down the fort and hold it down they did(!), with the entire backend being fully functional by the time Monday came around.
As project parameters stated the app should be MERN-stack, MongoDB was used, with all routes being created in Mongoose.
Despite this being a particularly labor intensive part of the project, it was relatively uneventful and, aside from a few minor hiccups, we were in a really strong place to begin the next week.

## Day 5
Day 5 was a Monday, a very Monday, Monday. 
That morning we divided a number of tasks between us, with Sang working on attempting to bring Material UI into the project; FX looking into a variety of potential options for data visualization and Gavin focusing on further creation and gathering together of React components.
As the afternoon came around, it became apparent that some refactoring would be required. Rather than focusing on integrating components through a central jsx file, we decided to look at each page as a parent component to the supplementary components which enabled them to function. This decision was made on the basis of both functionality and organization, two things we wanted to make sure were given more than adequate focus throughout our time working together.
While we did indeed meet MVP requirements during the afternoon, we decided to take this step back in order to take two forward and continued working on refactoring for the remainder of the day and evening.

## Day 6/7
These were the hardcore days. Debugging, implementing trickier supplementary features and styling. We decided that Material UI wouldn't be much use given the limited time to learn the library and, after a brief flirt with React Materialize, decided Sang would style entirely in CSS.
Both FX and Gavin endeavored to get more niche features implemented, namely FX with data visualization and Gavin with chat feature. By close of play Wednesday, aside from a few minor issues and updates, the site was ready to go live.

## Wishlist and additions
Styling - Transitions and animations would have been welcome additions and will likely be implemented in future versions of the app. Additionally, use of material icons were unable to be included to a large extent due to time constraints.

Chat - While chat functionality was able to be brought in, a sticky bug remains where user names don't show alongside messages. This is something we'd look to include in future versions. Furthermore, sticking the scroll to the most recent chat is a desirable feature in order to increase UX.

Cloudinary - Due to time constraints Cloudinary implementation was unachievable. That being the case, this would perhaps be top of any wishlist for future versions to increase user immersion.

World Peace - While we understand it's probably outside the realms of possibility, adding a world peace feature to our app is highly desireable; particularly during this turbulant time for civilization. Alternatively, a feature which enabled the reversal of the dinosaur extinction event would be an ample substitute.
