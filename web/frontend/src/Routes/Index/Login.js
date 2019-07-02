import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import WebStore from '../../Store/WebStore';

import Input from '../../Components/Input/InputText';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isSubmit: false,
            data: {
                username: '',
                password: '',
            },
            error: {
                username: false,
                password: false,
            },
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        const status = WebStore.checkLocalStorage();
        if (status) {
            this.props.history.push('/dashboard');
        }
    }

    onChange = data => {
        const target = data.target,
            name = target.name,
            value = target.value;

        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [name]: value,
            },
            error: {
                ...this.state.error,
                [name]: false,
            },
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const { data, error, isSubmit } = this.state;

        if (data.username.length !== 0 || data.password.length !== 0) {
            this.setState(
                {
                    isSubmit: !isSubmit,
                },
                () => {
                    WebStore.login(data).then(resp => {
                        console.log(resp);
                        if (resp.msg === 'wrong_username') {
                            this.setState({
                                ...this.state,
                                isSubmit: !this.state.isSubmit,
                                error: {
                                    ...this.state.error,
                                    username: !this.state.username,
                                },
                            });
                        } else if (resp.msg === 'wrong_password') {
                            this.setState({
                                ...this.state,
                                isSubmit: !this.state.isSubmit,
                                error: {
                                    ...this.state.error,
                                    password: !this.state.password,
                                },
                            });
                        } else if (resp.msg === 'failed_login') {
                            this.setState({
                                ...this.state,
                                isSubmit: !this.state.isSubmit,
                                error: {
                                    ...this.state.error,
                                    password: !this.state.password,
                                    username: !this.state.username,
                                },
                            });
                        } else {
                            WebStore.setStorage(
                                '_username',
                                resp.data.username,
                            );
                            WebStore.setStorage('_userID', resp.data._id);
                            WebStore.setStorage('_token', resp.data.token);
                            WebStore.notif('Success Login', 'success');
                            setTimeout(() => {
                                this.props.history.push('/dashboard');
                            }, 5000);
                        }
                    });
                },
            );
        } else {
            if (data.username.length === 0) {
                error.username = !error.username;
                this.setState({
                    ...this.state,
                    error: error,
                });
            }

            if (data.password.length === 0) {
                error.password = !error.password;
                this.setState({
                    ...this.state,
                    error: error,
                });
            }
            this.setState({
                ...this.state,
                isSubmit: false,
            });
        }
    };

    register = () => {
        this.props.history.push('/register');
    };
    render() {
        const { isSubmit, data, error } = this.state;

        return (
            <div
                className="container-fluid vh-100 mw-auto"
                style={{ background: '#bdc3c7' }}
            >
                <Row className="h-100 align-items-center">
                    <Col className="mx-auto" md={7}>
                        <Card>
                            <Row>
                                <Col style={{ background: '#27ae60' }}>
                                    <Row
                                        className="align-items-center"
                                        style={{ height: '500px' }}
                                    >
                                        <Col className="mx-auto text-white">
                                            <CardBody>
                                                <h2>
                                                    Welcome to BirdThings
                                                    Application
                                                </h2>
                                                <br />
                                                this an Application for
                                                Monitoring and automatic or
                                                Scheduling feeder on{' '}
                                                <i>Canaries Bird</i>.
                                                <br />
                                                <span
                                                    style={{
                                                        fontSize: '0.7em',
                                                        position: 'absolute',
                                                        bottom: '-100px',
                                                    }}
                                                >
                                                    Muhammad Waziruddin Akbar
                                                    &copy; 2019
                                                </span>
                                            </CardBody>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col style={{ background: '#fff' }}>
                                    <Row className="h-100 align-items-center">
                                        <Col className="mx-auto">
                                            <form>
                                                <CardBody>
                                                    <h3>Sign In</h3>
                                                    <Input
                                                        type="name"
                                                        placeholder="Username"
                                                        icon={
                                                            <i className="icon-user" />
                                                        }
                                                        name={'username'}
                                                        onChange={this.onChange}
                                                        value={data.username}
                                                        disabled={isSubmit}
                                                        className={'mt-4 uname'}
                                                        invalid={error.username}
                                                        // feedback={"Username has already taken"}
                                                    />
                                                    <Input
                                                        type="password"
                                                        placeholder="Password"
                                                        icon={
                                                            <i className="icon-lock" />
                                                        }
                                                        name={'password'}
                                                        onChange={this.onChange}
                                                        value={data.password}
                                                        disabled={isSubmit}
                                                        className={'mt-3 pwd'}
                                                        invalid={error.password}
                                                    />
                                                    <Button
                                                        type="submit"
                                                        color="success"
                                                        size="sm"
                                                        className={'mt-4'}
                                                        onClick={this.onSubmit}
                                                        disabled={isSubmit}
                                                        block
                                                    >
                                                        Login
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                        size="sm"
                                                        className={'mt-3'}
                                                        disabled={isSubmit}
                                                        onClick={this.register}
                                                        block
                                                    >
                                                        Register
                                                    </Button>
                                                </CardBody>
                                            </form>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
