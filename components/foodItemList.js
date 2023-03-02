import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Avatar } from 'react-native-elements'
import axios from 'axios'

const FoodItemList = ({ navigation }) => {
  const [foodItems, setFoodItems] = useState()
  const [message, setMessage] = useState()
  useEffect(() => {
    // declare the data fetching function
    const itemsFetched = async () => {
      await axios({
        method: 'get',
        url: 'http://localhost:3000/'
      })
        .then(function (response) {
          if (response.status === 200) {
            console.log('respone 2', response.data)
            setFoodItems(response.data)
          }
        })
        .catch(function (error) {
          console.log('error', error)
        })
    }

    // call the function
    itemsFetched()
      // make sure to catch any error
      .catch(console.error)
  }, [])
  const removeItems = async index => {
    await axios({
      method: 'post',
      url: `http://localhost:3000/deleteFoodItem`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        index: index
      }
    })
      .then(function (response) {
        if (response.status === 200) {
          console.log('response 2', response.data)
          setMessage(response.data)
        }
      })
      .catch(function (error) {
        console.log('error', error)
      })
  }

  if (!foodItems) {
    return (
      <View style={{ flex: 1, padding: 40, backgroundColor: 'white' }}>
        <ActivityIndicator size='large' color='orange' />
      </View>
    )
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ marginTop: '5%' }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <Text style={{ fontSize: 15, padding: 4, fontWeight: 'bold' }}>
              Grocery Items
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              paddingEnd: '5%',
              marginBottom: '1%'
            }}
          >
            <FontAwesome
              name='plus'
              size={14}
              color='orange'
              onPress={() => {
                navigation.navigate('Add Food Items')
              }}
            />
          </View>
          {foodItems.map((data, i) => {
            return (
              <View style={{ padding: 1 }}>
                <View
                  style={{
                    padding: 2,
                    flex: 1,
                    flexDirection: 'row',
                    color: 'white',
                    borderWidth: 2,
                    backgroundColor: 'white',
                    borderColor: 'grey'
                  }}
                >
                  <View>
                    <Avatar rounded size='medium' source={{ uri: data.uri }} />
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      paddingLeft: '2%',
                      paddingTop: '5%'
                    }}
                  >
                    {i + 1}- {data.label}
                  </Text>
                  <FontAwesome
                    style={{
                      flex: 0.02,
                      justifyContent: 'flex-end',
                      paddingLeft: '16%',
                      paddingTop: '5%'
                    }}
                    name='trash'
                    size={15}
                    color='orange'
                    onPress={() => {
                      removeItems(i)
                    }}
                  />
                  <FontAwesome
                    style={{
                      flex: 0.07,
                      justifyContent: 'flex-end',
                      paddingLeft: '16%',
                      paddingTop: '5%',
                      paddingRight: '6%'
                    }}
                    name='edit'
                    size={15}
                    color='orange'
                    onPress={() => {
                      console.log('hello')
                      navigation.navigate('Edit Food Items', {
                        index: i,
                        data: foodItems[i]
                      })
                    }}
                  />
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
export default FoodItemList
