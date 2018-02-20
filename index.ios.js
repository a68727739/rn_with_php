import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ListView
} from 'react-native';
import { StackNavigator } from 'react-navigation';
class InputUsers extends Component {
  static navigationOptions = {
    title: 'Input Users'
  }
  constructor(props) {
    super(props)
    this.state = {
      TextInputName: '',
      TextInputEmail: '',
      TextInputPhoneNumber: ''
    }
  }
  InsertUsers = () => {
    const { TextInputName } = this.state;
    const { TextInputEmail } = this.state;
    const { TextInputPhoneNumber } = this.state;
    // Alert.alert('hello');
    fetch('http://192.168.1.101/tr_reactnative/insert.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: TextInputName,
        email: TextInputEmail,
        phone_number: TextInputPhoneNumber,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
        this.props.navigation.navigate('Second')
      }).catch((error) => {
        console.error(error);
      })
      
  }
  ViewUsersList = () => {
    this.props.navigation.navigate('Second')
  }
  render() {
    return (
      <View style={styles.Container}>
        <TextInput
          placeholder='Enter Name'
          onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle2}
        />
        <TextInput
          placeholder='Enter Email'
          onChangeText={TextInputValue => this.setState({ TextInputEmail: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle}
        />
        <TextInput
          placeholder='Enter Phone Number'
          onChangeText={TextInputValue => this.setState({ TextInputPhoneNumber: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle}
        />
        <TouchableOpacity
          activeopacity={.4} style={styles.TouchableOpacityStyle}
          onPress={this.InsertUsers}
        >
          <Text style={styles.TextStyle}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeopacity={.4} style={styles.TouchableOpacityStyle}
          onPress={this.ViewUsersList}
        >
          <Text style={styles.TextStyle}>View Users</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
class ViewDataUser extends Component {
  static navigationOptions = {
    title: 'Data Users'
  }
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }
  componentDidMount() {
    return fetch('http://192.168.1.101/tr_reactnative/view_users.php')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson)
        }, function () { })
      }).catch((error) => {
        console.error(error);
      })
  }
  Action_Click(id, name, email, phone_number) {
    this.props.navigation.navigate('Three', {
      id: id,
      name: name,
      email: email,
      phone_number: phone_number
    })
  }
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: '100%',
          backgroundColor: '#2196F3'
        }}
      />
    )
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View style={styles.ContainerDataUsers}>
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={(rowData) =>
            <Text style={styles.rowViewContainer} onPress={this.Action_Click.bind(this,
              rowData.id,
              rowData.name,
              rowData.email,
              rowData.phone_number
            )}>
              {rowData.name}
            </Text>
          }
        />
      </View>
    )
  }
}
class UpdateDataUser extends Component {
  static navigationOptions = {
    title: 'Update AND Delete Users'
  }
  constructor(props) {
    super(props)
    this.state = {
      TextInputId: '',
      TextInputName: '',
      TextInputEmail: '',
      TextInputPhoneNumber: ''
    }
  }
  componentDidMount() {
    this.setState({
      TextInputId: this.props.navigation.state.params.id,
      TextInputName: this.props.navigation.state.params.name,
      TextInputEmail: this.props.navigation.state.params.email,
      TextInputPhoneNumber: this.props.navigation.state.params.phone_number
    })
  }
  UpdateUsers = () => {
    fetch('http://192.168.1.101/tr_reactnative/update.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.TextInputId,
        name: this.state.TextInputName,
        email: this.state.TextInputEmail,
        phone_number: this.state.TextInputPhoneNumber
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
        this.ListViewItemSeparator
      }).catch((error) => {
        console.error(error);
      })
      this.props.navigation.navigate('Second')
  }
  DeleteUsers = () => {
    fetch('http://192.168.1.101/tr_reactnative/delete.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.TextInputId
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
        this.ListViewItemSeparator
      }).catch((error) => {
        console.error(error);
      })
      this.props.navigation.navigate('Second')
  }
  render() {
    return (
      <View style={styles.Container}>
        <TextInput
          value={this.state.TextInputName}
          placeholder='Enter Name'
          onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle2}
        />
        <TextInput
          value={this.state.TextInputEmail}
          placeholder='Enter Email'
          onChangeText={TextInputValue => this.setState({ TextInputEmail: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle}
        />
        <TextInput
          value={this.state.TextInputPhoneNumber}
          placeholder='Enter Phone Number'
          onChangeText={TextInputValue => this.setState({ TextInputPhoneNumber: TextInputValue })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle}
        />
        <TouchableOpacity
          activeopacity={.4} style={styles.TouchableOpacityStyle}
          onPress={this.UpdateUsers}
        >
          <Text style={styles.TextStyle}>UPDATE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeopacity={.4} style={styles.TouchableOpacityStyle2}
          onPress={this.DeleteUsers}
        >
          <Text style={styles.TextStyle}>DELETE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
export default CodeTR = StackNavigator({
  Fisrt: { screen: InputUsers },
  Second: { screen: ViewDataUser },
  Three: { screen: UpdateDataUser }
});
const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    flex: 1,
    marginTop: 5,
    backgroundColor: '#fff'
  },
  TextInputStyle: {
    textAlign: 'center',
    marginBottom: 7,
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#FF5722'
  },
  TextInputStyle2: {
    textAlign: 'center',
    marginBottom: 7,
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#FF5722'
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center'
  },
  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: '90%',
    backgroundColor: '#00BCD4'
  },
  TouchableOpacityStyle2: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: '90%',
    backgroundColor: '#FF5722'
  },
  ContainerDataUsers: {
    flex: 1,
    paddingTop: 20,
    marginLeft: 5,
    marginRight: 5
  },
  rowViewContainer: {
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10
  }
});

AppRegistry.registerComponent('navigation', () => CodeTR);
