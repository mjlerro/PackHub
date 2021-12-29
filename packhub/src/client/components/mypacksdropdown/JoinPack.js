import React, {useState} from 'react';
import MyNavbar from '../MyNavbar';
import Button from 'react-bootstrap/Button';
import PackCard from '../PackCard';
import { useHistory } from 'react-router-dom';

export default function JoinPack({allPacks, setAllPacks, currentUser}) {

    const history = useHistory();

    const [showJoined, setShowJoined] = useState(false);

    async function updatePack(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        return response.json();
    }

    const handleJoin = async (pack, idx) => {
        pack.joinedMembers.push(currentUser.displayName);
        const index = pack.invitedMembers.indexOf(currentUser.displayName);
        if (index > -1) pack.invitedMembers.splice(index, 1);
        await updatePack(`/api/pack/${pack.id}`, pack)
            .then(data => {
                setShowJoined(true);
                setTimeout(() => setShowJoined(false), 2000);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    let invites = allPacks.map(pack => pack !== null && pack !== undefined && pack.invitedMembers.includes(currentUser.displayName) ? pack : null).filter(pack => pack !== null);

    return (
        <>
            <MyNavbar pageTitle={"Join Pack"} currentUser={currentUser}/>
            <div className="p-5">
                {invites.length > 0 && allPacks.map((pack, idx) => pack.invitedMembers.includes(currentUser.displayName)
                    ? <PackCard pack={pack} idx={idx} currentUser={currentUser} handleJoin={handleJoin} />
                    : null
                )}
                {invites.length === 0 && (
                    <div className="card mb-2">
                        <div className="card-body">
                            <h5 className="card-title">You have no pending invitations.</h5>
                            <p className="card-text">You can create a pack below</p>
                            <Button className="text-white" style={{alignSelf: "center", backgroundColor: "darkred", border: "none"}} onClick={() => history.push('/createpack')}>
                                Create Pack
                            </Button>
                        </div>
                    </div>
                )}
                {showJoined && <div className="alert alert-success" role="alert">Joined Pack!</div>}
            </div>
        </>
    )
}
