import React, { Fragment, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import ToggleButton from 'react-bootstrap/ToggleButton';

const DropoffLotQuantityModal = ({ showModal, toggleShowModal, setDropoffLot, setDropoffQuantity, dropoffMaterial }) => {
    const [checkedQuantity, setCheckedQuantity] = useState("");
    const [inputLot, setInputLot] = useState("");

    const radios = [
        { name: '10 mg', quantity: '10' },
        { name: '50 mg', quantity: '50' },
        { name: '200 g', quantity: '200' },
        { name: '2 kg', quantity: '2000' },
      ];

    const handleClose = () => {
        setCheckedQuantity("");
        toggleShowModal();
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
                                            <Form.Control placeholder="Enter lot number" onChange={(e) => (
                                                setInputLot(e.currentTarget.value),
                                                console.log(e.currentTarget.value))}/>
                                            <Form.Text className="text-muted">
                                                {/* Input checking */}
                                                Without leading zeros
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
                                            checked={checkedQuantity === radio.quantity}
                                            onChange={(e) => setCheckedQuantity(e.currentTarget.value)}
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
                <Button variant="success" onClick={() => (
                    setDropoffQuantity(checkedQuantity),
                    /* DB request */
                    handleClose()
                    )}>
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