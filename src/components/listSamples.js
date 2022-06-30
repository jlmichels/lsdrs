import React, { Fragment, useState, useEffect } from 'react';
import DevOptions from './devOptions.js'
import SampleReceptionModal from './sampleReceptionModal.js';
/* useEffect once buttons added */

const ListSamples = () => {

    const [samples, setSamples] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentSample, setCurrentSample] = useState([]);

    const toggleShowModal = () => {
        setShowModal(!showModal);
    }
    
    const handleOnClick = (sample) => {
        // Set current sample and show modal
        setCurrentSample(sample);
        toggleShowModal();  
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
                    <tr key={sample.sample_id} onClick={event => handleOnClick(sample)}>
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
            <SampleReceptionModal showModal={showModal} toggleShowModal={toggleShowModal} currentSample={currentSample}/>
            <DevOptions/>
        </Fragment>
    );
};

export default ListSamples;