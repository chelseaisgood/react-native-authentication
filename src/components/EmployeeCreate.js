import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Button, Card, CardSection, ConfirmModal } from './common'; 
import EmployeeForm from './EmployeeForm';
import { employeeCreate, employeeUpdate, employeeDelete } from '../actions/EmployeeActions';

class EmployeeCreate extends Component {

    state= {
        name: '',
        phone: '',
        shift: null,
        confirmModalVisible: false,
    }

    componentWillMount() {
        if (this.props.employee) {
            const { name, phone, shift } = this.props.employee;
            console.log('nextProps');
            console.log(this.props);
            this.setState({ name, phone, shift });
            console.log(this.state);
        }
    }

    onNameChange = name => {
        this.setState({ name });
    }
    onPhoneChange = phone => {
        this.setState({ phone });
    }

    onShiftChange = value => {
        this.setState({ shift: value });
    }

    onButtonPress = () => {
        const { name, phone, shift } = this.state;
        this.props.employeeCreate(name, phone, shift || 'Monday');
    }

    onEmployeeUpdate = () => {
        const { name, phone, shift } = this.state;
        console.log(name, phone, shift);
        this.props.employeeUpdate(name, phone, shift, this.props.employee.uid);
    }

    onTextSchedule = () => {
        const { phone, shift } = this.state;
        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }

    openConfirmModal = () => {
        this.setState({ confirmModalVisible: true });
    }

    closeConfirmModal = () => {
        this.setState({ confirmModalVisible: false });
    }

    renderTextSchedule = () => {
        if (this.props.isEditingMode) {
            return (
                <CardSection>
                    <Button onPress={this.onTextSchedule}>
                        Text Schedule
                    </Button>
                </CardSection>
            );
        }
    }

    renderFireEmployeeSection = () => {
        if (this.props.isEditingMode) {
            return (
                <CardSection>
                    <Button onPress={this.openConfirmModal}>
                        Fire Employee
                    </Button>
                </CardSection>
            );
        }
    }

    fireThisEmployee = () => {
        this.props.employeeDelete(this.props.employee.uid);
    }

    render() {
        const { name, phone, shift } = this.state;
        console.log(this.props.employee);
        return (
            <Card>
                <EmployeeForm
                    employeeUpdate={this.props.employeeCreate}
                    name={name}
                    phone={phone}
                    shift={shift}
                    onNameChange={this.onNameChange}
                    onPhoneChange={this.onPhoneChange}
                    onShiftChange={this.onShiftChange}
                />
                <CardSection>
                    {this.props.isEditingMode
                    ?
                    <Button onPress={this.onEmployeeUpdate}>
                        Update
                    </Button>
                    :
                    <Button onPress={this.onButtonPress}>
                        Create
                    </Button>
                    }
                </CardSection>
                {this.renderTextSchedule()}
                {this.renderFireEmployeeSection()}
                <ConfirmModal
                    visible={this.state.confirmModalVisible}
                    onAccept={this.fireThisEmployee}
                    onReject={this.closeConfirmModal}
                    confirmText='Yes'
                    cancelText='No'
                    transparent
                >
                    Are you sure you wnat to delete this employee?
                </ConfirmModal>
            </Card>
        );
    }
}


export default connect(null, { employeeCreate, employeeUpdate, employeeDelete })(EmployeeCreate);
