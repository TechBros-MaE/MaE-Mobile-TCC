import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { Avatar, Card } from 'react-native-paper';

export default function CalendarScreen({navigation}){

    //const paperTheme = useTheme();
    //const { colors } = useTheme();
  
    const colorsTheme = {
      agendaTodayColor: '#D80000',
      selectedDayBackgroundColor: '#D80000',
      todayTextColor: '#D80000',
      monthTextColor: '#333',
      agendaDayTextColor: '#333',
      agendaDayNumColor: '#333',
      dayTextColor: '#333',
      calendarBackground: '#FFF',
      backgroundColor: '#F1F2F3',
    }
  
    const [items, setItems] = useState({
      '2020-10-02' :[{
        name: 'Operações com Delete no MySql',
        height: 80,
        avatar: 'BD',
      },
      {
        name: 'Normas ISO',
        height: 80,
        avatar: 'QTS',
      }],
      '2020-10-01' :[{
        name: 'Contador Hexadecimal',
        height: 80,
        avatar: 'SE',
      }]
    })
  
    const loadItems = (day) => {
      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          if (!items[strTime]) {
            items[strTime] = [];
            const numItems = Math.floor(Math.random() * 3 + 1);
            
          }
        }
        const newItems = {};
        Object.keys(items).forEach(key => {newItems[key] = items[key];});
        setItems(newItems);
      }, 1000);
    }
  
    const renderItems = (item) => {
      return(
        <TouchableOpacity style={styles.containerCalendar} onPress={() => {}}>
          <Card style={{backgroundColor: '#FFF'}}>
            <Card.Content>
              <View style={styles.itemCalendar}>
                <Text style={{color: '#333'}}>{item.name}</Text>
                <Avatar.Text backgroundColor={'#00B0FF'} label={item.avatar}/>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      );
    }
  
    return(
        <View style={styles.container}>
            <Agenda
            items={items}
            //key={paperTheme.dark == false ? 'light' : 'dark'}
            loadItemsForMonth={loadItems}
            selected={returnDate()}
            renderItem={renderItems}
            theme={colorsTheme}/>
        </View>
    )
  }

function returnDate() {
    const date = new Date();
    const year = String(date.getFullYear());
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
  
    if (month.length == 1){
      month = '0'+ String(date.getDate());
    }
  
    if (day.length == 1){
      day = '0'+ String(date.getDate());
    }
    
    return year + '-' + month + '-' + day;
  }
  
  
function timeToString(time){
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

LocaleConfig.locales['br'] = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan.','Fev.','Mar','Abr','Mai','Jun','Jul.','Ago','Set','Out','Nov','Dez'],
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sabado'],
    dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'],
    today: 'Hj',
};
LocaleConfig.defaultLocale = 'br';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      padding: 5,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    scroll:{
      paddingBottom: 25,
    },
    box: {
      width: '50%',
      padding: 5,
    },
    name: {
      color: '#000',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
    },
    itemContainer: {
        alignItems: 'flex-end',
        padding: 10,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: -1,
    },
    containerCalendar: {
      marginRight: 10, 
      marginTop: 14,
    },  
    itemCalendar: {
      fontSize: 14,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  });