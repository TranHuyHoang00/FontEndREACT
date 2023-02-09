import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import './Login.scss'; //
import { handleLoginApi } from '../../services/usersService'; //

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isShowPassword: true,
            errMassage: '',
        }
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleOnChangeUserName = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMassage: '',
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) { // sai pass or email
                this.setState({
                    errMassage: data.message,
                })
            }
            if (data && data.errCode === 0) { // succes

                this.props.UserLoginSuccess(data.user)
            }

        } catch (err) { // lỗi bỏ trống pass ,username
            if (err.response) {
                if (err.response.data) {
                    this.setState({
                        errMassage: err.response.data.message
                    })
                }
            }

        }

    }

    ShowHidePassWord = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 form-group'>
                            <label>UserName</label>
                            <input type='text'
                                className='form-control'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUserName(event)}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Password</label>
                            <div>
                                <input type={this.state.isShowPassword ? 'password' : 'text'}
                                    className='form-control'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                />
                                <span
                                    onClick={() => this.ShowHidePassWord()}>
                                    {this.state.isShowPassword ? 'show' : 'hide'}
                                </span>
                            </div>

                        </div>
                        <div className='col-12'>
                            <button onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className='col-12'>
                            {this.state.errMassage}
                        </div>
                        <div className='col-12'>
                            <span>Forgot password</span>
                            <div className='col-12'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),

        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        UserLoginSuccess: (userInfo) => dispatch(actions.UserLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
