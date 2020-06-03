import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Header,
  Footer,
  Typography,
  EmailInput,
  PasswordInput,
  Spinner,
  StickyToast,
  themes
} from '@mindlab-vojo/component-library'

import '../style/Login.sass'

import { defaultInputState } from '../utils/formDefaultStates'
import stateKeysToArray from '../utils/stateKeysToArray'

class Login extends Component {
  state = {
    fields: {
      username: { ...defaultInputState },
      password: { ...defaultInputState }
    },
    isFieldsValid: false,
    showError: false,
    loginData: {
      isLoading: false,
      error: null,
      success: false
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      prevState.loginData.error !== this.state.loginData.error &&
      this.state.loginData.error !== null
    ) {
      this.handleRequestErrors()
    }
  }

  handleFieldUpdate = (fieldName, state) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [fieldName]: {
          showError: false,
          ...state
        }
      }
    })
  }

  createRequestObject = () => {
    const fieldKeys = stateKeysToArray(this.state.fields)
    const data = {}

    for (let i = 0; i < fieldKeys.length; i++) {
      const field = fieldKeys[i]
      data[field] = this.state.fields[field].value
    }

    return data
  }

  checkIsFieldsValid = (fieldKeys) => {
    for (let i = 0; i < fieldKeys.length; i++) {
      const field = fieldKeys[i]
      if (this.state.fields[field].isValid === false) {
        this.setState({ isFieldsValid: false })
        return
      }
      if (this.state.fields[field].value === '') {
        this.setState({ isFieldsValid: false })
        return
      }
    }
    this.setState({ isFieldsValid: true })
  }

  handleShowErrorOnFields = async (fieldKeys) => {
    for (let i = 0; i < fieldKeys.length; i++) {
      const field = fieldKeys[i]
      await this.setState({
        fields: {
          ...this.state.fields,
          [field]: {
            ...this.state.fields[field],
            showError: true
          }
        }
      })
    }
  }

  handleLoginClick = async () => {
    const fieldKeys = stateKeysToArray(this.state.fields)

    await this.checkIsFieldsValid(fieldKeys)
    await this.handleShowErrorOnFields(fieldKeys)

    if (this.state.isFieldsValid) {
      const requestData = this.createRequestObject()
      await this.loginSet(requestData)
    }
  }

  handleRequestErrors = async () => {
    const { error } = this.state.loginData
    const { fields } = error
    if (error && fields) {
      const errorFields = stateKeysToArray(fields)
      const newFieldObject = {}

      for (let i = 0; i < errorFields.length; i++) {
        const currentErrorField = errorFields[i]
        newFieldObject[currentErrorField] = {
          ...this.state.fields[currentErrorField],
          errorMessage: fields[currentErrorField],
          showError: true
        }
      }

      await this.setState({
        fields: {
          ...this.state.fields,
          ...newFieldObject
        }
      })
    }
  }

  loginSet = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API}/v3/auth/login`, {
        method:"POST",
        body: JSON.stringify(data)
    })

    const resData = await response.json()
    
    if (!resData.error) {
      await this.setState({
        loginData: {
          error: null,
          isLoading: false,
          success: true
        }
      })
    } else {
      console.log(resData)
      await this.setState({
        loginData: {
          error: resData.error,
          isLoading: false,
          success: false
        }
      })
    }
  }

  render () {
    return (
      <Container maxWidth="full">
        <Container maxWidth="full">
          <Header/>
          {
            this.state.loginData.error && (
              <div style={{
                display: 'block',
                width: '100%',
                zIndex: '100'
              }}>
                <StickyToast show>
                  <Typography
                    color={themes.vojo.colors.redColor}
                    tag="span"
                    type="default">
                    {this.state.loginData.error.message}
                  </Typography>
                </StickyToast>
              </div>
            )
          }
        </Container>
        <Container maxWidth="mobile">
          <div className="Login__Container">
            <div className="Login__Text__Title">
              <Typography tag="h1" type="title" color={themes.vojo.colors.primaryColor}>
                  <strong>
                      Entre no VOJO
                  </strong>
              </Typography>
            </div>
            <div className="Login__Forms">
              <div className="Login__Forms__Input">
                <EmailInput
                  errorMessage={this.state.fields.username.errorMessage}
                  id="username"
                  isRequired
                  label="E-mail"
                  name="username"
                  onInputBlur={(state) => this.handleFieldUpdate('username', state)}
                  onInputChange={(state) => this.handleFieldUpdate('username', state)}
                  placeholder="E-mail"
                  showError={this.state.fields.username.showError}
                  type="text"
                />
              </div>
              <div className="Login__Forms__Input">
                <PasswordInput
                  errorMessage={this.state.fields.password.errorMessage}
                  id="password"
                  isRequired
                  label="Senha"
                  name="password"
                  onInputBlur={(state) => this.handleFieldUpdate('password', state)}
                  onInputChange={(state) => this.handleFieldUpdate('password', state)}
                  placeholder="Senha"
                  showError={this.state.fields.password.showError}
                  type="text"
                  isPassword
                />
              </div>
              <div className="Login__Text__ForgotPassword">
                <Link to="/">
                  <Typography
                    isUnderlined
                    tag="h1"
                    type="default"
                    color={themes.vojo.colors.primaryColor}
                  >
                      <strong>
                        Esqueceu sua senha?
                      </strong>
                  </Typography>
                </Link>
              </div>
              {
                this.state.loginData.isLoading ? (
                  <Spinner/>
                ) : (
                  <div className="Login__Forms__Button">
                    <div className="Login__Forms__Button__Wrapper">
                      <Button
                        id="submit-login"
                        name="submit-login"
                        onButtonClick={() => this.handleLoginClick()}
                        type="submit">
                          Continuar
                      </Button>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </Container>
        <Container maxWidth="full">
          <Footer/>
        </Container>
      </Container>
    )
  }
}

export default Login
