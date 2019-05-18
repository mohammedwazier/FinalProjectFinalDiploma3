import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import WebStore from "../../Store/WebStore";

import Input from "../../Components/Input/InputText";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isSubmit: false,
      data: {
        username: "",
        email: "",
        password: ""
      },
      error: {
        username: false,
        email: false,
        password: false
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const status = WebStore.checkLocalStorage();
    if (status) {
      this.props.history.push("/dashboard");
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
        [name]: value
      },
      error: {
        ...this.state.error,
        [name]: false
      }
    });
  };

  setError = async (paramState, param, value) => {
    const lakukan = await this.setState(
      {
        ...this.state,
        [paramState]: {
          [param]: !value
        }
      },
      () => true
    );
    return lakukan;
  };

  onSubmit = e => {
    e.preventDefault();
    const { data, error, isSubmit } = this.state;

    if (
      data.username.length !== 0 ||
      data.email.length !== 0 ||
      data.password.length !== 0
    ) {
      this.setState(
        {
          isSubmit: !isSubmit
        },
        () => {
          WebStore.register(data).then(resp => {
            if (resp.msg === "username_exist") {
              this.setState({
                ...this.state,
                isSubmit: !this.state.isSubmit,
                error: {
                  ...this.state.error,
                  username: !this.state.username
                }
              });
            } else if (resp.msg === "email_exist") {
              this.setState({
                ...this.state,
                isSubmit: !this.state.isSubmit,
                error: {
                  ...this.state.error,
                  email: !this.state.email
                }
              });
            } else if (resp.msg === "failed_regis") {
            } else {
              this.props.history.push("/login");
            }
          });
        }
      );
    } else {
      const { username, email, password } = error;
      if (data.username.length === 0) {
        this.setError("error", "username", username);
      }

      if (data.email.length === 0) {
        this.setError("error", "email", email);
      }

      if (data.password.length === 0) {
        this.setError("error", "password", password);
      }

      this.setState({
        ...this.state,
        isSubmit: !isSubmit
      });
    }
  };

  login = () => {
    this.props.history.push("/login");
  };
  render() {
    const { isSubmit, data, error } = this.state;

    return (
      <div
        className="container-fluid vh-100 mw-auto"
        style={{ background: "#bdc3c7" }}
      >
        <Row className="h-100 align-items-center">
          <Col className="mx-auto" md={7}>
            <Card>
              <Row>
                <Col style={{ background: "#fff" }}>
                  <Row className="h-100 align-items-center">
                    <Col className="mx-auto">
                      <form>
                        <CardBody>
                          <h3>Sign Up</h3>
                          <Input
                            type="name"
                            placeholder="Username"
                            icon={<i className="icon-user" />}
                            name={"username"}
                            onChange={this.onChange}
                            value={data.username}
                            disabled={isSubmit}
                            className={"mt-4"}
                            invalid={error.username}
                            feedback={"Username has already taken"}
                          />
                          <Input
                            type="email"
                            placeholder="Email"
                            icon="@"
                            name={"email"}
                            onChange={this.onChange}
                            value={data.email}
                            disabled={isSubmit}
                            className={"mt-3"}
                            invalid={error.email}
                            feedback={"Email has already taken"}
                          />
                          <Input
                            type="password"
                            placeholder="Password"
                            icon={<i className="icon-lock" />}
                            name={"password"}
                            onChange={this.onChange}
                            value={data.password}
                            disabled={isSubmit}
                            className={"mt-3"}
                            invalid={error.password}
                          />
                          <Button
                            type="submit"
                            color="success"
                            size="sm"
                            className={"mt-4"}
                            onClick={this.onSubmit}
                            disabled={isSubmit}
                            block
                          >
                            Register
                          </Button>
                          <Button
                            color="secondary"
                            size="sm"
                            className={"mt-3"}
                            disabled={isSubmit}
                            onClick={this.login}
                            block
                          >
                            Login
                          </Button>
                        </CardBody>
                      </form>
                    </Col>
                    <Col style={{ background: "#27ae60" }}>
                      <Row
                        className="align-items-center"
                        style={{ height: "500px" }}
                      >
                        <Col className="mx-auto text-white">
                          <CardBody>
                            <h2>Welcome to BirdThings Application</h2>
                            <br />
                            this an Application for Monitoring and automatic or
                            Scheduling feeder on <i>Canaries Bird</i>.
                            <br />
                            <span
                              style={{
                                fontSize: "0.7em",
                                position: "absolute",
                                bottom: "-100px"
                              }}
                            >
                              Muhammad Waziruddin Akbar &copy; 2019
                            </span>
                          </CardBody>
                        </Col>
                      </Row>
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
