import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { FlatList, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native-elements'
import { selectTravelTimeInformation } from '../slices/navSlice'
import { useSelector } from 'react-redux'
import { Comfort, UberX, UberXL } from '../images'

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: Comfort
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: UberX,
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: UberXL
  }
]

const RATE = 3.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>

      <View>
        <TouchableOpacity 
          onPress={() => { navigation.navigate('NavigateCard') }}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
          <Icon name='chevron-left' type='fontawesome'/>
        </TouchableOpacity>

        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>

      <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item: {id, title, image, multiplier}, item}) => {
          return (
          <TouchableOpacity 
            style={tw`flex-row items-center justify-between px-5
                  ${id === selected?.id && 'bg-gray-200'}`}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={image}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
            </View>

            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('hi', {
                style: 'currency',
                currency: 'INR'
              }).format(
                (travelTimeInformation?.duration.value * RATE * multiplier) / 100
              )}
            </Text>

          </TouchableOpacity>
          )
        }}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity 
          disabled={!selected} 
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default RideOptionsCard