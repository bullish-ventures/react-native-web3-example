import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

export default class mobile extends Component {

  state = {
    balance: null
  };

  getBalance() {
    web3.eth.getCoinbase((err, coinbase) => {
      const balance = web3.eth.getBalance(coinbase, (err2, balance) => {
        console.log('balance ' + balance);
        this.setState({balance});
      });
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.balanceButton} onPress={this.getBalance.bind(this)}>
          <Text style={styles.balanceText}>Get Balance</Text>
        </TouchableOpacity>
        {this.state.balance && <Text style={styles.balance}>
          {`${this.state.balance}`}
        </Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  balanceButton: {
    backgroundColor: '#0dab7f',
    padding: 10,
    width: 200,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  balanceText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16
  },
});

AppRegistry.registerComponent('mobile', () => mobile);
