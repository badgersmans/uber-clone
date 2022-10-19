import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

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
        </View>
    </SafeAreaView>
  )
}

export default NavigateCard