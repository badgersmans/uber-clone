import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null)
  const travelTimeInformation = useSelector(selectTravelTimeInformation)

  const data = [
    {
      id: "Uber-X-123",
      title: "UberX",
      mutiplier: 1,
      image: "https://links.papareact.com/3pn",
    },
    {
      id: "Uber-XL-456",
      title: "Uber XL",
      mutiplier: 1.2,
      image: "https://links.papareact.com/5w8",
    },
    {
      id: "Uber-X-789",
      title: "Uber LUX",
      mutiplier: 1.75,
      image: "https://links.papareact.com/7pf",
    },
  ]

  //  if we have surge pricing, this goes up
  const SURGE_PRICE = 1.5;

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity 
          style={tw`absolute top-3 left-5 p-3 rounded-full`}
          onPress={() => navigation.navigate('NavigateCard')}
        >
          <Icon name="chevron-left" type='fontawesome' />
        </TouchableOpacity>
          <Text style={tw`text-center py-3 text-xl`}>Select a Ride - { travelTimeInformation?.distance?.text }</Text>
      </View>

      <FlatList 
        data={data}
        keyExtractor={item => item.id}
        renderItem={( {item: { id, title, mutiplier, image }, item}) => (
          <TouchableOpacity 
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-10 ${id === selected?.id && 'bg-gray-200'}`}
          >
            <Image 
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>

            <Text style={tw`text-xl`}>
              {
                new Intl.NumberFormat('ms-MY', {
                  style: 'currency',
                  currency: 'MYR'
                }).format(
                  (travelTimeInformation?.duration?.value * SURGE_PRICE * mutiplier) / 100
                )
              }
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity 
          style={tw`bg-black py-3 m-3 rounded ${!selected && `bg-gray-300`}`} 
          disabled={!selected}
        >
          <Text style={tw`text-center text-white text-xl`}>Choose { selected?.title }</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard