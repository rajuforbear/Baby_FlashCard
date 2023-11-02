import React from 'react';
import {View, Text, FlatList} from 'react-native';
import Card from './Card';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addData} from '../reduxToolkit/Slice';
var SQLite = require('react-native-sqlite-storage');
const db = SQLite.openDatabase({
  name: 'eFlashEngishinappnew.db',
  createFromLocation: 1,
});
const HorizontalList = ({items}) => {
  const disapatch = useDispatch();
  const data = useSelector(state => state.Items);
  const getData = cat => {
    console.log('run');
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tbl_items WHERE Category=? ',
        [cat],
        (tx, results) => {
          console.log(' item query Query completed');
          let arr = [];
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            arr.push(row);
          }
          disapatch(addData(arr));
          navigation.navigate(wr ? 'question' : 'details', {page: true});
        },
        err => {
          console.log(err);
        },
      );
    });
  };

  const goTo = cat => {
    console.log(data);
  };
  const wr = useSelector(state => state.question);
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        scrollEnabled={true}
        numColumns={2}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <Card
              onPress={() => {
                getData(item.Category);
              }}
              item={item}
            />
          );
        }}
      />
    </View>
  );
};

export default HorizontalList;
