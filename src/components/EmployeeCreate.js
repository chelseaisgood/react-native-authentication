import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common'; 

class EmployeeCreate extends Component {

    state= {
        name: '',
        phone: '',
        pick: null
    }

    onNameChange = name => {
        this.setState({ name });
    }

    onShiftChange = value => {
        console.log(value);
        this.setState({ pick: value });
    }


    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Employee's name"
                        value={this.state.email}
                        onChangeText={this.onNameChange}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="555-555-5555"
                        value={this.state.phone}
                        onChangeText={this.onPhoneChange}
                    />
                </CardSection>
                <CardSection>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={this.state.pick}
                        onValueChange={this.onShiftChange}
                    >
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tuesday" value="Tuesday" />
                        <Picker.Item label="Wednesday" value="Wednesday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                        <Picker.Item label="Saturday" value="Saturday" />
                        <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>
                    </CardSection>
                <CardSection>
                    <Button>
                        Create
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default EmployeeCreate;
