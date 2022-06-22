import React, { Fragment, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
/* useEffect once buttons added */

const ListSamples = () => {

    const [samples, setSamples] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    
    const handleAccept = () => {
        /* update status to accepted */
        setShowModal(false);
    }
    
    const handleReject = () => {
        /* update status to rejected */
        setShowModal(false);
    }

    const getSamples = async() => {
        try {
            const res = await fetch('http://localhost:3001');
            const jsonData = await res.json();
            setSamples(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getSamples();
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
        <Fragment>
            <table className="table table-hover table-bordered table-sm">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>User</th>
                        <th>Material</th>
                        <th>Lot</th>
                        <th>Quantity (grams)</th>
                        <th>Status</th>
                    </tr>
                </thead>
            <tbody>
                {samples.map(sample => (
                    <tr key={sample.sample_id} onClick={handleShow}>
                        <td>{sample.timestamp.slice(0, 10)}</td>
                        <td>{sample.timestamp.slice(11, 16)}</td>
                        <td>{sample.user_name}</td>
                        <td>{sample.material}</td>
                        <td>{sample.lot}</td>
                        <td>{sample.quantity}</td>
                        <td>{sample.status}</td>
                    </tr>
                ))}
            </tbody>
            </table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Sample Reception</Modal.Title>
                </Modal.Header>
                <Modal.Body>Accept or Reject the selected sample
                    <table className="table table-hover table-bordered table-sm">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>User</th>
                                <th>Material</th>
                                <th>Lot</th>
                                <th>Quantity (grams)</th>
                            </tr>
                        </thead>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={handleAccept}>
                    Accept
                </Button>
                <Button variant="danger" onClick={handleReject}>
                    Reject
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default ListSamples;