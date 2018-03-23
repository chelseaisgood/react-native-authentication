import React from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';
import AuthSharedComponent from './components/AuthSharedComponent';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';

const RouterComponent = () => {
    const navigateToEmployeeCreateComponent = () =>
        Actions.employeeCreate({ isEditingMode: false });

    return (
        <Router>
            <Scene key="root" hideNavBar >
                <Scene key="authRoot">
                    <Scene key="auth" component={AuthSharedComponent} title="Welcome" initial />
                </Scene>
                <Scene key="main">
                    <Scene
                        rightTitle="Add"
                        onRight={navigateToEmployeeCreateComponent}
                        key="employeeList"
                        component={EmployeeList} 
                        title="Employees"
                        initial
                    />
                    <Scene
                        // leftTitle="Back"
                        // onLeft={navigateToEmployeeListComponent}
                        key="employeeCreate"
                        component={EmployeeCreate} 
                        title="Create Employee"
                    />
                    <Scene
                        // leftTitle="Back"
                        // onLeft={navigateToEmployeeListComponent}
                        key="employeeEdit"
                        component={EmployeeCreate} 
                        title="Edit Employee"
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
