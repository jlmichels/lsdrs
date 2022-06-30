import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';

const DropoffSamples = () => {
    const [dropoffMaterial, setDropoffMaterial] = useState();
    const [dropoffQuantity, setDropoffQuantity] = useState();
    const [dropoffLot, setDropoffLot] = useState();

    /* TODO:
        Modal screen that displayed material, and allows input of lot and selection of quantity (10mg, 50mg, 200g, 2kg)
        Auth to get user
        Banner after successful dropoff that fades from view
    */

    const materials = ["A1", "B2", "C3", "D4", "E5", "F6"];

    return(
        <Fragment>
            Select Material
            <div className="d-flex justify-content-center flex-wrap">
                {materials.map((material) => (
                    <Button key={material} variant="outline-primary" size="lg" onClick={() => setDropoffMaterial(material)}>{material}</Button>    
                ))}
            </div>
        </Fragment>
    );
}

export default DropoffSamples;