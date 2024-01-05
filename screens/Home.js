import React, { useEffect, useState } from 'react'
import { Button, Keyboard, Pressable, StyleSheet, Text, TextInput, TextInputComponent, TouchableWithoutFeedback, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({ navigation }) {

    const [money, setMoney] = useState(10000)
    const [amount, setAmount] = useState('')
    const [details, setDetails] = useState('')
    const [data, setData] = useState({
        amt: '',
        dtl: '',
        time: '',
        ntr: ''
    })
    const [getData, setGetData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const tempData = await AsyncStorage.getItem('data')
            const dataArray = tempData ? JSON.parse(tempData) : [];
            setGetData(dataArray)
            console.warn(getData)
            // AsyncStorage.clear()
        }
        fetchData()
    }, [data])

    const onBtnPress = () => {
        setAmount('')
        setDetails('')
    }

    const spentPress = async () => {
        try {
            const date = new Date()

            if (amount) {
                setMoney(parseInt(money) - parseInt(amount))
            }
            else {
                console.warn('Null value passed')
            }

            setData({ amt: amount, dtl: details, time: date, ntr: 'out' })

            const existingData = await AsyncStorage.getItem('data')
            const parseExistingData = JSON.parse(existingData)
            const combinedData = [...parseExistingData, data]

            await AsyncStorage.setItem('data', JSON.stringify(combinedData))
            await AsyncStorage.setItem('money', JSON.stringify(money))

            // setAmount('')
            // setDetails('')

        } catch (e) {
            console.log(e)
        }
        onBtnPress()

    }

    const gainedPress = async () => {
        try {
            const date = new Date()

            if (amount) {
                setMoney(parseInt(money) + parseInt(amount))
            }
            else {
                console.warn('Null value passed')
            }

            setData({ amt: amount, dtl: details, time: date, ntr: 'in' })

            const existingData = await AsyncStorage.getItem('data')
            const parseExistingData = JSON.parse(existingData)
            const combinedData = [...parseExistingData, data]

            await AsyncStorage.setItem('data', JSON.stringify(combinedData))
            await AsyncStorage.setItem('money', JSON.stringify(money))

            // setAmount('')
            // setDetails('')

        } catch (e) {
            console.log(e)
        }
        onBtnPress()
    }

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
                <Pressable onPress={spentPress}><Text style={styles.spent}>Spent</Text></Pressable>
                <Pressable onPress={gainedPress}><Text style={styles.gained}>Gained</Text></Pressable>
            </View>
            <View>
                <View style={styles.thTextDiv}>
                    <Text style={styles.thText}>Transaction History</Text>
                </View>
                {/* <View>
                    <Text style={{color: 'white'}}>{getData.amt}</Text>
                    <Text style={{color: 'white'}}>{getData.dtl}</Text>
                    <Text style={{color: 'white'}}>{getData.time}</Text>
                    <Text style={{color: 'white'}}>{getData.ntr}</Text>
                </View> */}
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
    },
    thTextDiv: {
        display: 'flex',
        paddingTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    thText: {
        color: 'white'
    }
})

export default Home