import React, { Fragment, useState, useEffect } from 'react';
import DevOptionsDropdown from './devOptionsDropdown.js';
import SampleReceptionModal from './sampleReceptionModal.js';
import Spinner from "react-bootstrap/Spinner";

/* useEffect once buttons added */

const ListSamples = () => {

    const [samples, setSamples] = useState("empty");
    const [showModal, setShowModal] = useState(false);
    const [currentSample, setCurrentSample] = useState([]);
    const toggleShowModal = () => {
        setShowModal(!showModal);
    }
    
    const handleOnClick = (sample) => {
        setCurrentSample(sample);
        toggleShowModal();  
    }

    const clearSamples = () => {
        setSamples("empty");
    }

    const getSamples = async() => {
        try {
            const res = await fetch(process.env.REACT_APP_PATH_PREFIX ? process.env.REACT_APP_PATH_PREFIX + '/samples' : '/samples');
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
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {samples !== "empty" 
                    ? samples.map(sample => (
                        <tr key={sample.sample_id} onClick={event => handleOnClick(sample)}>
                            <td>{sample.timestamp.slice(0, 10)}</td>
                            <td>{sample.timestamp.slice(11, 16)}</td>
                            <td>{sample.user_name}</td>
                            <td>{sample.material}</td>
                            <td>{sample.lot}</td>
                            <td>{sample.quantity > 1000 ? sample.quantity/1000 + " kg" : sample.quantity + " g"}</td>
                        </tr>
                    ))
                    : null }
                </tbody>
            </table>
            {samples === "empty"
            ? <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
            : ""}
            <SampleReceptionModal showModal={showModal} toggleShowModal={toggleShowModal} currentSample={currentSample} clearSamples={clearSamples} getSamples={getSamples}/>
            {/* align DevOptions to footer */}
            <DevOptionsDropdown/>
        </Fragment>
    );
};

export default ListSamples;