/**
 * @author Travis Walter tjwalter@ncsu.edu
 * 
 * This file is the main entry point for the pack views application. It provides numerous CRUD
 * operations for the pack views application.
 * 
 * This was built for CSC 342
 */

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

// Load storage
const { database, db } = require('./db');

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Ready on port: ${port}`));

/**
 * @api {get} /packs Get all packs
 * @apiName GetPacks
 * @apiGroup Pack
 * 
 * This endpoint returns all packs as a JSON array of pack objects from the Firebase Realtime 
 * database. This endpoint is used to give the frontend access to all packs in the system.
 * 
 * @apiSuccess {Object[]} packs List of packs
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      packs: [
 *      { 
 *          id: 1,
 *          name: "Pack1",
 *          description: "Pack1 Description",
 *          invitedMembers: "tjwalter,jchelton",
 *          joinedMembers: "tjwalter",
 *          owner: "tjwalter",
 *          tasks: [{
 *              "id": 1,
 *              "name": "Task 1",
 *              "description": "Description 1",
 *              "assigned": [
 *                  "jchelton"
 *              ],
 *              "dueDate": "10/26/2021"
 *          }],
 *          meetings: [{
 *              "id": 1,
 *              "name": "Meeting 1",
 *              "date": "10/31/2021",
 *              "time": "11:00",
 *              "url": "zoomurl"
 *          }]
 *      },
 *      ...
 *      ]
 *  }
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *      "No packs in system!"
 *  }
 *
 */
app.get('/api/packs', (req, res) => {
    // Retrieve array of all pack objects from data source then return with a 200 response with array of packs
    // Return 400 if issue occurs
    database.get(database.ref(db, 'packs')).then(data => {
        let resp = data.val();
        let ret = [];
        if (resp != null) {
            for (let i = 0; i < resp.length; i++) {
                let pack = resp[i];
                if (pack !== undefined) {
                    if (pack["joinedMembers"] === undefined) {
                        pack["joinedMembers"] = [];
                    }
                    if (pack["invitedMembers"] === undefined) {
                        pack["invitedMembers"] = [];
                    }
                    if (pack["tasks"] === undefined) {
                        pack["tasks"] = [];
                    }
                    pack.tasks = pack.tasks.filter(t => t !== null);
                    if (pack["meetings"] === undefined) {
                        pack["meetings"] = [];
                    }
                    ret.push(pack);
                }
            }
            res.status(200).send(ret);
        } else {
            res.status(404).send("No packs in system!");
        }
    });

});

/**
 * @api {post} /packs Create a new pack
 * @apiName CreatePack
 * @apiGroup Pack
 * 
 * This endpoint creates a pack from the request body and adds it to Firebase Realtime database, 
 * then returns the packs array.
 * 
 * @apiBody {Object} pack Pack object
 * @apiBodyExample {json} Request-Example:
 *  {
 *      "name": "Pack2",
 *      "description": "Pack2 Description",
 *      "invitedMembers": "tjwalter,jchelton",
 *      "joinedMembers": "tjwalter",
 *      "owner": "tjwalter"
 *  }
 * 
 * @apiSuccess {Object[]} packs List of packs
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      packs: [
 *      { 
 *          id: 1,
 *          name: "Pack1",
 *          description: "Pack1 Description",
 *          invitedMembers: "tjwalter,jchelton",
 *          joinedMembers: "tjwalter",
 *          owner: "tjwalter"
 *      },
 *      { 
 *          id: 2,
 *          name: "Pack2",
 *          description: "Pack2 Description",
 *          invitedMembers: "tjwalter,jchelton",
 *          joinedMembers: "tjwalter",
 *          owner: "tjwalter",
 *      },
 *      ...
 *      ]
 *  }
 */
app.post('/api/packs', (req, res) => {
    // Add pack object to data source then return with a 200 response response
    let packs = [];

    var body = req.body;
    let pack = {
        name: body.name,
        description: body.description,
        invitedMembers: body.invitedMembers,
        joinedMembers: body.joinedMembers,
        owner: body.owner,
        tasks: body.tasks,
        meetings: body.meetings
    };

    let newPackId = 1;

    database.get(database.ref(db, 'packs')).then(data => {
        packs = data.val();
        // Iterate through all packs and find the highest id
        if (packs != null) {
            for (let i = 0; i < packs.length; i++) {
                let pack = packs[i];
                if ( pack.id >= newPackId) {
                    newPackId = parseInt(pack.id) + 1;
                }
            }
        }

        if (packs != null) {
            pack.id = newPackId;
            packs.push(pack)
            let ref = database.ref(db, 'packs');
            database.set(ref, packs);
            res.status(200).send(packs);
        } else {
            packs = [];
            pack.id = 0;
            packs.push(pack);
            let ref = database.ref(db, 'packs');
            database.set(ref, packs);
            res.status(200).send(packs);
        }
    });
});

/**
 * @api {get} /packs/:id Get pack by id
 * @apiName GetPackById
 * @apiGroup Pack
 * 
 * @apiParam {Number} id Pack id
 * 
 * This endpoint returns a single pack object that coorelates to the id parameter passed in from 
 * the Firebase Realtime database. This endpoint is used to give the frontend access to a single
 * pack in the system.
 * 
 * @apiSuccess {Object} pack Pack object
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      packs:
 *      { 
 *          id: 1,
 *          name: "Pack1",
 *          description: "Pack1 Description",
 *          invitedMembers: "tjwalter,jchelton",
 *          joinedMembers: "tjwalter",
 *          owner: "tjwalter",
 *          tasks: [{
 *              "id": 1,
 *              "name": "Task 1",
 *              "description": "Description 1",
 *              "assigned": [
 *                  "jchelton"
 *              ],
 *              "dueDate": "10/26/2021"
 *          }],
 *          meetings: [{
 *              "id": 1,
 *              "name": "Meeting 1",
 *              "date": "10/31/2021",
 *              "time": "11:00",
 *              "url": "zoomurl"
 *          }]
 *      }
 *  }
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *      "No Packs!"
 *  }
 * 
 */
app.get('/api/packs/:id', (req, res) => {
    // Retrieve pack object from data source that match the id then return with a 200 response with Pack object
    // Return 404 if issue occurs
    let packs = [];
    database.get(database.ref(db, 'packs')).then(data => {
        let responded = data.val();
        if (responded != null) {
            for (let i = 0; i < responded.length; i++) {
                if (responded[i] !== undefined) {
                    packs.push(responded[i]);
                }
            }

            let foundArr = packs.filter(pack => pack !== undefined && pack !== null && pack.id + '' === req.params.id + '');

            if (foundArr.length === 1) {
                let pack = foundArr[0];
                if (pack["joinedMembers"] === undefined) {
                    pack["joinedMembers"] = [];
                }
                if (pack["invitedMembers"] === undefined) {
                    pack["invitedMembers"] = [];
                }
                if (pack["tasks"] === undefined) {
                    pack["tasks"] = [];
                } else if (pack.tasks.length > 0) {
                    pack.tasks = pack.tasks.filter(t => t !== null);
                }    
                if (pack["meetings"] === undefined) {
                    pack["meetings"] = [];
                }
                res.status(200).send(pack);
            } else {
                res.status(404).send("No Packs!");
            }

        } else {
            res.status(404).send("No Packs!");
        }
    });
});

/**
 * @api {delete} /pack/:id Delete pack by id
 * @apiName DeletePackById
 * @apiGroup Pack
 * 
 * @apiParam {Number} id Pack id
 * 
 * This endpoint deletes a pack, with the cooresponding id, from the Firebase Realtime database. 
 * This endpoint is used to give the frontend access to delete a pack from the system.
 * 
 * @apiSuccess {String} message Success message
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *     "Pack deleted successfully!"
 *  }
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *     "No Packs!"
 *  }
 */
app.delete('/api/pack/:id', (req, res) => {
    // Delete pack object from data source matches the id passed in then return with a 200 response
    // Return 404 if issue occurs
    let packs = [];

    database.get(database.ref(db, 'packs')).then(data => {
        let responded = data.val();
        if (responded != null) {
            for (let i = 0; i < responded.length; i++) {
                if (responded[i] !== undefined) {
                    packs.push(responded[i]);
                }
            }

            packs = packs.filter((i) => i.id !== parseInt(req.params.id));

            let ref = database.ref(db, 'packs');
            database.set(ref, packs);
            res.status(200).send("Pack deleted successfully!");
        } else {
            res.status(404).send("No Packs!");
        }
    });
})

/**
 * @api {put} /pack/:id Update pack by id
 * @apiName UpdatePackById
 * @apiGroup Pack
 * 
 * @apiParam {Number} id Pack id
 * 
 * This endpoint updates a pack with the cooresponding id in the Firebase Realtime Database and 
 * returns the updated pack object. This endpoint is used to give the frontend access to update a 
 * pack from the system.
 * 
 * @apiBody {Object} pack Pack object
 * @apiBodyExample {json} Request-Example:
 *  {
 *      "name": "Pack2Updated",
 *      "description": "Pack2 Description Updated",
 *      "invitedMembers": "tjwalter,jchelton, mjlerro",
 *      "joinedMembers": "tjwalter",
 *      "owner": "tjwalter",
 *  }
 * 
 * @apiSuccess {Object} pack Pack object
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "id": 2,
 *      "name": "Pack2Updated",
 *      "description": "Pack2 Description Updated",
 *      "invitedMembers": "tjwalter,jchelton, mjlerro",
 *      "joinedMembers": "tjwalter",
 *      "owner": "tjwalter",
 *  }
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *     "No Packs!"
 *  }
 *  
 */
app.put('/api/pack/:id', (req, res) => {
    let packs = [];
    let packFoundIndex = -1;
    
    var body = req.body;
    body["id"] = parseInt(req.params.id);

    // Update pack from data source matches the id passed in then return with a 200 response
    // Return 404 if issue occurs
    // Get pack with id passed in
    database.get(database.ref(db, 'packs')).then(data => {
        let responded = data.val();
        if (responded != null) {
            for (let i = 0; i < responded.length; i++) {
                if (responded[i] !== undefined) {
                    if (responded[i] !== undefined) {
                        if (parseInt(responded[i].id) === parseInt(req.params.id)) {
                            packs.push(responded[i]);
                            packFoundIndex = i;
                        }
                    }
                }
            }

            // Update pack
            const updates = {};
            updates['/packs/' + packFoundIndex] = body;
            database.update(database.ref(db), updates);
            res.status(200).send(body);
        } else {
            res.status(404).send("No Packs!");
        }
    });
});


/**
 * @api {get} /packs/:id/task Get all tasks for pack by id
 * @apiName GetAllTasksForPackById
 * @apiGroup Task
 * 
 * @apiParam {Number} id Pack id
 * 
 * This endpoint returns the list of tasks from a single pack object that coorelates to the id 
 * parameter passed in from the Firebase Realtime database. This endpoint is used to give the 
 * frontend access to the task objects associate with a single pack in the system.
 * 
 * @apiSuccess {Object[]} tasks Task objects
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "tasks": [{
 *          "id": 1
 *          "name": "Task 1",
 *          "description": "Description 1",
 *          "assigned": [
 *              "jchelton"
 *          ],
 *          "dueDate": "10/26/2021"
 *      }]
 *  }
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *    "No Packs!"
 *  }
 */
app.get('/api/packs/:id/tasks', (req, res) => {
    let packs = [];
    database.get(database.ref(db, 'packs')).then(data => {
        let responded = data.val();
        if (responded != null) {
            for (let i = 0; i < responded.length; i++) {
                if (responded[i] !== undefined) {
                    packs.push(responded[i]);
                }
            }

            let foundArr = packs.filter((i) => parseInt(i.id) == parseInt(req.params.id));

            if (!(foundArr.length <= 0) && !(foundArr.length > 1)) {
                let pack = foundArr[0];
                if (pack["tasks"] == undefined) {
                    pack["tasks"] = [];
                }
                res.status(200).send(pack["tasks"]);
            } else {
                res.status(404).send("No Packs!");
            }

        } else {
            res.status(404).send("No Packs!");
        }
    });
});

/**
 * @api {post} /packs/:id/tasks Add task to pack by id
 * @apiName AddTaskToPackById
 * @apiGroup Task
 * 
 * @apiParam {Number} id Pack id
 * 
 * This endpoint creates a task object on a pack from the request body and adds it to pack object 
 * in the Firebase Realtime database, then returns the tasks array.
 * 
 * @apiBody {Object} task Task object
 * @apiBodyExample {json} Request-Example:
 *  {
 *      "name": "Task 2",
 *      "description": "Description 2",
 *      "assigned": [
 *          "tjwalter"
 *      ],
 *      "dueDate": "11/1/2021"
 *  }
 * 
 * @apiSuccess {Object[]} tasks Task objects
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "tasks": [{
 *          "id": 1
 *          "name": "Task 1",
 *          "description": "Description 1",
 *          "assigned": [
 *              "jchelton"
 *          ],
 *          "dueDate": "10/26/2021"
 *      },
 *      {
 *          "id": 2
 *          "name": "Task 2",
 *          "description": "Description 2",
 *          "assigned": [
 *              "tjwalter"
 *          ],
 *          "dueDate": "11/1/2021"
 *     }]
 *  }
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *      "No Packs!"
 *  }
 */
app.post('/api/packs/:id/tasks', (req, res) => {
    let packs = [];

    var body = req.body;

    database.get(database.ref(db, 'packs')).then(data => {
        let responded = data.val();
        if (responded != null) {
            for (let i = 0; i < responded.length; i++) {
                if (responded[i] !== undefined) {
                    packs.push(responded[i]);
                }
            }


            let pack = packs.filter((i) => parseInt(i.id) === parseInt(req.params.id))[0];
            // Delete Pack first
            packs = packs.filter((i) => {
                if (parseInt(i.id) !== parseInt(req.params.id)) {
                    return i;
                }
            });

            let ref = database.ref(db, 'packs');
            database.set(ref, packs);

            if (pack != null) {
                if (packs != null) {
                    if (pack["tasks"] === undefined) {
                        pack["tasks"] = [];
                        body["id"] = 0;
                        pack["tasks"].push(body);
                    } else {
                        body["id"] = pack["tasks"].length;
                        pack["tasks"].push(body);
                    }
                    packs.push(pack);
                    let ref = database.ref(db, 'packs');
                    database.set(ref, packs);
                    res.status(200).send(packs);
                } else {
                    packs = [];
                    if (pack["tasks"] === undefined) {
                        pack["tasks"] = [];
                        body["id"] = 0;
                        pack["tasks"].push(body);
                    } else {
                        body["id"] = pack["tasks"].length;
                        pack["tasks"].push(body);
                    }
                    packs.push(pack);
                    let ref = database.ref(db, 'packs');
                    database.set(ref, packs);
                    res.status(200).send(pack["tasks"]);
                }
            } else {
                res.status(404).send("No Packs! asda");
            }
        } else {
            res.status(404).send("No Packs! aaa");
        }
    });
});

/**
 * @api {put} /packs/:id/tasks/:taskId Update task by id
 * @apiName UpdateTaskById
 * @apiGroup Task
 * 
 * @apiParam {Number} id Pack id
 * @apiParam {Number} taskId Task id
 * 
 * This endpoint updates a task, with the cooresponding id, in a pack, with the cooresponding id, 
 * in the Firebase Realtime Database and returns the updated task. This endpoint is used to give 
 * the frontend access to update a task in a pack from the system.
 * 
 * @apiBody {Object} task Task object
 * @apiBodyExample {json} Request-Example:
 *  {
 *      "name": "Updated Task 1",
 *      "description": "Updated Description 1",
 *      "assigned": [
 *          "tjwalter,jchelton"
 *      ],
 *      "dueDate": "11/1/2021"
 *  }
 * 
 * @apiSuccess {Object} task Task object
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "name": "Updated Task 1",
 *      "description": "Updated Description 1",
 *      "assigned": [
 *          "tjwalter,jchelton"
 *      ],
 *      "dueDate": "11/1/2021"
 *  }
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *     "No Packs!"
 *  }
 */
app.put('/api/packs/:id/task/:taskId', (req, res) => {
    let packs = [];
    let packFoundIndex = -1;
    let taskFoundIndex = -1;

    var body = req.body;
    body["id"] = req.params.taskId;

    // Update task from data source matches the id passed in then return with a 200 response
    // Return 404 if issue occurs
    // Get pack with id passed in
    database.get(database.ref(db, 'packs')).then(data => {
        let responded = data.val();
        if (responded != null) {
            for (let i = 0; i < responded.length; i++) {
                if (responded[i] !== undefined) {
                    if (responded[i].id == req.params.id) {
                        packs.push(responded[i]);
                        packFoundIndex = i;
                    }
                }
            }
            // Iterate through tasks and update the task with the id passed in
            packs.forEach(pack => {
                if (pack["tasks"] != undefined) {
                    pack["tasks"].forEach((task, index) => {
                        if (task.id == req.params.taskId) {
                            taskFoundIndex = index;
                        }
                    });
                } else {
                    res.status(404).send("No Tasks!");
                }
            });

            // Update task
            const updates = {};
            updates['/packs/' + packFoundIndex + '/tasks/' + taskFoundIndex] = body;
            database.update(database.ref(db), updates);

            res.status(200).send(body);
        } else {
            res.status(404).send("No Packs!");
        }
    });
});

/**
 * @api {delete} /packs/:id/tasks/:taskId Delete task by id
 * @apiName DeleteTaskById
 * @apiGroup Task
 * 
 * @apiParam {Number} id Pack id
 * @apiParam {Number} taskId Task id
 * 
 * This endpoint deletes a task, with the cooresponding id, from a pack, with the cooresponding id,
 * from the Firebase Realtime database. This endpoint is used to give the frontend access to delete
 * a task from a pack in the system.
 * 
 * @apiSuccess {String} message Success message
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *     "Task Deleted!"
 *  }
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *     "No Packs!"
 *  }
 *  - or -
 * 
 *  HTTP/1.1 404 Not Found
 *  {
 *   "No Tasks!"
 *  }
 * 
 */
app.delete('/api/packs/:id/task/:taskId', (req, res) => {
    let packs = [];
    let packFoundIndex = -1;
    let taskFoundIndex = -1;

    var body = {};

    // Delete task from data source matches the id passed in then return with a 200 response
    // Return 404 if issue occurs
    // Get pack with id passed in
    database.get(database.ref(db, 'packs')).then(data => {
        let responded = data.val();
        if (responded != null) {
            for (let i = 0; i < responded.length; i++) {
                if (responded[i] !== undefined && responded[i] !== null) {
                    if (parseInt(responded[i].id) === parseInt(req.params.id)) {
                        
                        packs.push(responded[i]);
                        packFoundIndex = i;
                    }
                }
            }
            // Iterate through tasks and update the task with the id passed in
            packs.forEach(pack => {
                if (pack["tasks"] !== undefined) {
                    pack["tasks"].forEach((task, index) => {
                        if (parseInt(task.id) === parseInt(req.params.taskId)) {
                            taskFoundIndex = index;
                        }
                    });
                } else {
                    res.status(404).send("No Tasks!");
                }
            });

            // Update task
            const updates = {};
            updates['/packs/' + packFoundIndex + '/tasks/' + taskFoundIndex] = body;
            database.update(database.ref(db), updates);

            res.status(200).send("Task Deleted!");
        } else {
            res.status(404).send("No Packs!");
        }
    });
});

/**
 * @api {get} /packs/:id/meetings Get all meetingss for pack by id
 * @apiName GetAllMeetingsForPackById
 * @apiGroup Meeting
 * 
 * @apiParam {Number} id Pack id
 * 
 * This endpoint returns the list of meetings from a single pack object, that coorelates to the id
 * parameter passed in, from the Firebase Realtime database. This endpoint is used to give the 
 * frontend access to the meetings objects associate with a single pack in the system.
 * 
 * @apiSuccess {Object[]} meetings List of meetings objects
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "meetings": [{
 *          "id": 1
 *          "name": "Meeting 1",
 *          "date": "11/1/2021",
 *          "time": "11:00",
 *          "url": "zoomurl"
 *      },
 *      ...
 *      ]
 *  }
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *    "No Packs!"
 *  }
 */
app.get('/api/packs/:id/meetings', (req, res) => {
    let packs = [];
    database.get(database.ref(db, 'packs')).then(data => {
        let responded = data.val();
        if (responded != null) {
            for (let i = 0; i < responded.length; i++) {
                if (responded[i] !== undefined) {
                    packs.push(responded[i]);
                }
            }

            let foundArr = packs.filter((i) => i.id === parseInt(req.params.id));

            if (!(foundArr.length <= 0) && !(foundArr.length > 1)) {
                let pack = foundArr[0];
                if (pack["meetings"] === undefined) {
                    pack["meetings"] = [];
                }
                res.status(200).send(pack["meetings"]);
            } else {
                res.status(404).send("No Packs!");
            }

        } else {
            res.status(404).send("No Packs!");
        }
    });
});

/**
 * @api {post} /packs/:id/meetings Post meeting to pack by id
 * @apiName PostMeetingToPackById
 * @apiGroup Meeting
 * 
 * @apiParam {Number} id Pack id
 * 
 * This endpoint creates a meeting object on a pack from the request body and adds it to pack 
 * object in the Firebase Realtime database, then returns the updated meetings array.
 * 
 * @apiBody {Object} meeting Meeting object
 * @apiBodyExample {json} Request-Example:
 *  {
 *      "name": "Meeting 2",
 *      "date": "11/2/2021",
 *      "time": "13:00",
 *      "url": "zoomurl"
 *  }
 * 
 * @apiSuccess {Object[]} meetings List of meetings objects
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "meetings": [{
 *          "id": 1
 *          "name": "Meeting 1",
 *          "date": "11/1/2021",
 *          "time": "11:00",
 *          "url": "zoomurl"
 *      },
 *      {
 *          "id": 2
 *          "name": "Meeting 2",
 *          "date": "11/2/2021",
 *          "time": "13:00",
 *          "url": "zoomurl"
 *      },
 *      ...
 *      ]
 *  }
 */
app.post('/api/packs/:id/meetings', (req, res) => {
    let packs = [];

    var body = req.body;

    database.get(database.ref(db, 'packs')).then(data => {
        let responded = data.val();
        if (responded != null) {
            for (let i = 0; i < responded.length; i++) {
                if (responded[i] !== undefined) {
                    packs.push(responded[i]);
                }
            }

            let pack = packs.filter((i) => i.id === parseInt(req.params.id))[0];
            // Delete Pack first
            packs = packs.filter((i) => i.id !== parseInt(req.params.id));

            let ref = database.ref(db, 'packs');
            database.set(ref, packs);

            if (pack != null) {
                if (packs != null) {
                    if (pack["meetings"] === undefined) {
                        pack["meetings"] = [];
                        body["id"] = 1;
                        pack["meetings"].push(body);
                    } else {
                        body["id"] = pack["meetings"].length + 1;
                        pack["meetings"].push(body);
                    }
                    packs.push(pack);
                    let ref = database.ref(db, 'packs');
                    database.set(ref, packs);
                    res.status(200).send(packs);
                } else {
                    packs = [];
                    if (pack["meetings"] === undefined) {
                        pack["meetings"] = [];
                        body["meetings"] = 1;
                        pack["meetings"].push(body);
                    } else {
                        body["meetings"] = pack["meetings"].length + 1;
                        pack["meetings"].push(body);
                    }
                    packs.push(pack);
                    let ref = database.ref(db, 'packs');
                    database.set(ref, packs);
                    res.status(200).send(packs);
                }
            } else {
                res.status(404).send("Pack not found!");
            }
        } else {
            res.status(404).send("No Packs!");
        }
    });
});

/**
 * @api {put} /packs/:id/meetings/:id Update meeting by pack id and meeting id
 * @apiName UpdateMeetingById
 * @apiGroup Meeting
 * 
 * @apiParam {Number} id Pack id
 * @apiParam {Number} id Meeting id
 * 
 * This endpoint updates a meeting, with the cooresponding id, in a pack, with the cooresponding 
 * id, in the Firebase Realtime Database and returns the updated meeting. This endpoint is used to
 * give the frontend access to update a meeting in a pack from the system.
 * 
 * @apiBody {Object} meeting Meeting object
 * @apiBodyExample {json} Request-Example:
 *  {
 *      "name": "Meeting 2 Updated",
 *      "date": "11/2/2021",
 *      "time": "15:00",
 *      "url": "zoomurl"
 *  }
 * 
 * @apiSuccess {Object} meeting Meeting object
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "id": 2,
 *      "name": "Meeting 2 Updated",
 *      "date": "11/2/2021",
 *      "time": "15:00",
 *      "url": "zoomurl"
 *  }
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *      "No Packs!"
 *  }
 */
app.put('/api/packs/:id/meeting/:meetingId', (req, res) => {
    let packs = [];
    let packFoundIndex = -1;
    let meetingFoundIndex = -1;

    var body = req.body;
    body["id"] = req.params.meetingId;

    // Update meeting from data source matches the id passed in then return with a 200 response
    // Return 404 if issue occurs
    // Get pack with id passed in
    database.get(database.ref(db, 'packs')).then(data => {
        let responded = data.val();
        if (responded != null) {
            for (let i = 0; i < responded.length; i++) {
                if (responded[i] !== undefined) {
                    if (responded[i].id === parseInt(req.params.id)) {
                        packs.push(responded[i]);
                        packFoundIndex = i;
                    }
                }
            }
            // Iterate through meetings and update the meeting with the id passed in
            packs.forEach(pack => {
                if (pack["meetings"] !== undefined) {
                    pack["meetings"].forEach((task, index) => {
                        if (task.id === req.params.meetingId) {
                            meetingFoundIndex = index;
                        }
                    });
                } else {
                    res.status(404).send("No Meetings!");
                }
            });

            // Update meeting
            const updates = {};
            updates['/api/packs/' + packFoundIndex + '/meetings/' + meetingFoundIndex] = body;
            database.update(database.ref(db), updates);

            res.status(200).send(body);
        } else {
            res.status(404).send("No Packs!");
        }
    });
});

/**
 * @api {delete} /packs/:id/meetings/:id Delete meeting by pack id and meeting id
 * @apiName DeleteMeetingById
 * @apiGroup Meeting
 * 
 * @apiParam {Number} id Pack id
 * @apiParam {Number} id Meeting id
 * 
 * This endpoint deletes a meeting, with the cooresponding id, from a pack, with the cooresponding 
 * id, from the Firebase Realtime database. This endpoint is used to give the frontend access to 
 * delete a meeting from a pack in the system.
 * 
 * @apiSuccess {String} message Success message
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *     "Meeting Deleted!"
 *  }
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *     "No Packs!"
 *  }
 *  - or -
 * 
 *  HTTP/1.1 404 Not Found
 *  {
 *   "No Meetings!"
 *  }
 */
app.delete('/api/packs/:id/meeting/:meetingId', (req, res) => {
    let packs = [];
    let packFoundIndex = -1;
    let meetingFoundIndex = -1;

    var body = {};

    database.get(database.ref(db, 'packs')).then(data => {
        let responded = data.val();
        if (responded != null) {
            for (let i = 0; i < responded.length; i++) {
                if (responded[i] !== undefined) {
                    if (responded[i].id === parseInt(req.params.id)) {
                        packs.push(responded[i]);
                        packFoundIndex = i;
                    }
                }
            }
            // Iterate through meetings and update the meeting with the id passed in
            packs.forEach(pack => {
                if (pack["meetings"] !== undefined) {
                    pack["meetings"].forEach((task, index) => {
                        if (task.id === req.params.meetingId) {
                            meetingFoundIndex = index;
                        }
                    });
                } else {
                    res.status(404).send("No Meetings!");
                };
            });

            // Update meeting
            const updates = {};
            updates['/packs/' + packFoundIndex + '/meetings/' + meetingFoundIndex] = body;
            database.update(database.ref(db), updates);

            res.status(200).send("Meeting Deleted!");
        } else {
            res.status(404).send("No Packs!");
        }
    });
});