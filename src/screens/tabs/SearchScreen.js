import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, Image, TouchableOpacity } from 'react-native'
import _ from "lodash"
import { MAIN_URL } from '../../config'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage'

////////////xóa profile khi lở nhập tên thì danh sách đề xuất ko thay đổi
export default function SearchScreen({ navigation }) {
  // const [refesh]=userefesh()
  const [search, setSearch] = useState({
    data: [],
    refesh: true,
    querry: '',
    search: []
  })
  const fetchHuman = () => {
    setSearch({ ...search, refesh: true });
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
    setSearch({ ...search, refesh: false })
    fetchHuman()
  };

  const openAccountUser = async (id) => {
    const id_User = await AsyncStorage.getItem('userId_Key')
    if (id === id_User)
      navigation.navigate('Profile', { id_User: id })
    else
      navigation.navigate('ProfileUserScreen', { id_User: id })
  }

  useEffect(async () => {
    await fetchHuman()
  }, [])

  const renderItemHuman = data => (
    <TouchableOpacity
      onPress={() => openAccountUser(data.item.id_User)}
      activeOpacity={0.8}
      style={styles.container}>
      <Image rounded source={{ uri: data.item.avatar }} style={{ width: 60, height: 60, borderRadius: 30 }} />
      <View style={styles.name}>
        <Text style={({ fontWeight: '500', fontSize: 18, color: '#222' })}>
          {data.item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const Itemspace = () => {
    return (
      <View
        style={{
          borderTopWidth: 0.5,
          borderColor: '#CED0CE',
        }}
      />
    );
  };
  const searchinput = searchva => {
    if (searchva) {
      const searchData = _.filter(search.data, (item) => {
        const name = `${item.name}`
        const itemData = name ? name.toUpperCase() : ''.toUpperCase();
        const textData = searchva.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearch({ ...search, querry: searchva, refesh: false, search: searchData })
    } else {
      setSearch({ ...search, querry: searchva, refesh: false, search: [] })
    }
  };
  const renderFoot = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#eee',
        }}></View>
    );
  };
  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 10 }}>
        <Feather
          name="search"
          size={24}
          style={{ color: '#555' }}
        />
        <TextInput
          style={{ marginLeft: 5, padding: 10, color: '#333', fontSize: 18 }}
          placeholder="Search here..."
          value={search.querry}
          onChangeText={searchinput}
        />
      </View>

      <FlatList
        data={search.search}
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
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    padding: 10
  },
  name: {
    justifyContent: 'center',
    marginLeft: 10,
  },
});
