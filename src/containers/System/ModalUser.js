import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import thunk from 'redux-thunk';
//
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

        }
        this.ListenToEmitter();
    }
    ListenToEmitter = () => [
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
            })
        })
    ]
    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }
    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('miss')
                break;
            }
        }
        return isValid;
    }
    AddNewUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }
        console.log('data', this.state);
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} size="lg">
                <ModalHeader >
                    Modal heading
                </ModalHeader>
                <ModalBody>
                    <div>
                        <div>
                            <label>email</label>
                            <input type='text' value={this.state.email} onChange={(event) => this.handleOnchangeInput(event, "email")}
                            />
                        </div>
                        <div>
                            <label>pass</label>
                            <input type='password' value={this.state.password} onChange={(event) => this.handleOnchangeInput(event, "password")}
                            />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => this.toggle()}>
                        Close
                    </Button>
                    <Button color="primary" onClick={() => this.AddNewUser()}>
                        Add
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
