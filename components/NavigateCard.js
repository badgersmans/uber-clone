import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from "@rneui/themed";

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
        <Text style={tw`text-center py-5 text-xl`}>Good Morning, Shawn.</Text>

        <View style={tw`border-t border-gray-200 flex-shrink`}>

                <GooglePlacesAutocomplete 
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                    placeholder='To Where?'
                    styles={{
                        container: {
                            flex: 0,
                            backgroundColor: 'white',
                            paddingTop: 20,
                        },
                        textInput: {
                            fontSize: 18,
                            backgroundColor: '#DDDDDF',
                            borderRadius: 0,
                        },
                        textInputContainer: {
                            paddingHorizontal: 20,
                        }
                    }}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en'
                    }}
                    minLength={2}
                    enablePoweredByContainer={false}
                    returnKeyType={"search"}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // console.log(data);
                        // console.log(details);
                        dispatch(setDestination({
                            location: details.geometry.location,
                            description: data.description,
                        }))
                        navigation.navigate('RideOptionsCard')
                    }}
                />
                <NavFavourites />

                <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                    <TouchableOpacity 
                        style={tw`flex-row justify-between bg-black w-24 px-3 py-3 rounded-full`}
                        onPress={() => navigation.navigate('RideOptionsCard')}
                    >
                        <Icon name='car' type='font-awesome' color='white' size={16}/>
                        <Text style={tw`text-white text-center`}>Rides</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`flex-row justify-between w-24 px-3 py-3 rounded-full`}>
                        <Icon name='fast-food-outline' type='ionicon' color='black' size={16}/>
                        <Text style={tw`text-center`}>Eats</Text>
                    </TouchableOpacity>
                </View>
        </View>
    </SafeAreaView>
  )
}

export default NavigateCard