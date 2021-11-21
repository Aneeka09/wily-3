
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import Transaction from './screens/transaction'
import Search from './screens/search'
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createAppContainer}from "react-navigation";

export default class App extends React.Component{
  render(){
  return (
    <AppContainer/>
  );
  }
}
const tabNavigator= createBottomTabNavigator({
  Transaction:Transaction,
  Search:Search
},{
defaultNavigationOptions:({navigation})=>({
  tabBarIcon:()=>{
    const routeName=navigation.state.routeName
    if(routeName==="Transaction"){
      return(
        <Image source={require("./assets/book.png")} style={{width:50,height:50}}></Image>
      )
    }
    else if(routeName==="Search"){
      return(
        <Image source={require("./assets/searchingbook.png")} style={{width:50,height:50}}></Image>
      )
    }
  }
})
})
const AppContainer= createAppContainer(tabNavigator)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
