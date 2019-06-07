import React , { Component } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { TransitionView } from '../components/transition/TransitionView';
import { Transition } from 'react-navigation-fluid-transitions';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const list = [
    {
      name: 'Matheus Lubarino',
      avatar_url: 'https://http2.mlstatic.com/bandeira-portugal-copa-do-mundo-tamanho-oficial-90-x-150-cm-D_NQ_NP_968515-MLB29948285195_042019-F.webp',
      subtitle: 'Visto Portugal - D3'
    },
    {
      name: 'Gustavo Pereira Lima',
      avatar_url: 'https://http2.mlstatic.com/bandeira-portugal-copa-do-mundo-tamanho-oficial-90-x-150-cm-D_NQ_NP_968515-MLB29948285195_042019-F.webp',
      subtitle: 'Visto Portugal - D3'
    },
    {
        name: 'Matheus Lubarino',
        avatar_url: 'https://http2.mlstatic.com/bandeira-portugal-copa-do-mundo-tamanho-oficial-90-x-150-cm-D_NQ_NP_968515-MLB29948285195_042019-F.webp',
        subtitle: 'Visto Portugal - D3'
      },
      {
        name: 'Gustavo Pereira Lima',
        avatar_url: 'https://http2.mlstatic.com/bandeira-portugal-copa-do-mundo-tamanho-oficial-90-x-150-cm-D_NQ_NP_968515-MLB29948285195_042019-F.webp',
        subtitle: 'Visto Portugal - D3'
      },
      {
        name: 'Matheus Lubarino',
        avatar_url: 'https://http2.mlstatic.com/bandeira-portugal-copa-do-mundo-tamanho-oficial-90-x-150-cm-D_NQ_NP_968515-MLB29948285195_042019-F.webp',
        subtitle: 'Visto Portugal - D3'
      },
      {
        name: 'Gustavo Pereira Lima',
        avatar_url: 'https://http2.mlstatic.com/bandeira-portugal-copa-do-mundo-tamanho-oficial-90-x-150-cm-D_NQ_NP_968515-MLB29948285195_042019-F.webp',
        subtitle: 'Visto Portugal - D3'
      },
      {
        name: 'Matheus Lubarino',
        avatar_url: 'https://http2.mlstatic.com/bandeira-portugal-copa-do-mundo-tamanho-oficial-90-x-150-cm-D_NQ_NP_968515-MLB29948285195_042019-F.webp',
        subtitle: 'Visto Portugal - D3'
      },
      {
        name: 'Gustavo Pereira Lima',
        avatar_url: 'https://http2.mlstatic.com/bandeira-portugal-copa-do-mundo-tamanho-oficial-90-x-150-cm-D_NQ_NP_968515-MLB29948285195_042019-F.webp',
        subtitle: 'Visto Portugal - D3'
      },
    
  ];

export default class MainList extends Component {

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item}) => {
      return <ListItem
          leftAvatar={{ source: { uri: item.avatar_url } }}
          title={item.name}
          subtitle={item.subtitle}
          bottomDivider={true}
          badge={{status: 'warning' }}
          onPress={() => this.props.navigation.navigate('Main')}
      />
    }

    render() {
        return(
            <Transition appear="top" disappear="bottom">
            <View style={style.container}>
                <View style={style.header}>
                <Text style={{alignSelf: 'center', marginTop: 20, fontSize: 20, color: 'white', fontFamily: 'Roboto-Medium'}}>Consulta de visto</Text>
                <TextInput  autoCapiaroundtalize="none" 
                                autoCorrect={false} 
                                keyboardType='email-address' 
                                returnKeyType="next"
                                placeholder='Nome ou Passaporte' 
                                placeholderTextColor='rgba(225,225,225,1)'
                                style={{backgroundColor: 'white', marginHorizontal: 30, borderRadius: 10, marginTop: 20}}
                                />

                </View>
                
                    <ScrollView style={style.list} showsVerticalScrollIndicator={false}>
                    <FlatList 
                        keyExtractor={this.keyExtractor}
                        data={list}
                        renderItem={this.renderItem}
                      />
                    </ScrollView>
            </View>
            </Transition>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 150,
        backgroundColor: '#1a73e8'
    },
    list: {
        marginTop: 10,
        marginHorizontal: 10
    }
});