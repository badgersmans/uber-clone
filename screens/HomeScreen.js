import { SafeAreaView, Text, View } from 'react-native'
import tw from 'twrnc';

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <Text style={tw`text-red-500 p-10`}>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen