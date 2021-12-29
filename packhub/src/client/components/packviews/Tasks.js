import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';

export default function Tasks({creatingTask, setCreatingTask, setTaskDeleted, id, currentUser, pack}) {

    const [myTasks, toggleMyTasks] = useState(false);

    async function deleteTask(url = '', data = {}) {
        const response = await fetch(url, {
          method: 'DELETE',
          credentials: 'same-origin',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        });
        return response;
    }

    const handleDeleteTask = async (task) => {
        if (window.confirm('Are you sure you want to complete task: ' + task.name + ' ?')) {
            await deleteTask(`/api/packs/${id}/task/${task.id}`)
                .then(data => {
                    setTaskDeleted(true);
                })
                .catch(err => console.log(err))
        }
    };

    return (
        <div className="p-0">
            <Button className="text-white mx-2" style={{backgroundColor: "darkred", border: "none"}} onClick={() => setCreatingTask(true)}>
                Add Task +
            </Button>
            {myTasks && <Button className="text-white mx-2" style={{backgroundColor: "darkred", border: "none"}} onClick={() => toggleMyTasks(!myTasks)}>
                Assigned To Me
            </Button>}
            {!myTasks && <Button className="mx-2" style={{color:"darkred", backgroundColor: "white", border: "1px darkred"}} onClick={() => toggleMyTasks(!myTasks)}>
                Assigned To Me
            </Button>}
            <br/>
            {!myTasks && pack.tasks.length > 0 && pack.tasks.map(task => (
                <div className="card m-2 d-inline-flex" style={{width: "300px"}} key={task.id}>
                    <div className="card-body">
                        <h5 className="card-title">{task.name}</h5>
                        <p className="card-text">{task.description}</p>
                        <p className="card-text" style={{color: "black"}}>Assigned: {task && task.assigned && task.assigned.length > 0 ? task.assigned.join(", ") : "Anyone"}</p>
                        <p className="card-text">Due: <span style={(task.dueDate < Date.now()) ? {color:"darkred"} : {color:"black"}}>{task.dueDate.toLocaleString()}</span></p>
                        <Button className="text-white" style={{backgroundColor: "darkred", border: "none"}} onClick={() => {
                            handleDeleteTask(task);
                        }}>
                            Complete
                        </Button>
                    </div>
                </div>
            ))}
            {myTasks && pack.tasks.length > 0 && pack.tasks.map(task => task && task.assigned && task.assigned.includes(currentUser.displayName) && (
                <div className="card m-2 d-inline-flex" style={{width: "300px"}} key={task.id}>
                    <div className="card-body">
                        <h5 className="card-title">{task.name}</h5>
                        <p className="card-text">{task.description}</p>
                        <p className="card-text" style={{color: "black"}}>Assigned: {task && task.assigned && task.assigned.length > 0 ? task.assigned.join(", ") : "Anyone"}</p>
                        <p className="card-text">Due: <span style={(task.dueDate < Date.now()) ? {color:"darkred"} : {color:"black"}}>{task.dueDate.toLocaleString()}</span></p>
                        <Button className="text-white" style={{backgroundColor: "darkred", border: "none"}} onClick={() => {
                            handleDeleteTask(task);
                        }}>
                            Complete
                        </Button>
                    </div>
                </div>
            ))}
            {pack.tasks.length === 0 && (
                <div>No tasks created yet.</div>
            )}
        </div>
    );
}
