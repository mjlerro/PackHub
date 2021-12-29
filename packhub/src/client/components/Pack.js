import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import MyNavbar from './MyNavbar';
import Tasks from './packviews/Tasks';
import CreateTask from './packviews/CreateTask';
import MoonLoader from "react-spinners/MoonLoader";
import { useHistory } from 'react-router-dom';
import '../App.css';

export default function Pack({ currentUser, urlId }) {
    const history = useHistory();

    const [pack, setPack] = useState({});
    const [creatingTask, setCreatingTask] = useState(false);
    const [taskCRUD, setTaskCRUD] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showTasks, setShowTasks] = useState(false);
    const [owner, setOwner] = useState('');
    const [packInvitees, setPackInvitees] = useState('');
    const [usersAdded, setUsersAdded] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const handlePackInviteesChange = (e) => { setPackInvitees(e.target.value) }

    async function deletePack(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response;
    };

    {/** Delete Pack if you are the owner */ }
    {/** Not Working - Potential Backend Issue */ }
    const onDelete = async () => {
        if (owner === currentUser.displayName) {
            if (window.confirm('Are you sure? This action cannot be reverted.')) {
                await deletePack(`/api/pack/${urlId}`)
                    .then(data => {
                    })
                    .catch(err => console.log(err));
                history.push('/mypacks');
            }
        } else {
            alert('Error: Not owner of Pack');
        }
    };

    async function putNewUsers(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    {/** Add new users to Pack if owner */ }
    {/** Not Working - When adding users it creates a -1 index in the Realtime Database for some reason??????? */ }
    const onPutUsers = async (e) => {
        e.preventDefault();
        if (owner === currentUser.displayName) {
            let invitedMembers = packInvitees.split(',').map(unityId => unityId.trim());

            {/** If owner is invited, remove owner from invited members list */ }
            if (invitedMembers.includes(currentUser.displayName)) {
                let index = invitedMembers.indexOf(currentUser.displayName);
                if (index > -1) {
                    invitedMembers.splice(index, 1);
                }
            }

            for (let i = 0; i < invitedMembers.length; i++) {
                pack.invitedMembers.push(invitedMembers[i])
            }

            await putNewUsers(`/api/pack/${urlId}`, pack)
                .then(data => {
                    setShowForm(false);
                    setUsersAdded(true);
                })
                .catch((err) => {
                    console.log(err);
                    setUsersAdded(false);
                });
        } else {
            alert('Error: Not owner of Pack');
        }
    }

    {/** Remove user from Pack if not the owner */ }
    {/** TODO */ }
    const removeUser = async () => {
        if (owner === currentUser.displayName) {
            alert('Error: Users cannot leave packs they have created')
        } else {
            if (window.confirm('Are you sure? This action cannot be reverted.')) {
                const index = pack.joinedMembers.indexOf(currentUser.displayName);
                if (index > -1) pack.joinedMembers.splice(index, 1);

                await putNewUsers(`/api/pack/${urlId}`, pack)
                    .then(() => {
                        history.push('/mypacks');
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                
            }
        }
    }

    const Results = () => (
        <div className="d-flex justify-content-center flex-column">
            <Form onSubmit={onPutUsers} >
                <Form.Group controlId="formBasicPackInvitees">
                    <Form.Label>Invite</Form.Label>
                    <Form.Control autoFocus required type="text" placeholder="jchelton, tjwalter, mjlerro, ..." value={packInvitees} onChange={handlePackInviteesChange} />
                    <p><i>Please enter a comma-separated list of unity ID's of the students you want to invite</i></p>
                </Form.Group>
                <Button className="text-white" style={{ alignSelf: "center", backgroundColor: "darkred", border: "none" }} type="submit">
                    Add User(s)
                </Button>
                <br />
                {usersAdded && <p style={{ color: "darkred", marginTop: "1%" }}>Successfully added member(s)!</p>}
            </Form>
        </div>
    )

    useEffect(() => {
        setIsLoading(true);
        setTaskCRUD(false);
        fetch(`/api/packs/${urlId}`)
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(body => {
                            setOwner(body.owner);
                            if (body.invitedMembers.includes(currentUser.displayName) || body.joinedMembers.includes(currentUser.displayName) || body.owner === currentUser.displayName) {
                                let packFromServer = body;
                                if (packFromServer.assigned === undefined) packFromServer.assigned = [];
                                setShowTasks(packFromServer !== null && packFromServer.tasks !== undefined && packFromServer.tasks !== null && packFromServer.tasks.length > 0);
                                setPack(packFromServer);
                            } else {
                                alert('404: Pack not found');
                                history.push('/mypacks');
                            }

                            setIsLoading(false);
                        })
                        .catch(err => {
                            setIsLoading(false);
                        });
                } else {
                    setIsLoading(false);
                    alert(res.statusText);
                    history.push('/mypacks');
                }
            })

    }, [taskCRUD, currentUser, urlId, history]);

    return (
        <>
            <MyNavbar pageTitle={pack.name} currentUser={currentUser} />
            <div className="p-1">
                {isLoading && (
                    <MoonLoader color={"darkred"} loading={isLoading} css={"border-color: red;"} size={40} />
                )}
                {!isLoading && (
                    <Tab.Container id="tabs" defaultActiveKey="tasks" >
                        <Row>
                            <Col sm={2}>
                                <Nav variant="pills" className="flex-column tabs">
                                    <Nav.Item>
                                        <Nav.Link eventKey="tasks">Tasks</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="managePack">Manage Pack</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>

                            <Col sm={10}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="tasks">
                                        {!creatingTask && !isLoading && showTasks && <Tasks currentUser={currentUser} pack={pack} creatingTask={creatingTask} setCreatingTask={setCreatingTask} setTaskDeleted={setTaskCRUD} id={urlId} />}
                                        {!creatingTask && !isLoading && !showTasks && (
                                            <div className="card mb-2">
                                                <div className="card-body">
                                                    <h5 className="card-title">Your pack has no tasks.</h5>
                                                    <Button className="text-white" style={{ alignSelf: "center", backgroundColor: "darkred", border: "none" }} onClick={() => setCreatingTask(true)}>
                                                        Create Task
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {creatingTask && <CreateTask id={urlId} currentUser={currentUser} setCreatingTask={setCreatingTask} setTaskCreated={setTaskCRUD} pack={pack} />}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="managePack">
                                        <h2>Manage Pack</h2>
                                        <div className="d-flex justify-content-center flex-column">
                                            {pack.owner === currentUser.displayName && <Button onClick={() => setShowForm(!showForm)} className="text-white" style={{ marginTop: "10%", alignSelf: "center", backgroundColor: "darkred", border: "none", width: "20vw" }}>
                                                Add New Members
                                            </Button>}
                                            {showForm ? <Results /> : null}
                                            {pack.owner !== currentUser.displayName && <Button onClick={() => removeUser()} className="text-white" style={{ marginTop: "10%", alignSelf: "center", backgroundColor: "darkred", border: "none", width: "20vw" }}>
                                                Leave Pack
                                            </Button>}
                                            {pack.owner === currentUser.displayName && <Button onClick={() => onDelete()} className="text-white" style={{ marginTop: "1%", alignSelf: "center", backgroundColor: "darkred", border: "none", width: "20vw" }}>
                                                Delete Pack
                                            </Button>}
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                )}
            </div>

        </>
    )
}
