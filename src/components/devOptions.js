import React, { Fragment } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const DevOptions = () => {

    const resetStatuses = async() => {
        try {
            const res = await fetch('http://localhost:3001/samples/all/1', {
                method: 'PATCH',
                body: JSON.stringify({
                    status: 'pending',
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <Dropdown>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                    Developer Options
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={resetStatuses}>Reset All Statuses to Pending</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item as="button">Reinitialize Database</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    )

};

export default DevOptions;