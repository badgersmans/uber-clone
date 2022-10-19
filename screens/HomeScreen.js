import { Image, SafeAreaView, Text, View } from 'react-native';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
    const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
            <Image 
                source={{
                    uri: "https://links.papareact.com/gzs"
                }}
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain'
                }}
            />

            <GooglePlacesAutocomplete
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
                placeholder='From Where?'
                styles={{
                    container: {
                        flex: 0,
                    },
                    textInput: {
                        fontSize: 18,
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
                    dispatch(setOrigin({
                        location: details.geometry.location,
                        description: data.description,
                    }))
                    dispatch(setDestination(null))
                }}
            />

            <NavOptions />
            <NavFavourites />
        </View>

    </SafeAreaView>
  )
}

export default HomeScreen