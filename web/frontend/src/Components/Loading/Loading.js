import React, { Component } from 'react';
import { Row, Col, Spinner } from 'reactstrap';

export default class Loading extends Component {
    render() {
        return (
            <Row
                className="align-items-center"
                style={{ height: 'calc(100% - 56px)' }}
            >
                <Col className="mx-auto d-flex justify-content-center">
                    <div className="text-center">
                        <Spinner type="grow" color="info" />
                        <br />
                        Loading Information
                    </div>
                </Col>
            </Row>
        );
    }
}
