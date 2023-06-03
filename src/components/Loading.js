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

const Loading = () => {
    return (
        <View style={styles.container}>
            <PlaceholderContainer
                animatedComponent={<Gradient />}
                // duration={1000}
                delay={1000}
            >
                <Placeholder style={[styles.placeholder, { width: '100%', height: 200 }]} />
                <Placeholder style={[styles.placeholder, { width: '100%', height: 200 }]} />
                <Placeholder style={[styles.placeholder, { width: '100%', height: 200 }]} />
                <Placeholder style={[styles.placeholder, { width: '100%', height: 200 }]} />
            </PlaceholderContainer>
        </View>
    )

}
const Gradient = () => {
    return (
        <LinearGradient
            colors={['#eeeeee', '#dddddd', '#eeeeee']}
            start={{ x: 1.0, y: 0.0 }}
            end={{ x: 0.0, y: 0.0 }}
            style={{
                flex: 1,
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
        backgroundColor: '#F1F1F1',
    }
})

export default Loading