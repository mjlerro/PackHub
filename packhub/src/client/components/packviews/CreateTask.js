import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MoonLoader from "react-spinners/MoonLoader";

export default function CreateTask({id, setCreatingTask, setTaskCreated, currentUser, pack}) {

    async function postTask(url = '', data = {}) {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        });
        return response.json();
    }

    const onFormSubmit = async e => {
        setSuccess(false);
        setIsLoading(true);
        e.preventDefault();

        let assignTo = taskAssigned.split(',').filter(item => item !== '').map(unityId => unityId.trim()).length > 0
            ? taskAssigned.split(',').filter(item => item !== '').map(unityId => unityId.trim())
            : [];

        let task = {
            name: taskName,
            description: taskDescription,
            assigned: assignTo,
            dueDate: taskDueDate,
            owner: currentUser.displayName
        };
        
        await postTask(`/api/packs/${id}/tasks`, task)
            .then(data => {
                setIsLoading(false);
                setSuccess(true);
                setTaskCreated(true); // this lets the parent node know that it should reload
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                setSuccess(false);
            });
    }

    const resetFields = () => {
        setTaskName('');
        setTaskDescription('');
        setTaskAssigned('');
        setTaskDueDate('');
        setSuccess(false);
    }

    const [taskName, setTaskName] = useState('');
    const handleTaskNameChange = (e) => { setTaskName(e.target.value) }
    const [taskDescription, setTaskDescription] = useState('');
    const handleTaskDescriptionChange = (e) => { setTaskDescription(e.target.value) }
    const [taskAssigned, setTaskAssigned] = useState('');
    const handleTaskAssignedChange = (e) => {
        taskAssigned.includes(e.target.name)
            ? setTaskAssigned(taskAssigned.replace(e.target.name, ''))
            : setTaskAssigned(e.target.name + ',' + taskAssigned);
    }
    const [taskDueDate, setTaskDueDate] = useState('');
    const handleTaskDueDateChange = (e) => { setTaskDueDate(e.target.value) }
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const [possibleMembersToAssign, setPossibleMembersToAssign] = useState([]);

    useEffect(() => setPossibleMembersToAssign([...pack.joinedMembers, pack.owner]), [pack]);
    
    return (
        <>
            <div className="p-5">
                <Form onSubmit={onFormSubmit} className="d-flex justify-content-center flex-column">
                    <Form.Group className="mb-3" controlId="formBasicTaskName">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control required type="text" placeholder="" value={taskName} onChange={handleTaskNameChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTaskDescription">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control required type="text" placeholder="" value={taskDescription} onChange={handleTaskDescriptionChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTaskAssigned">
                        <Form.Label>Assign To</Form.Label>
                        <Form.Control required as="checkbox" value={taskAssigned} onChange={handleTaskAssignedChange}>
                            {possibleMembersToAssign.map((member, idx) => (
                                <Form.Check type="checkbox" label={member} name={member} key={idx}/>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTaskDueDate">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control required type="date" placeholder="Due Date" value={taskDueDate} onChange={handleTaskDueDateChange}/>
                    </Form.Group>
                    
                    {!isLoading && !success &&
                        <Button className="text-white mb-3" style={{alignSelf: "center", backgroundColor: "darkred", border: "none", width: "150px"}} type="submit">
                            Create Task
                        </Button>
                    }
                    {!isLoading && success && 
                        <Button className="text-white mb-3" style={{alignSelf: "center", backgroundColor: "darkred", border: "none", width: "150px"}} onClick={() => resetFields()}>
                            Create another?
                        </Button>
                    }
                    {!isLoading && <Button className="text-white" variant="dark" style={{alignSelf: "center", width: "150px"}} onClick={() => setCreatingTask(false)}>
                        Cancel
                    </Button>}
                    <MoonLoader color={"darkred"} loading={isLoading} css={"border-color: red; align-self: center;"} size={40} />
                    {success && <p style={{color: "darkred"}}>Successfully created task!</p>}
                </Form>
            </div>
        </>
    )
}
