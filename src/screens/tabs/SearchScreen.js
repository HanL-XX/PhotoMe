import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet,FlatList } from 'react-native'
import {Avatar, SearchBar} from 'react-native-elements';
import _ from "lodash" 
import { MAIN_URL } from '../../config'
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
////////////xóa profile khi lở nhập tên thì danh sách đề xuất ko thay đổi
export default function SearchScreen() {
    // const [refesh]=userefesh()
    const [search,setSearch]=useState({
        data:[],
        refesh:true,
        querry:'',
        search:[]
    })
    const fetchHuman = () => {
      setSearch({...search,refesh: true});
      axios({
        method: 'GET',
        url: `${MAIN_URL}/api/profile/name`,
        })
        .then(resJson => {
          setSearch({
              ...search,
              data: resJson.data.profile,
              // search: resJson.data.profile,
              refesh: false
          })
          // console.log(resJson.data.profile)
        })
        .catch(e => console.log(e));
  };
    const handlerefes = () => {
        setSearch({...search,refesh: false})
        fetchHuman()
    };
    useEffect(async () => {
        await fetchHuman()
    },[])
    const renderItemHuman = data => (
        <View style={styles.constainer}>
          <Avatar rounded source={{uri: data.item.avatar}} />
          <View style={styles.name}>
            <Text style={({fontWeight: 'bold'}, {fontSize: 20})}>
              {data.item.name}
            </Text>
          </View>
        </View>
      );
    const Itemspace = () => {
        return (
            <View
            style={{
                borderTopWidth: 1,
                borderColor: '#CED0CE',
            }}
            />
        );
    };
    const searchinput = searchva => {
      if (searchva) {
        const searchData = _.filter(search.data,(item) => {
        const name=`${item.name}`
        const itemData = name ? name.toUpperCase(): ''.toUpperCase();
        const textData = searchva.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
        setSearch({...search,querry: searchva, refesh: false,search: searchData})
      } else {
        setSearch({...search,querry: searchva, refesh: false,search: []})
      }
    };
    const renderFoot = () => {
        return (
            <View
            style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                borderColor: '#CED0CE',
            }}></View>
        );
    };
    return (
        <SafeAreaView>
            <SearchBar
            placeholder="Type Here..."
            searchIcon={false}
            lightTheme
            round
            value={search.querry}
            onChangeText={searchinput}
          />
            <FlatList
            data={search.search}
            // data={this.state.data}
            renderItem={item => renderItemHuman(item)}
            ItemSeparatorComponent={Itemspace}
            ListFooterComponent={renderFoot}
            refreshing={search.refesh}
            onRefresh={handlerefes}
            keyExtractor={item => item._id}
            />
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    constainer: {
      flex: 1,
      flexDirection: 'row',
      marginLeft: 30,
      marginTop: 20,
    },
    name: {
      flex: 0.7,
      justifyContent: 'center',
      marginLeft: 40,
    },
});
  