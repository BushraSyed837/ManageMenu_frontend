import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import axios from 'axios';
import waxios from 'axios-hooks';

const EditFoodItem = ({ route }) => {
  const { data } = route.params;
  const { index } = route.params;
  const [foodId, setFoodId] = useState(data.foodId);
  const [uri, setURI] = useState(data.uri);
  const [label, setLabel] = useState(data.label);
  const [brand, setBrand] = useState(data.brand);
  const [categoryLabel, setCategoryLabel] = useState(data.categoryLabel);
  const [foodContentsLabel, setFoodContentsLabel] = useState(
    data.foodContentsLabel
  );
  const [message, setMessage] = useState();

  const addFoodItem = async () => {
    await axios({
      method: 'post',
      url: `http://localhost:3000/editFoodItem/${index}`,
      data: {
        uri: uri,
        label: label,
        brand: brand,
        categoryLabel: categoryLabel,
        foodContentsLabel: foodContentsLabel,
      },
    })
      .then(function (response) {
        console.log('Hello', response);
        if (response.status === 200) {
          console.log('response 2', response.data);
          setMessage(response.data);
        }
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: '10%' }}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          Edit Grocery Item
        </Text>
        <TextInput
          style={{
            margin: '2%',
            height: 36,
            borderWidth: 0.2,
            borderColor: 'orange',
          }}
          placeholder="enter label"
          maxLength="49"
          onChangeText={(value) => {
            setLabel(value);
          }}
          value={label}
        />
        <TextInput
          style={{
            margin: '2%',
            height: 36,
            borderWidth: 0.2,
            borderColor: 'orange',
          }}
          placeholder="enter URI of image"
          maxLength="49"
          onChangeText={(value) => {
            setURI(value);
          }}
          value={uri}
        />
        <TextInput
          style={{
            margin: '2%',
            height: 36,
            borderWidth: 0.2,
            borderColor: 'orange',
          }}
          placeholder="enter brand name"
          maxLength="49"
          onChangeText={(value) => {
            setBrand(value);
          }}
          value={brand}
        />
        <TextInput
          style={{
            margin: '2%',
            height: 36,
            borderWidth: 0.2,
            borderColor: 'orange',
          }}
          placeholder="enter category label"
          maxLength="49"
          onChangeText={(value) => {
            setCategoryLabel(value);
          }}
          value={categoryLabel}
        />
        <TextInput
          style={{
            margin: '2%',
            height: 36,
            borderWidth: 0.2,
            borderColor: 'orange',
          }}
          placeholder="enter food content label"
          maxLength="49"
          onChangeText={(value) => {
            setFoodContentsLabel(value);
          }}
          value={foodContentsLabel}
        />
        <View style={{ width: '30%', alignSelf: 'center' }}>
          <Button
            title={'Submit'}
            color="#010203"
            onPress={() => {
              addFoodItem();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default EditFoodItem;
