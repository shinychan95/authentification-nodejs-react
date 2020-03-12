import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

import { Link } from "react-router-dom"
import AuthService from '../utils/AuthService';

class ResetPassword extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentDidMount() {
      if (this.Auth.loggedIn()) {
          this.props.history.replace('/main');
      }
  }

  handleChange(event) {
      this.setState({
          [event.target.name]: event.target.value
      });
  }

  handleFormSubmit(event) {
      event.preventDefault();

      this.Auth.login(this.state.email, this.state.password)
          .then(res => {
              this.props.history.replace('/main');
          })
          .catch(err => {
              alert(err);
          })  
  }

  render(){
    return (
      <>
        <Col xs="8" md="7" lg="6" xl="5">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Reset password</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={this.handleChange}
                      formNoValidate
                    />
                  </InputGroup>
                </FormGroup>
                
                
                <div className="text-center">
                  <Button className="my-1" color="primary" type="button" onClick={this.handleFormSubmit}>
                    Send Reset Link
                  </Button>
                  <Button href='/auth/login' className="ml-2 my-1" color="light" type="button">
                    Cancel
                  </Button>
                </div>

              </Form>
            </CardBody>
          </Card>
          
        </Col>
      </>
    )
  }
  
}

export default ResetPassword;
