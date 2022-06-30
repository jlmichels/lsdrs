import React, { Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SampleReceptionModal = ({ showModal, toggleShowModal, currentSample }) => {

    const handleAccept = () => {
        /* update status to accepted */
        toggleShowModal();
    }
    
    const handleReject = () => {
        /* update status to rejected */
        toggleShowModal();
    }

    return(
        <Fragment>
            <Modal show={showModal} onHide={toggleShowModal}>
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
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={handleAccept}>
                    Accept
                </Button>
                <Button variant="danger" onClick={handleReject}>
                    Reject
                </Button>
                <Button variant="secondary" onClick={toggleShowModal}>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );

};

export default SampleReceptionModal;