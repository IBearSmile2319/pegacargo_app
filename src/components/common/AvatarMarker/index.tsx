import { View, Text, Image } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { theme } from 'theme/theme'
import { Callout } from 'react-native-maps'

const AvatarMarker = () => {
    return (
        <>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 999
            }} >

                {/* marker */}
                <Image source={require("../../../assets/yape.png")} style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    borderWidth: 4,
                    borderColor: 'white',
                }} />
                <View
                    style={{
                        width: scale(2),
                        flex: 1,
                        backgroundColor: "white",
                        height: scale(10),
                    }}
                />
            </View>

        </>
    )
}

export default AvatarMarker