# Final Report For Packhub

## Problem Solved

The problem that PackHub solves is to allow NCSU students to collaborate on projects and assignments while keeping track of their progress and what needs to get done. It has a similar functionality to a Kanban board, except that it is more user friendly in that it allows students to add tasks, assign them to other students, and mark them as complete.

It has a very low learning curve, and it takes away the excess options that typically come along with a traditional Kanban board. For most NCSU students, especially those who are not in the college of engineering, collaboration is not a trivial task. Students often have to use several different collaboration tools in order to keep track of team's assigned tasks, but with PackHub, students can have all of their assigned work in one place.

Students can also be a part of as many different Packs as they would like. When a student starts a new course, they can create a new Pack and invite their project teammates to start collaboration. Allowing all students in the Pack to create Tasks encourages collaboration and puts everyone on a level field, ensuring that not any one person is left with the responsibility of completing their assigned work.

## Reflection on the Development Process and Project

As we reflect on the development process of our project, our team realized what went well with our process and what did not go well.

As a team, we did a good job of splitting up the work. Chase focused on the frontend, Travis focused on the backend, and Marcus served as the full-stack developer tackling both sides. We were able to use GitHub's issues, project board, and separate branches to help us organize our work and make development easier. We used Discord as our main source of communication, and we found it to be a great place to house our discussion. The screen sharing feature in the voice channel was particularly helpful when one of us was debugging the app. It allowed us to pair program when needed. We would not have changed anything about our development process, except for having better communication on how the backend and frontend were talking to each other.

On the other hand, the main struggle our team had was debugging API issues in how the frontend was working with the backend. For hours, our team struggled to figure out why data was being duplicated in the backend on POST and PUT requests. We really did not understand what was going wrong because when we ran the code in our console to see what was running, we did not see anything wrong. We at least narrowed it down to the fact that the Pack's IDs were not being returned in the correct format. The frontend was parsing the ID as a string and the backend expected it as an integer, so we had to solve this issue by comparing every ID to every other ID, but with JavaScript's parseInt() function surrounding each one. Solving this problem was a breakthrough, and after fixing it, our functionality was working as expected and our frontend was displaying the correct data.

## Limitations

There are definitely limitations to our project, and these are because we didn't have enough time to dedicate to this project. Each of our team members were very busy with other classes this semester, so unfortunately we had to make some sacrifices to make our project a success.

Our first limitation would have to be our lack of email services. We did not have enough time to implement emails, so instead, we implemented our invitation system by simply adding Unity ID's to our database. This was a very easy way to do it, but it was not the best way to do it. Also, we are aware that this is not good for security in that anyone can sign up with another student's Unity ID, so in the future, we would definitely want to add authentication with Google. Because our NCSU accounts are linked with Google, we could easily implement this.

Another limitation of our app is that there are no type of notifications. We would have liked to implement this in a way that would send a email notification to students when they are: assigned to a task, when a task they're working on is completed, or when a task they're working on is due in 24 hours (or some other set time). This would allow students to be aware of their assigned tasks and be able to be notified when they are due.

## Future Work

For future work, with regards to our limitations above, first, we would like to add email services to our app. With email services, we could easily accomplish most of our limitations. We could send emails to invite students to Packs and also send emails for Task notifcation purposes. We could

Another thing we would like to add in the future is a 'Completed' section that shows the tasks that were completed. We would also give users the option to remove the Task from the Completed section. This would fall under the case when students need to rework on a Task that they had previously thought was finished.

We would also like to add, in the future, colored Tasks to show priority and a sorting behavior that allows students to either sort the Tasks by priority or by due date.
