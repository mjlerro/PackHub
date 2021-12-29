import React, {useEffect} from 'react';
import Pack from '../components/Pack';
import ViewPacksComponent from './mypacksdropdown/ViewPacksComponent';
import CreatePack from './mypacksdropdown/CreatePack';
import JoinPack from './mypacksdropdown/JoinPack';
import {useParams} from 'react-router-dom';

export default function ViewPacks({currentUser, allPacks, setAllPacks, createPack, joinPack}) {

    // If the url has an ID, it should display the Pack component
    const {id} = useParams();

    useEffect(() => {
        (document.title = 'PackHub | My Packs');
    }, []);

    return (
        <>
            {!createPack && !joinPack && id !== undefined && <Pack urlId={id} currentUser={currentUser} /> }
            {!createPack && !joinPack && id === undefined && <ViewPacksComponent allPacks={allPacks} currentUser={currentUser} /> }
            {createPack && !joinPack && <CreatePack currentUser={currentUser} /> }
            {!createPack && joinPack && <JoinPack setAllPacks={setAllPacks} allPacks={allPacks} currentUser={currentUser} /> }
        </>
    )
}