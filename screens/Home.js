import React, { useState } from 'react'
import { Button, Pressable, StyleSheet, Text, TextInput, TextInputComponent, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';

function Home({ navigation }) {

    const [money, setMoney] = useState(10000)
    const [amount, setAmount] = useState()
    const [details, setDetails] = useState()

    return (
        <View style={styles.container}>
            {/* <Button title='Go to Screen2' style={styles.btn} onPress={() => navigation.navigate('Screen2')}></Button> */}
            <StatusBar style='light' />
            <View style={styles.moneyDiv}>
                <Text style={styles.text}>Available Money</Text>
                <Text style={styles.money}>₹{money}</Text>
            </View>
            <View style={styles.inputDiv}>
                <TextInput style={styles.input} value={amount} onChangeText={(value) => setAmount(value)} keyboardType='numeric' placeholder='Enter Amount' placeholderTextColor={'white'} />
                <TextInput multiline editable style={styles.input} numberOfLines={4} value={details} onChangeText={(value) => setDetails(value)} placeholder='Enter Details' placeholderTextColor={'white'} />
            </View>
            <View style={styles.optionDiv}>
                <Pressable onPress={() => setMoney(parseInt(money) - parseInt(amount))}><Text style={styles.spent}>Spent</Text></Pressable>
                <Pressable onPress={() => setMoney(parseInt(money) + parseInt(amount))}><Text style={styles.gained}>Gained</Text></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#121212',
        height: '100%'
    },
    text: {
        color: 'white'
    },
    money: {
        color: 'white',
        fontSize: 40
    },
    moneyDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    inputDiv: {
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
    },
    input: {
        backgroundColor: 'black',
        color: 'white',
        borderColor: 'white',
        width: 250,
        height: 40,
        borderRadius: 10
    },
    optionDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 30
    },
    spent: {
        color: 'white',
        backgroundColor: 'red',
        width: 85,
        padding: 20,
        borderRadius: 10
    },
    gained: {
        color: 'white',
        backgroundColor: 'green',
        width: 85,
        padding: 20,
        borderRadius: 10
    }
})

export default Home