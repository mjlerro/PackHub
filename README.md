# Course Project

Team Members: jchelton, mjlerro, tjwalter

## M0

### Elevator Pitch

PackHub is a web app that allows a student to either create or join a Pack. A Pack is a group of students who want to work together on a project, homework assignment, or any other task in a group while managing tasks together. The creator of a Pack can invite other NCSU students by their NCSU email. Each member of the Pack can create and view Assignments in the Assignments tab in the hub. An Assignment has a list of tasks. A Task object has a "completed" field, due date, description, title, and who is currently working on it (can be multiple users from the Pack).

Each Pack will have a Meetings tab where Pack members can schedule group meetings

Each Pack has its own list of Tasks which have "assigned members".

Each Pack will have a Quick Links tab where Pack members can add links such as When2Meet, GitHub repo, Google Docs, Discord invite, and more for easier collaboration.



### Old Wireframes

![](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-01/blob/master/images/MyPacks%20Wireframes.png)

---

## M1

### Frontend Progress Report
| Pages   | Status      | Wireframe
| ------- | -------     | ---------
| Landing Page | ✅  |
| Login  | ✅  |
| Hub  | ✅  |
| Create Pack  | ✅  |
| Join Pack  | ✅  |
| Pack Page (w/ Tasks)  | Incomplete  | [wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-01/blob/master/images/PackWireframe.png)
| Settings  | ✅  |

### Backend Progress Report
#### Endpoint 1
GET `/username/:id` : This endpoint will be used if or when login is handled through the backend. This endpoint has not been implemented yet as login is handled with local storage on the frontend right now. This endpoint would get the username of the user that cooresponds to the id parameter from the backend datastore.

Mock Request:  
GET `http://localhost:3000/username/tjwalterid`

Current Response:  
`Status:400 | Endpoint not implemented yet`

Expected Response:
```
Status:200
{
    username: tjwalter
}
```

#### Endpoint 2
POST `/username` : This endpoint will be user if or when login is handled through the backend. This endpoint has not been implemented yet as login is handled with local storage on the frontend right now. This endpoint would create a user from the request body and save it to the data source.

Mock Request:  
POST `http://localhost:3000/username/`

Mock Body:
```
{
    username: tjwalter,
    password: password
}
```

Current Response:  
`Status:400 | Endpoint not implemented yet`

Expected Response:  
`Status:200 | User created`

#### Endpoint 3
GET `/packs` : This endpoint returns all packs as a JSON array of pack objects. This endpoint is used to give the frontend access to all packs in the system. This endpoint is fully implemented and is used within the frontend.

Mock Request:  
GET `http://localhost:3000/packs`

Current Response:
```
Status:200
{
    packs: [
    {
        id: 1,
        name: "Pack1",
        description: "Pack1 Description",
        invitedMembers: "tjwalter,jchelton",
        joinedMembers: "tjwalter",
        owner: "tjwalter"
    },
    {
        id: 2,
        name: "Pack2",
        description: "Pack2 Description",
        invitedMembers: "jchelton, mjlerro",
        joinedMembers: "mjlerro",
        owner: "tjwalter"
    },
    ...
    ]
}
```

#### Endpoint 4
GET `/packs/:id` : This endpoint returns a single pack object that coorelates to the id parameter passed in. This endpoint has not been implemented yet as the team hasn't implemented edit and delete functionality for the packs, which would use this endpoint to display the selected pack.

Mock Request:  
GET `http://localhost:3000/packs/2`

Current Response:  
`Status:400 | Endpoint not implemented yet`

Expected Response:
```
Status:200
{
    pack:
    {
        id: 2,
        name: "Pack2",
        description: "Pack2 Description",
        invitedMembers: "jchelton, mjlerro",
        joinedMembers: "mjlerro",
        owner: "tjwalter"
    }
}
```

#### Endpoint 5
POST `/pack` : This endpoint creates a pack from the request body and adds it to the packs array, then returns the packs array.

Mock Request:  
POST `http://localhost:3000/pack/`

Mock Body:
```
{
    name: "Pack3",
    description: "Pack3 Description",
    invitedMembers: "mjlerro",
    joinedMembers: "mjlerro",
    owner: "tjwalter"
}
```

Current Response:
```
Status:200
{
    packs: [
    {
        id: 1,
        name: "Pack1",
        description: "Pack1 Description",
        invitedMembers: "tjwalter,jchelton",
        joinedMembers: "tjwalter",
        owner: "tjwalter"
    },
    {
        id: 2,
        name: "Pack2",
        description: "Pack2 Description",
        invitedMembers: "jchelton, mjlerro",
        joinedMembers: "mjlerro",
        owner: "tjwalter"
    },
    {
        id: 3,
        name: "Pack3",
        description: "Pack3 Description",
        invitedMembers: "mjlerro",
        joinedMembers: "mjlerro",
        owner: "tjwalter"
    },
    ...
    ]
}
```

#### Endpoint 6
DELETE `/pack/:id` : This endpoint deletes a pack, with the cooresponding id, from the packs array and removes it from the system. This endpoint has not been implemented yet as the team hasn't implemented edit and delete functionality for the packs, which would use this endpoint to delete the selected pack.

Mock Request:  
DELTE `http://localhost:3000/pack/3`

Current Response:  
`Status:400 | Endpoint not implemented yet`

Expected Response:  
`Status:200 | Pack deleted successfully`

#### Endpoint 7
PUT `/pack/:id` : This endpoint updates a pack with the cooresponding id and returns it. This endpoint has not been implemented yet as the team hasn't implemented edit and delete functionality for the packs, which would use this endpoint to update the selected pack.

Mock Request:  
PUT `http://localhost:3000/packs/2`

Mock Body:
```
{
    name: "Pack2Updated",
    description: "Pack2 Description Updated",
    invitedMembers: "mjlerro, jchelton",
    joinedMembers: "mjlerro, jchelton",
    owner: "tjwalter"
}
```

Current Response:  
`Status:400 | Endpoint not implemented yet`

Expected Response:
```
Status:200
{
    pack:
    {
        id: 2,
        name: "Pack2Updated",
        description: "Pack2 Description Updated",
        invitedMembers: "mjlerro, jchelton",
        joinedMembers: "mjlerro, jchelton",
        owner: "tjwalter"
    }
}
```

---

## M2

### Frontend Progress Report
| Pages   | Status      | Wireframe
| ------- | -------     | ---------
| Landing Page | ✅  |
| Login  | ✅  |
| Hub  | ✅  |
| Create Pack  | ✅  |
| Join Pack  | ✅  |
| Pack Page (w/ Tasks)  | Incomplete  | [wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-01/blob/master/images/PackWireframe.png)
| Settings  | ✅  |

Everything on the frontend is implemented for the Packs and Settings pages. However, the manage Pack page is yet to be implemented. We still have to create an implementation for Tasks, Meetings, and a page for Managing the pack.

### Backend Progress Report

#### Endpoint 1
GET `/packs` : This endpoint returns all packs as a JSON array of pack objects from the Firebase Realtime database. This endpoint is used to give the frontend access to all packs in the system. This endpoint is fully implemented and is used within the frontend.

Mock Request:  
GET `http://localhost:3000/packs`

Current Response:
```
Status:200
{
    packs: [
    {
        id: 1,
        name: "Pack1",
        description: "Pack1 Description",
        invitedMembers: "tjwalter,jchelton",
        joinedMembers: "tjwalter",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        }]
    },
    {
        id: 2,
        name: "Pack2",
        description: "Pack2 Description",
        invitedMembers: "jchelton",
        joinedMembers: "tjwalter",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        }]
    },
    ...
    ]
}
```

#### Endpoint 2
GET `/packs/:id` : This endpoint returns a single pack object that coorelates to the id parameter passed in from the Firebase Realtime database. This endpoint is used to give the frontend access to a single pack in the system. This endpoint is fully implemented and is used within the frontend.

Mock Request:  
GET `http://localhost:3000/packs/2`

Current Response:
```
Status:200
{
    pack:
    {
        id: 2,
        name: "Pack2",
        description: "Pack2 Description",
        invitedMembers: "jchelton, mjlerro",
        joinedMembers: "mjlerro",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        }]
    }
}
```

#### Endpoint 3
POST `/pack` : This endpoint creates a pack from the request body and adds it to Firebase Realtime database, then returns the packs array. This endpoint is used by the frontend to create new packs and is fully operational.

Mock Request:  
POST `http://localhost:3000/pack/`

Mock Body:
```
{
    name: "Pack3",
    description: "Pack3 Description",
    invitedMembers: "mjlerro",
    joinedMembers: "mjlerro",
    owner: "tjwalter"
}
```

Current Response:
```
Status:200
{
    packs: [
    {
        id: 1,
        name: "Pack1",
        description: "Pack1 Description",
        invitedMembers: "tjwalter,jchelton",
        joinedMembers: "tjwalter",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        }]
    },
    {
        id: 2,
        name: "Pack2",
        description: "Pack2 Description",
        invitedMembers: "jchelton, mjlerro",
        joinedMembers: "mjlerro",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        }]
    },
    {
        id: 3,
        name: "Pack3",
        description: "Pack3 Description",
        invitedMembers: "mjlerro",
        joinedMembers: "mjlerro",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        }]
    },
    ...
    ]
}
```

#### Endpoint 4
DELETE `/pack/:id` : This endpoint deletes a pack, with the cooresponding id, from the Firebase Realtime database. This endpoint is used to give the frontend access to delete a pack from the system. This endpoint is fully implemented but is not used yet within the frontend.

Mock Request:  
DELTE `http://localhost:3000/pack/3`

Current Response:  
`Status:200 | Pack deleted successfully`

#### Endpoint 5
PUT `/pack/:id` : This endpoint updates a pack with the cooresponding id in the Firebase Realtime Database and returns the updated packs array. This endpoint is used to give the frontend access to update a pack from the system. This endpoint is fully implemented and is used within the frontend.

Mock Request:  
PUT `http://localhost:3000/packs/2`

Mock Body:
```
{
    name: "Pack2Updated",
    description: "Pack2 Description Updated",
    invitedMembers: "mjlerro, jchelton",
    joinedMembers: "mjlerro, jchelton",
    owner: "tjwalter",
    tasks: [{
        "name": "Task 1",
        "description": "Description 1",
        "assigned": [
            "jchelton"
        ],
        "dueDate": "10/26/2021"
    }],
    meetings: [{
        "name": "Meeting 1",
        "date": "10/31/2021",
        "url": "zoomurl"
    }]
}
```

Current Response:
```
Status:200
{
    packs: [
    {
        id: 1,
        name: "Pack1",
        description: "Pack1 Description",
        invitedMembers: "tjwalter,jchelton",
        joinedMembers: "tjwalter",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        }]
    },
    {
        id: 2,
        name: "Pack2Updated",
        description: "Pack2 Description Updated",
        invitedMembers: "mjlerro, jchelton",
        joinedMembers: "mjlerro, jchelton",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        }]
    },
    {
        id: 3,
        name: "Pack3",
        description: "Pack3 Description",
        invitedMembers: "mjlerro",
        joinedMembers: "mjlerro",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        }]
    },
    ...
    ]
}
```

#### Endpoint 6
GET `/packs/:id/tasks` : This endpoint returns the list of tasks from a single pack object that coorelates to the id parameter passed in from the Firebase Realtime database. This endpoint is used to give the frontend access to the task objects associate with a single pack in the system. This endpoint is fully implemented and but is not used yet within the frontend.

Mock Request:  
GET `http://localhost:3000/packs/2/tasks`

Current Response:
```
Status:200
{
    tasks: [{
        "id": 1,
        "name": "Task 1",
        "description": "Description 1",
        "assigned": [
            "jchelton"
        ],
        "dueDate": "10/26/2021"
    }]
}
```

#### Endpoint 7
POST `/packs/:id/tasks` : This endpoint creates a task object on a pack from the request body and adds it to pack object in the Firebase Realtime database, then returns the tasks array. This endpoint will be used by the frontend to create new tasks for a pack and is fully operational.

Mock Request:  
POST `http://localhost:3000/packs/2/tasks`

Mock Body:
```
{
    "name": "Task 2",
    "description": "Description 2",
    "assigned": [
        "tjwalter"
    ],
    "dueDate": "11/1/2021"
}
```

Current Response:
```
Status:200
{
    packs: [
    {
        id: 1,
        name: "Pack1",
        description: "Pack1 Description",
        invitedMembers: "tjwalter,jchelton",
        joinedMembers: "tjwalter",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        }]
    },
    {
        id: 2,
        name: "Pack2",
        description: "Pack2 Description",
        invitedMembers: "jchelton, mjlerro",
        joinedMembers: "mjlerro",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        },{
            "id": 2,
            "name": "Task 2",
            "description": "Description 2",
            "assigned": [
                "tjwalter"
            ],
            "dueDate": "11/1/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        }]
    },
    {
        id: 3,
        name: "Pack3",
        description: "Pack3 Description",
        invitedMembers: "mjlerro",
        joinedMembers: "mjlerro",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        }]
    },
    ...
    ]
}
```

#### Endpoint 8
PUT `/packs/:id/task/:taskId` : This endpoint updates a task, with the cooresponding id, in a pack, with the cooresponding id, in the Firebase Realtime Database and returns the updated task. This endpoint is used to give the frontend access to update a task in a pack from the system. This endpoint is fully implemented and is not used yet within the frontend.

Mock Request:  
PUT `http://localhost:3000/packs/2/task/1`

Mock Body:
```
{
    "name": "Updated Task 1",
    "description": "Updated Description 1",
    "assigned": [
        "tjwalter,jchelton"
    ],
    "dueDate": "11/1/2021"
}
```

Current Response:
```
Status:200
{
    "id": 1
    "name": "Updated Task 1",
    "description": "Updated Description 1",
    "assigned": [
        "tjwalter,jchelton"
    ],
    "dueDate": "11/1/2021"
}
```

#### Endpoint 9
DELETE `/packs/:id/task/:taskId` : This endpoint deletes a task, with the cooresponding id, from a pack, with the cooresponding id, from the Firebase Realtime database. This endpoint is used to give the frontend access to delete a task from a pack in the system. This endpoint is fully implemented but is not used yet within the frontend.

Mock Request:  
DELTE `http://localhost:3000/pack/3/task/1`

Current Response:  
`Status:200 | Task Deleted!`

#### Endpoint 10
GET `/packs/:id/meetings` : This endpoint returns the list of meetings from a single pack object, that coorelates to the id parameter passed in, from the Firebase Realtime database. This endpoint is used to give the frontend access to the meetings objects associate with a single pack in the system. This endpoint is fully implemented and but is not yet used within the frontend.

Mock Request:  
GET `http://localhost:3000/packs/2/meetings`

Current Response:
```
Status:200
{
    meetings: [{
        "id": 1,
        "name": "Meeting 1",
        "date": "10/31/2021",
        "url": "zoomurl"
    }
    ...
    ]
}
```

#### Endpoint 11
POST `/packs/:id/meetings` : This endpoint creates a meeting object on a pack from the request body and adds it to pack object in the Firebase Realtime database, then returns the updated packs array. This endpoint will be used by the frontend to create new meetingss for a pack and is fully operational.

Mock Request:  
POST `http://localhost:3000/packs/2/meetings`

Mock Body:
```
{
    "name": "Meeting 2",
    "date": "11/2/2021",
    "url": "http://zoomurl.com"
}
```

Current Response:
```
Status:200
{
    packs: [
    {
        id: 1,
        name: "Pack1",
        description: "Pack1 Description",
        invitedMembers: "tjwalter,jchelton",
        joinedMembers: "tjwalter",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        }]
    },
    {
        id: 2,
        name: "Pack2",
        description: "Pack2 Description",
        invitedMembers: "jchelton, mjlerro",
        joinedMembers: "mjlerro",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        },{
            "id": 2,
            "name": "Task 2",
            "description": "Description 2",
            "assigned": [
                "tjwalter"
            ],
            "dueDate": "11/1/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        },
        {
            "id": 2,
            "name": "Meeting 2",
            "date": "11/2/2021",
            "url": "http://zoomurl.com"
        }]
    },
    {
        id: 3,
        name: "Pack3",
        description: "Pack3 Description",
        invitedMembers: "mjlerro",
        joinedMembers: "mjlerro",
        owner: "tjwalter",
        tasks: [{
            "id": 1,
            "name": "Task 1",
            "description": "Description 1",
            "assigned": [
                "jchelton"
            ],
            "dueDate": "10/26/2021"
        }],
        meetings: [{
            "id": 1,
            "name": "Meeting 1",
            "date": "10/31/2021",
            "url": "zoomurl"
        }]
    },
    ...
    ]
}
```

#### Endpoint 12
PUT `/packs/:id/meeting/:meetingId` : This endpoint updates a meeting, with the cooresponding id, in a pack, with the cooresponding id, in the Firebase Realtime Database and returns the updated meeting. This endpoint is used to give the frontend access to update a meeting in a pack from the system. This endpoint is fully implemented and is not used yet within the frontend.

Mock Request:  
PUT `http://localhost:3000/packs/2/meeting/1`

Mock Body:
```
{
    "name": "Updated Meeting 1",
    "date": "11/2/2021",
    "url": "http://zoomurl2.com"
}
```

Current Response:
```
Status:200
{
    "id": 1,
    "name": "Updated Meeting 1",
    "date": "11/2/2021",
    "url": "http://zoomurl2.com"
}
```

#### Endpoint 13
DELETE `/packs/:id/meeting/:meetingId` : This endpoint deletes a meeting, with the cooresponding id, from a pack, with the cooresponding id, from the Firebase Realtime database. This endpoint is used to give the frontend access to delete a meeting from a pack in the system. This endpoint is fully implemented but is not used yet within the frontend.

Mock Request:  
DELTE `http://localhost:3000/pack/3/meeting/1`

Current Response:  
`Status:200 | Meeting Deleted!`

### M2 Screencast

https://youtu.be/FzpEcaiDjkk

*Reminder that the .env file is needed for Firebase to work* (Should've been emailed to TAs)

---

## M3

### Public Location for PackHub (Currently not deployed)
[Link](http://52.91.46.196/)

### Final Report
[Link](https://github.com/mjlerro/PackHub/blob/master/documentation/finalReport.md)

### Runbook
[Link](https://github.com/mjlerro/PackHub/blob/master/documentation/readbook.md)

### Acceptance Testing
[Link](https://github.com/mjlerro/PackHub/blob/master/documentation/Black%20Box%20Tests_%20PackHub.pdf)

### Screencast
[Link](https://drive.google.com/file/d/1qGxaS2le_FWMaIkM8uR2mDla8sRo1zYW/view?usp=sharing)
