# IRONMAN Fit Client

IRONMAN Fit is a social fitness app, where users can log their workouts, including lifts, runs, bikes and swims. These workouts are shared to a Feed so that others can view user activity. Each user also has their own profile page (which can be edited) with a log of all their personal workout history, along with the ability to filter the log for type of workout. You can also view other user profiles and see their fitness activity. I love fitness and took inspiration for this project from apps like Strava and Thenx, as well as the Ironman Triathlon, which I hope to complete one day. In addiition, I really enjoyed developing a social network app (check out the project, named [DevSpot](https://github.com/Team-StuckOverflow/devspot-client) - it's a social networking app for software developers!) for a group project and learned so much from it. I wanted to take what I learned from it and apply it to this project. I wish for this app to be a platform where users can not only keep track of their own workouts and progress, but also share their fitness journey together with friends and family!

## Important Links

- [IRONMAN Fit App](https://perryfhuang.github.io/ironman-fit-client/)
- [Deployed API](https://ironman-api.herokuapp.com/)
- [IRONMAN Fit API GitHub Repo](https://github.com/perryfhuang/ironman-fit-api)

## Screenshots

Landing Page
![Screenshot 1](https://i.imgur.com/lmT5fUL.png)

Feed
![Screenshot 2](https://i.imgur.com/wzvMrlJ.png)

Athletes Page
![Screenshot 3](https://i.imgur.com/cWaV28n.png)

Log Workout
![Screenshot 3](https://i.imgur.com/0BVFMYT.png)

User Profile
![Screenshot 3](https://i.imgur.com/71RxWOY.png)

## Planning Story

I love to use fitness Apps such as Strava, Thenx and Nike Run Club and loved how they tied social networking into it. I was thus inspired to recreate my own version as a culmination of all the coding and technologies I have learned in the past few months as well as taking what I liked from those fitness apps I've personally used. During planning, I wanted the app to support logging lifts, runs, bikes, and swims and rendering them to a feed. Currently, users are able to log lifts with up to 10 exercises including detailing weight, sets and reps for each exercise. For runs, biks and swims, users can log distance as well as total time. For all workouts, users can write a caption - bringing a social aspect to each workout. I also wanted to implement likes and comments on each workout, but I knew that for the sake of attaining MVP (minimum viable product) within the allotted project time, I would have to cut those features out for now. That said, this would be the first feature I implement for V2. See below for more features I plan to implement for the app. The app also supports viewing user profiles, and their personal workout activity as well as editing their own profile. The Moment.js package was used to render relative post time for each workout, which was pretty fun to mess around with all the settings they have available.

### User Stories

- As a user, I want to sign up.
- As a user, I want to sign in.
- As a user, I want to be able to change password.
- As a user, I want to sign out.
- As a user, I want to ‘create’ a lift/run/swim/bike session by entering in distance and time for the run/bike/swim or information for the workout including exercise, weight, number of sets and reps, and caption (stretch: picture upload!)
- As a user, I want to be able to delete my past lifts/runs/swims/bikes.
- As a user, I want to be able to edit my past lifts/runs/swims/bikes.
- As a user, I want to be able to view all of my past lift/runs/swims/bikes.
- As a user, I want to be able to see friends’ activity on a feed.
- As a user, I want to view my profile, which shows my past activity.
- As a user, I want to be able to see friends' profiles and individual activity on their profile.
- As a user, I want to be able to edit my profile.

### Technologies Used

- React
- React-Bootstrap
- React-Router-Dom
- HTML
- CSS/Sass
- JavaScript
- Moment.js

### Future Iterations

Below are features that will be implemented in future versions of the app, listed in order of priority:

- 'Users' page which lists all active users on the app [DONE]
- Likes and comments on workouts
- Picture uploads for profile pictures & with workout logs
- Following/'adding' friends
- Add more cutom emoticons for workout logs (ex. 'Perry Huang is feeling ...')
- Integrate GPS tracking for live tracking of run/swim/bike distance

### Wire Frame Planning

Page 1
![Wire Frame Page 1](https://i.imgur.com/oAGVvb3.jpg)

Page 2
![Wire Frame Page 2](https://i.imgur.com/AUamDuZ.jpg)

Page 3
![Wire Frame Page 3](https://i.imgur.com/9WDWQny.jpg)
