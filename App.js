import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import addFoodItem from './components/addFoodItem';
import editFoodItem from './components/editFoodItem';
import foodItemList from './components/foodItemList';
// Drawer Navigation Starts

const Stack = createStackNavigator(); // stack variable for stacknavigation screen 1

//StackNavigation for world Stats

export default class StackNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'orange',
              borderWidth: 2,
              borderColor: ' orange',
            },
          }}>
          <Stack.Screen
            name="Food Items"
            component={foodItemList}
            options={{
              title: 'Grocery Items',
            }}
          />
          <Stack.Screen
            name="Add Food Items"
            component={addFoodItem}
            options={{
              title: 'Grocery Items',
            }}
          />
          <Stack.Screen
            name="Edit Food Items"
            component={editFoodItem}
            options={{
              title: 'Edit Food Items',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
