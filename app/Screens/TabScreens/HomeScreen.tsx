import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Platform, FlatList, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {contracts} from "../../data/contracts"
import {departments} from "../../data/departments"
import {employees} from "../../data/employees"
import {jobPositions} from "../../data/jobPositions"
import {leaveRequests} from "../../data/leaveRequests"
import {menuItems} from "../../data/menuItems"
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const renderMenuItem = (item: { icon: string; label: string }, index: number) => (
    <TouchableOpacity 
      key={index} 
      style={styles.menuItem}
      onPress={() => setCurrentScreen(item.label)}
    >
      <Ionicons name={item.icon as any} size={24} color="#0052A4" />
      <Text style={styles.menuItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderHomeScreen = () => (
    <ScrollView contentContainerStyle={styles.content}>
      {menuItems.map(renderMenuItem)}
    </ScrollView>
  );

  const renderDepartmentsScreen = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Departments</Text>
      <FlatList
        data={departments}
        keyExtractor={(item:any) => item.id}
        renderItem={({ item }:any) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              setSelectedDepartment(item.name);
              setCurrentScreen('Department Employees');
            }}
          >
            <Text style={styles.listItemTitle}>{item.name}</Text>
            <Text style={styles.listItemSubtitle}>Company: {item.companyName}</Text>
            <Text style={styles.listItemSubtitle}>Total Employees: {item.totalEmployees}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderDepartmentEmployeesScreen = () => {
    const departmentEmployees = employees.filter(e => e.department === selectedDepartment);
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.screenTitle}>{selectedDepartment} Employees</Text>
        <FlatList
          data={departmentEmployees}
          keyExtractor={(item:any) => item.id}
          renderItem={({ item }:any) => (
            <TouchableOpacity 
              style={styles.listItem}
              onPress={() => {
                setSelectedId(item.id);
                setCurrentScreen('Employee Details');
              }}
            >
              <Text style={styles.listItemTitle}>{item.name}</Text>
              <Text style={styles.listItemSubtitle}>Position: {item.jobPosition}</Text>
              <Text style={styles.listItemSubtitle}>Status: {item.status}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const renderJobPositionsScreen = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Job Positions</Text>
      <FlatList
        data={jobPositions}
        keyExtractor={(item:any) => item.id}
        renderItem={({ item }:any) => (
          <TouchableOpacity 
            style={styles.listItem}
            onPress={() => {
              setSelectedPosition(item.title);
              setCurrentScreen('Position Employees');
            }}
          >
            <Text style={styles.listItemTitle}>{item.title}</Text>
            <Text style={styles.listItemSubtitle}>Department: {item.department}</Text>
            <Text style={styles.listItemSubtitle}>Company: {item.company}</Text>
            <Text style={styles.listItemSubtitle}>Current Employees: {item.currentEmployees}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderPositionEmployeesScreen = () => {
    const positionEmployees = employees.filter(e => e.jobPosition === selectedPosition);
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.screenTitle}>{selectedPosition} Employees</Text>
        <FlatList
          data={positionEmployees}
          keyExtractor={(item:any) => item.id}
          renderItem={({ item }:any) => (
            <TouchableOpacity 
              style={styles.listItem}
              onPress={() => {
                setSelectedId(item.id);
                setCurrentScreen('Employee Details');
              }}
            >
              <Text style={styles.listItemTitle}>{item.name}</Text>
              <Text style={styles.listItemSubtitle}>RSSB: {item.rssbNumber}</Text>
              <Text style={styles.listItemSubtitle}>Status: {item.status}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const renderEmployeesScreen = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Employees</Text>
      <FlatList
        data={employees}
        keyExtractor={(item:any) => item.id}
        renderItem={({ item }:any) => (
          <TouchableOpacity 
            style={styles.listItem}
            onPress={() => {
              setSelectedId(item.id);
              setCurrentScreen('Employee Details');
            }}
          >
            <Text style={styles.listItemTitle}>{item.name}</Text>
            <Text style={styles.listItemSubtitle}>Position: {item.jobPosition}</Text>
            <Text style={styles.listItemSubtitle}>RSSB: {item.rssbNumber}</Text>
            <Text style={styles.listItemSubtitle}>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderEmployeeDetailsScreen = () => {
    const employee = employees.find(e => e.id === selectedId);

    if (!employee) {
      return <Text>Employee not found</Text>;
    }

    return (
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Employee Details</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name:</Text>
            <Text style={styles.detailValue}>{employee.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Job Position:</Text>
            <Text style={styles.detailValue}>{employee.jobPosition}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Department:</Text>
            <Text style={styles.detailValue}>{employee.department}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>RSSB Number:</Text>
            <Text style={styles.detailValue}>{employee.rssbNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Contract:</Text>
            <Text style={styles.detailValue}>{employee.contract}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={styles.detailValue}>{employee.status}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Gender:</Text>
            <Text style={styles.detailValue}>{employee.gender}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone Number:</Text>
            <Text style={styles.detailValue}>{employee.phoneNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{employee.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank Account:</Text>
            <Text style={styles.detailValue}>{employee.bankAccount}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank Name:</Text>
            <Text style={styles.detailValue}>{employee.bankName}</Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderContractsScreen = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Employee's Contracts</Text>
      <FlatList
        data={contracts}
        keyExtractor={(item:any) => item.id}
        renderItem={({ item }:any) => (
          <TouchableOpacity 
            style={styles.listItem}
            
            onPress={() => {
              setSelectedId(item.id);
              setCurrentScreen('Contract Details');
            }}
          >
            <Text style={styles.listItemTitle}>Ref: {item.referenceNumber}</Text>
            <Text style={styles.listItemSubtitle}>Employee: {item.employeeName}</Text>
            <Text style={styles.listItemSubtitle}>Type: {item.contractType}</Text>
            <Text style={styles.listItemSubtitle}>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderContractDetailsScreen = () => {
    const contract = contracts.find(c => c.id === selectedId);

    if (!contract) {
      return <Text>Contract not found</Text>;
    }

    return (
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Contract Details</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Reference Number:</Text>
            <Text style={styles.detailValue}>{contract.referenceNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Employee Name:</Text>
            <Text style={styles.detailValue}>{contract.employeeName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Position:</Text>
            <Text style={styles.detailValue}>{contract.position}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payroll Account:</Text>
            <Text style={styles.detailValue}>{contract.payrollAccount}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Contract Type:</Text>
            <Text style={styles.detailValue}>{contract.contractType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Working Schedule:</Text>
            <Text style={styles.detailValue}>{contract.workingSchedule}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Start Date:</Text>
            <Text style={styles.detailValue}>{contract.startDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>End Date:</Text>
            <Text style={styles.detailValue}>{contract.endDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={styles.detailValue}>{contract.status}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Salary Type:</Text>
            <Text style={styles.detailValue}>{contract.salaryType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Salary:</Text>
            <Text style={styles.detailValue}>${contract.salary.toFixed(2)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Overtime:</Text>
            <Text style={styles.detailValue}>${contract.overtime.toFixed(2)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Cash Allowance:</Text>
            <Text style={styles.detailValue}>${contract.cashAllowance.toFixed(2)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>King Allowance:</Text>
            <Text style={styles.detailValue}>${contract.kingAllowance.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderLeaveRequestScreen = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Leave Requests</Text>
      <FlatList
        data={leaveRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>{item.employeeName}</Text>
            <Text style={styles.listItemSubtitle}>From: {item.startDate} To: {item.endDate}</Text>
            <Text style={styles.listItemSubtitle}>Reason: {item.reason}</Text>
            <Text style={[styles.listItemSubtitle, { color: item.status === 'Approved' ? 'green' : 'orange' }]}>
              Status: {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );

  const renderLeaveApprovedScreen = () => {
    const approvedLeaves = leaveRequests.filter(leave => leave.status === 'Approved');
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Approved Leaves</Text>
        <FlatList
          data={approvedLeaves}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemTitle}>{item.employeeName}</Text>
              <Text style={styles.listItemSubtitle}>From: {item.startDate} To: {item.endDate}</Text>
              <Text style={styles.listItemSubtitle}>Reason: {item.reason}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  const renderMyAccountScreen = () => (
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.screenTitle}>My Account</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>Emmanuel Nono</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>emmanuel.nono@example.com</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>+1234567890</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Position:</Text>
          <Text style={styles.detailValue}>HR Manager</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Department:</Text>
          <Text style={styles.detailValue}>Human Resources</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderSettingsScreen = () => (
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Settings</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Clear Cache</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Terms of Service</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.logoutButton]}>
        <Text style={[styles.buttonText, styles.logoutButtonText]}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return renderHomeScreen();
      case 'Departments':
        return renderDepartmentsScreen();
      case 'Department Employees':
        return renderDepartmentEmployeesScreen();
      case 'Job Positions':
        return renderJobPositionsScreen();
      case 'Position Employees':
        return renderPositionEmployeesScreen();
      case 'Employees':
        return renderEmployeesScreen();
      case 'Employee Details':
        return renderEmployeeDetailsScreen();
      case 'Contracts':
        return renderContractsScreen();
      case 'Contract Details':
        return renderContractDetailsScreen();
      case 'Leave Request':
        return renderLeaveRequestScreen();
      case 'Leave Approved':
        return renderLeaveApprovedScreen();
      case 'My Account':
        return renderMyAccountScreen();
      case 'Settings':
        return renderSettingsScreen();
      default:
        return <Text>Screen not implemented yet</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A4" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => setCurrentScreen('Home')}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerName}>Emmanuel Nono 👋</Text>
          <Text style={styles.headerGreeting}>How are you today?</Text>
        </View>
      </View>
      {currentScreen !== 'Home' && (
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('Home')}>
          <Ionicons name="arrow-back" size={24} color="#0052A4" />
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      )}
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT,
  },
  header: {
    backgroundColor: '#0052A4',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 16,
  },
  headerName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerGreeting: {
    color: 'white',
    fontSize: 14,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '30%',
    aspectRatio: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    margin: '1.5%',
    backgroundColor: '#F5F5F5',
  },
  menuItemText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    color: '#0052A4',
  },
  screenContainer: {
    flex: 1,
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0052A4',
  },
  listItem: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0052A4',
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  detailsContainer: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0052A4',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#0052A4',
  },
  button: {
    backgroundColor: '#0052A4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  logoutButtonText: {
    color: 'white',
  },
});

export default HomeScreen;