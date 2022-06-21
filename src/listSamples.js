import React, { Fragment, useState } from 'react';
/* useEffect once buttons added */

const ListSamples = () => {

    const [samples, setSamples] = useState([]);

    const getSamples = async() => {
        try {
            const res = await fetch('http://localhost:3001');
            const jsonData = await res.json();
            setSamples(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    getSamples();

    return (
        <Fragment>
            Listing Samples 123
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Material</th>
                        <th>Lot</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
            <tbody>
                {samples.map(sample => (
                    <tr key={sample.sample_id}>
                        <td>{sample.user_id}</td>
                        <td>{sample.material}</td>
                        <td>{sample.lot}</td>
                        <td>{sample.quantity} + "g"</td>
                        <td>{sample.status}</td>
                        <td>{sample.timestamp}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </Fragment>
    );
};

export default ListSamples;