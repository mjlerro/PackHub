import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import MyNavbar from '../MyNavbar';
import { useHistory } from 'react-router-dom';

export default function ViewPacksComponent({onSelectPack, allPacks, currentUser}) {
    const history = useHistory();
    
    const [userHasPacks, setUserHasPacks] = useState(false);

    useEffect(() => {
        console.log(currentUser);
        for (let i = 0; i < allPacks.length; i++) {
            if (allPacks[i] === null || allPacks[i] === undefined) continue;
            if (allPacks[i].joinedMembers.includes(currentUser.displayName) || allPacks[i].owner === currentUser.displayName) {
                setUserHasPacks(true);
                break;
            }
        }
    }, [allPacks, currentUser]);

    return (
        <>
            <MyNavbar pageTitle={"My Packs"} currentUser={currentUser}/>
            <div className="p-5">
                {allPacks.length > 0 && allPacks.map(pack => pack !== null && pack !== undefined && (pack.joinedMembers.includes(currentUser.displayName) || pack.owner === currentUser.displayName) ? (
                    <div className="card mb-2" key={pack.id}>
                        <div className="card-body">
                            <h5 className="card-title">{pack.name}</h5>
                            <p className="card-text">{pack.description}</p>
                            <p className="card-text">Owner: {pack.owner === currentUser.displayName ? "Me" : pack.owner}</p>
                            <p className="card-text">Current Members: {pack.joinedMembers.length > 0 ? pack.joinedMembers.join(", ") : "No members have joined yet."}</p>
                            <p className="card-text">Invited Members: {pack.invitedMembers.length > 0 ? pack.invitedMembers.join(", ") : "There are no pending invitations."}</p>
                            <Button className="text-white" style={{alignSelf: "center", backgroundColor: "darkred", border: "none"}} onClick={() => {
                                history.push(`/mypacks/${pack.id}`);
                            }}>
                                Go to Pack
                            </Button>
                        </div>
                    </div>
                ) : null)}
                {!userHasPacks && (
                    <div className="card mb-2">
                        <div className="card-body">
                            <h5 className="card-title">You have no packs</h5>
                            <p className="card-text">You can create or join a pack by clicking one of the buttons below</p>
                            <div>
                                <Button className="text-white" style={{alignSelf: "center", backgroundColor: "darkred", border: "none"}} onClick={() => history.push('/createpack')}>
                                    Create Pack
                                </Button>
                                <Button className="text-white mx-2" style={{alignSelf: "center", backgroundColor: "darkred", border: "none"}} onClick={() => history.push('/joinpack')}>
                                    Join Pack
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
