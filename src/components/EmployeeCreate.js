import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Picker, Text } from 'react-native';
import { Button, Card, CardSection, Input } from './common'; 
import EmployeeForm from './EmployeeForm';
import { employeeCreate, employeeUpdate } from '../actions/EmployeeActions';

class EmployeeCreate extends Component {

    state= {
        name: '',
        phone: '',
        shift: null
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
            </Card>
        );
    }
}


export default connect(null, { employeeCreate, employeeUpdate })(EmployeeCreate);
