import React from 'react'
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'

function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello From Home</Text>
            <Button title='Go to Screen2' onPress={() => navigation.navigate('Screen2')}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#000',
        height: 100
    },
    text: {
        color: 'white'
    }
})

export default Home