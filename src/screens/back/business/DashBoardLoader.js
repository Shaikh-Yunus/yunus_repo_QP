import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import {
    PlaceholderContainer,
    Placeholder
} from 'react-native-loading-placeholder'
import LinearGradient from 'react-native-linear-gradient'

const DashBoardLoader = (props) => {
    return (
        <View style={styles.container}>
            <PlaceholderContainer
                animatedComponent={<Gradient />}
                // duration={1000} 
                delay={1000}
            >
                <Placeholder style={[styles.placeholder, { width: '100%', height: props?.height?props?.height:200 }]} />
                {/* <Placeholder style={[styles.placeholder, { width: '100%', height: 200 }]} />
                <Placeholder style={[styles.placeholder, { width: '100%', height: 200 }]} />
                <Placeholder style={[styles.placeholder, { width: '100%', height: 200 }]} /> */}
            </PlaceholderContainer>
        </View>
    )

}
const Gradient = () => {
    return (
        <LinearGradient
            colors={['#D3D3D3', '#D3D3D3', '#D3D3D3']}
            start={{ x: 1.0, y: 0.0 }}
            end={{ x: 0.0, y: 0.0 }}
            style={{
                flex: 1,
                // marginTop:100,
                width: 120
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    placeholder: {
        marginTop: 12,
        backgroundColor: '#A9A9A9',
    }
})

export default DashBoardLoader