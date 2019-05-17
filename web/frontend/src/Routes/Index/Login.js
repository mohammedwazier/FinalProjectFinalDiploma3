import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";

import Input from "../../Components/Input/InputText";

export default class Login extends Component {
  constructor() {
    super();

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

  onChange = data => {
    const target = data.target,
      name = target.name,
      value = target.value;

    this.setState(
      {
        ...this.state,
        data: {
          ...this.state.data,
          [name]: value
        }
      },
      () => console.log(this.state)
    );
  };

  onSubmit = () => {
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
          console.log("hehekjhsdfkjh");
        }
      );
    } else {
    }
  };
  render() {
    // const { username, email, password } = this.state.data;
    const { isSubmit, data, error } = this.state;
    return (
      <div className="container-fluid vh-100 mw-auto">
        <Row className="h-100 align-items-center">
          <Col className="mx-auto" md={7}>
            <Card>
              <Row>
                <Col>
                  <CardBody>
                    <div style={{ minHeight: "500px" }}>asdasdasdasd</div>
                  </CardBody>
                </Col>
                <Col>
                  <Row className="h-100 align-items-center">
                    <Col className="mx-auto">
                      <CardBody>
                        <h3>Sign In</h3>
                        <Input
                          type="name"
                          placeholder="Username"
                          icon={<i className="icon-user" />}
                          name={"username"}
                          onChange={this.onChange}
                          value={data.username}
                          disabled={isSubmit}
                          className={"mt-3"}
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
                          color="primary"
                          size="sm"
                          className={"mt-3"}
                          block
                        >
                          Login
                        </Button>
                        <Button
                          color="secondary"
                          size="sm"
                          className={"mt-3"}
                          block
                        >
                          Register
                        </Button>
                      </CardBody>
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
