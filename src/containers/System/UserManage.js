import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
//
import { getAllUser, createNewUser, DeleteUser, EditServiceUser } from '../../services/usersService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }
    async componentDidMount() {
        await this.getAllUserFromReact();
    }
    getAllUserFromReact = async () => {
        let response = await getAllUser('ALL');
        if (response && response.errCode == 0) {
            this.setState({
                arrUsers: response.users
            })
        }

    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true,
        })
    }
    toggeUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }
    toggeUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    createNewUser = async (data) => {
        try {
            let reponse = await createNewUser(data);
            console.log(reponse);
            if (reponse && reponse.errCode !== 0) {
                alert(reponse.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModal: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
            }
        } catch (e) {
            console.log(e);
        }
    }
    handleDeleteUser = async (user) => {
        try {
            let respone = await DeleteUser(user.id);
            if (respone && respone.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(respone.errMessage)
            }
        } catch (error) {

        }
    }
    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        })
    }
    DoEditUser = async (user) => {
        try {
            let respone = await EditServiceUser(user);
            if (respone && respone.errCode === 0) {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalEditUser: false,
                })
            } else {
                alert(respone.errMessage)
            }
        } catch (error) {

        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="text-center">
                <ModalUser isOpen={this.state.isOpenModal}
                    toggleFromParent={this.toggeUserModal}
                    createNewUser={this.createNewUser}
                />

                {this.state.isOpenModalEditUser &&
                    <ModalEditUser isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggeUserEditModal}
                        CurrentUser={this.state.userEdit}
                        editUser={this.DoEditUser}
                    />
                }

                <div><button onClick={() => this.handleAddNewUser()}>Add new</button></div>
                <div>
                    <table id="customers">
                        <tbody><tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <th>{item.email}</th>
                                        <th>{item.firstName}</th>
                                        <th>{item.lastName}</th>
                                        <th>{item.address}</th>
                                        <th><button onClick={() => this.handleEditUser(item)}>edit</button></th>
                                        <th><button onClick={() => this.handleDeleteUser(item)}>delete</button></th>
                                    </tr>
                                )
                            })
                            }</tbody>


                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
