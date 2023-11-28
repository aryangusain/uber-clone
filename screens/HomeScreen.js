import React from "react";
import { StyleSheet, View, Text, SafeAreaView, Image, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import { UberLogo } from "../images";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";

const HomeScreen = () => {
    const dispatch = useDispatch();


    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image 
                    source={ UberLogo } 
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain",
                    }}
                />

                <GooglePlacesAutocomplete 
                    placeholder="Where from?"
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        },
                    }}
                    minLength={2}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description,
                        }));
                        dispatch(setDestination(null));
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    query={{
                        key: GOOGLE_MAPS_API_KEY,
                        language: 'en'
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />

                <NavOptions />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen


