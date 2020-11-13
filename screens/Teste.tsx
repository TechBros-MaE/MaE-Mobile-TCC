import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native';

export default function Teste(){
    
    const [data, setData] = useState([]);

    useEffect(()=> {
        fetchData();
    },[])

    async function fetchData(){
        const response = await fetch('http://192.168.42.247:1384/eventos');
        const eventos = await response.json();
        setData(eventos);
        console.log(eventos);
    }

    return(
        <View>
            <Text>Teste</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => 
                    <View>
                        <Text>{item.tituloEvento}</Text>
                    </View>
                }
            />
        </View>
    );
}
