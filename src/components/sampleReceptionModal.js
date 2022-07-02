import React, { Fragment, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form';

const SampleReceptionModal = ({ showModal, toggleShowModal, currentSample, clearSamples, getSamples }) => {

    const showAcceptButtonDefault = true;
    const showRejectButtonDefault = true;
    const showRejectReasonsDefault = false;
    const showRejectionInputDefault = false;
    const rejectionReasonErrorDefault = false;
    const rejectionInputErrorDefault = false;
    const rejectionInputDefault = "";
    const rejectionReasonDefault = "";
    const [showAcceptButton, setShowAcceptButton] = useState(showAcceptButtonDefault);
    const [showRejectButton, setShowRejectButton] = useState(showRejectButtonDefault);
    const [showRejectionReasons, setShowRejectionReasons] = useState(showRejectReasonsDefault);
    const [showRejectionInput, setShowRejectionInput] = useState(showRejectionInputDefault);
    const [rejectionReason, setRejectionReason] = useState(rejectionReasonDefault);
    const [rejectionInput, setRejectionInput] = useState(rejectionInputDefault);
    const [rejectionReasonError, setRejectionReasonError] = useState(rejectionReasonErrorDefault);
    const [rejectionInputError, setRejectionInputError] = useState(rejectionInputErrorDefault);

    const radios = [
        { rejectionReason: "Details do not match sample packaging"},
        { rejectionReason: "Wrong material"},
        { rejectionReason: "Wrong lot"},
        { rejectionReason: "Wrong quantity"},
        { rejectionReason: "Other"},
    ];

    const handleHide = () => {
        toggleShowModal();
        setShowAcceptButton(showAcceptButtonDefault);
        setShowRejectButton(showRejectButtonDefault);
        setShowRejectionReasons(showRejectReasonsDefault);
        setShowRejectionInput(showRejectionInputDefault);
        setRejectionReason(rejectionReasonDefault);
        setRejectionInput(rejectionInputDefault);
        setRejectionReasonError(rejectionReasonErrorDefault);
        setRejectionInputError(rejectionInputErrorDefault);
    }

    const handleFirstReject = () => {
        // Show reasons and hide accept and reject buttons
        toggleRejectionReasons();
        toggleShowAcceptButton();
        toggleRejectButton();
    }

    const handleFinalReject = () => {
        if (rejectionReason === rejectionReasonDefault) {
            setRejectionReasonError(true);
        } else if (rejectionReason === "Other" && rejectionInput === rejectionInputDefault) {
            setRejectionInputError(true);
        } else {
            handleStatusChange("rejected", rejectionReason === "Other" ? rejectionInput: rejectionReason);
            handleHide();
        }        
    }

    const handleStatusChange = async(status, rejectionReason) => {
        try{
            const res = fetch (`http://localhost:3001/samples/${currentSample.sample_id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    status: `${status}`,
                    rejection_reason: `${rejectionReason}`,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }).then(clearSamples).then(toggleShowModal().then(getSamples()));
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleToggleButtonSelection = (e) => {
        const selectedToggleButtonValue = e.currentTarget.value;
        setRejectionReason(selectedToggleButtonValue);
        if (rejectionReasonError) setRejectionReasonError(false);

        if ((selectedToggleButtonValue === "Other" && !showRejectionInput) || (selectedToggleButtonValue !== "Other" && showRejectionInput)) {
            toggleRejectionInput();
        }
    }

    const handleRejectionInput = (e) => {
        const currentRejectionInput = e.currentTarget.value;
        if (rejectionInputError && currentRejectionInput.length > 0) setRejectionInputError(false);
        if (currentRejectionInput.length < 501) setRejectionInput(currentRejectionInput);
    }

    const toggleShowAcceptButton = () => {
        setShowAcceptButton(!showAcceptButton);
    }

    const toggleRejectButton = () => {
        setShowRejectButton(!showRejectButton);
    }

    const toggleRejectionReasons = () => {
        setShowRejectionReasons(!showRejectionReasons);
    }

    const toggleRejectionInput = () => {
        setShowRejectionInput(!showRejectionInput);
    }

    return(
        <Fragment>
            <Modal show={showModal} onHide={handleHide}>
                <Modal.Header closeButton>
                <Modal.Title>Sample Reception</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered table-sm">
                        <tbody>
                            <tr>
                                <td>Date</td>
                                <td>{currentSample.timestamp === undefined ? "" : currentSample.timestamp.slice(0, 10)}</td>
                            </tr>
                            <tr>
                                <td>Time</td>
                                <td>{currentSample.timestamp === undefined ? "" : currentSample.timestamp.slice(11, 16)}</td>
                            </tr>
                            <tr>
                                <td>User</td>
                                <td>{currentSample.user_name}</td>
                            </tr>
                            <tr>
                                <td>Material</td>
                                <td>{currentSample.material}</td>
                            </tr>
                            <tr>
                                <td>Lot</td>
                                <td>{currentSample.lot}</td>
                            </tr>
                            <tr>
                                <td>Quantity</td>
                                <td>{currentSample.quantity}</td>
                            </tr>
                        </tbody>
                    </table>
                    {showRejectionReasons ?
                    <div className="d-grid gap-1">
                        <div>Select one:</div>
                        <ButtonGroup vertical>
                            {radios.map((radio, index) => (
                                <ToggleButton
                                    key={index}
                                    id={`radio-${index}`}
                                    variant="outline-danger"
                                    type="radio"
                                    name="radio"
                                    value={radio.rejectionReason}
                                    checked={rejectionReason === radio.rejectionReason}
                                    onChange={(e) => handleToggleButtonSelection(e)}
                                >
                                    {radio.rejectionReason}
                                </ToggleButton>
                            ))}
                            <div>{!rejectionReasonError ? "" : "Please select a reason"}</div>
                            {showRejectionInput ?
                            <Form className="w-100">
                                <Form.Group controlid="rejectionReasonForm">
                                    <Form.Control as="textarea" placeholder="Enter rejection reason" onChange={(e) => handleRejectionInput(e)}/>
                                    <div>{!rejectionInputError ? "" : "Please input a reason"}</div>
                                </Form.Group>
                            </Form>
                            : ""}
                        </ButtonGroup>
                    </div>
                    : ""}
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </Modal.Body>
                <Modal.Footer>
                    {showAcceptButton ?
                    <Button variant="success" onClick={() => handleStatusChange("accepted")}>
                        Accept
                    </Button>
                    : ""}
                    {showRejectButton ?
                    <Button variant="danger" onClick={() => handleFirstReject()}>
                        Reject
                    </Button>
                    : <Button variant="danger" onClick={() => handleFinalReject()}>
                        Confirm Rejection
                    </Button>
                    }
                    <Button variant="secondary" onClick={handleHide}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );

};

export default SampleReceptionModal;