import React, { Fragment } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const DevOptionsDropdown = () => {

    const resetStatuses = async() => {
        try { // http://localhost:3001
            const res = await fetch('/samples/all/1', {
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

    const clearSamples = async() => {
        try { // http://localhost:3001
            const res = await fetch('/dev', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    const repopulateSamples = async() => {
        try { // http://localhost:3001
            const res = await fetch('/dev/repopulate', {
                method: 'POST'
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    const clearAndRepopulateSamples = async () => {
        await clearSamples();
        await repopulateSamples();
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
                    <Dropdown.Item as="button" onClick={clearSamples}>Clear Samples</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item as="button" onClick={repopulateSamples}>Repopulate Default Samples</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item as="button" onClick={clearAndRepopulateSamples}>Clear & Repopulate Default Samples</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    )

};

export default DevOptionsDropdown;