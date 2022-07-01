import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import DropoffLotQuantityModal from './dropoffLotQuantityModal.js';

const DropoffSamples = ( { handleNewSample }) => {
    const [dropoffMaterial, setDropoffMaterial] = useState();
    const [showModal, setShowModal] = useState(false);

    const handleOnClick = (material) => {
        setDropoffMaterial(material)
        toggleShowModal();
    }

    const toggleShowModal = () => {
        setShowModal(!showModal);
    }

    /* TODO:
        Auth to get user
        Banner after successful dropoff that fades from view
        Refactor containers
    */

    const materials = ["A1", "B2", "C3", "D4", "E5", "F6"];

    return(
        <Fragment>
            Select Material
            <div className="d-flex justify-content-center flex-wrap">
                {materials.map((material) => (
                    /* Deselect button after modal close */
                    <Button key={material} variant="outline-primary" size="lg" onClick={() => handleOnClick(material)}>{material}</Button>    
                ))}
            </div>
            <DropoffLotQuantityModal showModal={showModal} toggleShowModal={toggleShowModal} dropoffMaterial={dropoffMaterial} handleNewSample={handleNewSample}/>
        </Fragment>
    );
}

export default DropoffSamples;