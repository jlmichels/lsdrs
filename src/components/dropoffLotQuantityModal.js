import React, { Fragment, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import ToggleButton from 'react-bootstrap/ToggleButton';

const DropoffLotQuantityModal = ({ showModal, toggleShowModal, dropoffMaterial, handleNewSample }) => {
    const [dropoffLot, setDropoffLot] = useState();
    const [dropoffQuantity, setDropoffQuantity] = useState();

    const radios = [
        { name: '10 mg', quantity: '10' },
        { name: '50 mg', quantity: '50' },
        { name: '200 g', quantity: '200' },
        { name: '2 kg', quantity: '2000' },
      ];

    const handleLotChange = (e) => {
        // No leading zeros
        e.currentTarget.value = e.currentTarget.value.replace(/^0*/, "");

        // No characters other than 0-9
        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");

        setDropoffLot(e.currentTarget.value);
    }

    const handleClose = () => {
        setDropoffQuantity("");
        toggleShowModal();
    }

    const postSample = async () => {
        try {
            const newSample = await fetch("http://localhost:3001/samples", {
                method:"POST",
                body: JSON.stringify({
                    user_id: 1,
                    material: dropoffMaterial,
                    lot: dropoffLot,
                    quantity: dropoffQuantity
                }),
                headers: { "Content-Type": "application/json" }
            }).then(console.log("Added new sample")).then(handleNewSample("Added new sample: " + dropoffMaterial + ", lot " + dropoffLot + "."));
        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <Fragment>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Sample Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered table-sm">
                        <tbody>
                            <tr>
                                <td>Material</td>
                                <td>{dropoffMaterial}</td>
                            </tr>
                            <tr>
                                <td>Lot</td>
                                <td>
                                    <Form>
                                        <Form.Group controlid="lotForm">
                                            <Form.Control placeholder="Enter lot number" onChange={(e) => handleLotChange(e)}/>
                                            <Form.Text className="text-muted">
                                                Numbers only. No leading zeros.
                                            </Form.Text>
                                        </Form.Group>
                                    </Form>    
                                </td>
                            </tr>
                            <tr>
                                <td>Quantity</td>
                                <td>
                                    <ButtonGroup>
                                        {radios.map((radio, index) => (
                                        <ToggleButton
                                            key={index}
                                            id={`radio-${index}`}
                                            variant="outline-primary"
                                            type="radio"
                                            name="radio"
                                            value={radio.quantity}
                                            checked={dropoffQuantity === parseInt(radio.quantity)}
                                            onChange={(e) => setDropoffQuantity(parseInt(e.currentTarget.value))}
                                        >
                                            {radio.name}
                                        </ToggleButton>
                                        ))}
                                    </ButtonGroup>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={() => {
                    setDropoffQuantity(dropoffQuantity);
                    postSample();
                    handleClose();
                }}>
                    Confirm
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default DropoffLotQuantityModal;