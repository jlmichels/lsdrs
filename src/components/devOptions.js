import React, { Fragment } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const DevOptions = () => {

    return (
        <Fragment>
            <Dropdown>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                    Developer Options
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as="button">Reset All Statuses to Pending</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item as="button">Reinitialize Database</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    )

};

export default DevOptions;