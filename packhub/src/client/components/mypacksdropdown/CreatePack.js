import React, { useState } from 'react';
import MyNavbar from '../MyNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MoonLoader from "react-spinners/MoonLoader";

export default function CreatePack({ currentUser }) {

    async function postPack(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    const onFormSubmit = async e => {
        setIsLoading(true);
        e.preventDefault();
        let invitedMembers = packInvitees.split(',').map(unityId => unityId.trim());

        {/** If owner is invited, remove owner from invited members list */}
        if (invitedMembers.includes(currentUser.displayName)) {
            let index = invitedMembers.indexOf(currentUser.displayName);
            if (index > -1) {
                invitedMembers.splice(index, 1);
            }
        }
        
        let pack = {
            name: packName,
            description: packDescription,
            invitedMembers: invitedMembers,
            joinedMembers: [],
            owner: currentUser.displayName,
            tasks: [],
            meetings: []
        };

        setIsLoading(true);
        await postPack('/api/packs', pack)
            .then(data => {
                setIsLoading(false);
                setSuccess(true);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                setSuccess(false);
            });
    }

    const [packName, setPackName] = useState('');
    const handlePackNameChange = (e) => { setPackName(e.target.value) }
    const [packDescription, setPackDescription] = useState('');
    const handlePackDescriptionChange = (e) => { setPackDescription(e.target.value) }
    const [packInvitees, setPackInvitees] = useState('');
    const handlePackInviteesChange = (e) => { setPackInvitees(e.target.value) }
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    return (
        <>
            <MyNavbar pageTitle={"Create Pack"} currentUser={currentUser} />
            <div className="p-5">
                <Form onSubmit={onFormSubmit} className="d-flex justify-content-center flex-column">
                    <Form.Group className="mb-3" controlId="formBasicPackName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="text" placeholder="Comp Sci Group" value={packName} onChange={handlePackNameChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPackDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control required type="text" placeholder="This pack is for managing tasks for our project group, and ..." value={packDescription} onChange={handlePackDescriptionChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPackInvitees">
                        <Form.Label>Invite</Form.Label>
                        <Form.Control required type="text" placeholder="jchelton, tjwalter, mjlerro, ..." value={packInvitees} onChange={handlePackInviteesChange} />
                        <p><i>Please enter a comma-separated list of unity ID's of the students you want to invite</i></p>
                    </Form.Group>

                    {!isLoading && !success && <Button className="text-white" style={{ alignSelf: "center", backgroundColor: "darkred", border: "none" }} type="submit">
                        Create Pack
                    </Button>}
                    <MoonLoader color={"darkred"} loading={isLoading} css={"border-color: red; align-self: center;"} size={40} />
                    {success && (<>
                        <p style={{ color: "darkred" }}>Successfully created pack!</p>
                        <Button className="text-white" style={{ alignSelf: "center", backgroundColor: "darkred", border: "none" }} onClick={() => window.location.reload()}>
                            Create another?
                        </Button>
                    </>)}

                </Form>
            </div>
        </>
    )
}
