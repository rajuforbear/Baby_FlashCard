import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../reduxToolkit/Slice';
import HorizontalList from '../components/HorizontalList';
import Header from '../components/Header';
import MyData from '../components/CatagotyData'
import { useNavigation } from '@react-navigation/native';
var SQLite = require('react-native-sqlite-storage')
import { addSetting } from '../reduxToolkit/Slice2';
import { QuestionMode } from '../reduxToolkit/Slice3';
const db = SQLite.openDatabase({ name: "eFlashEngishinappnew.db", createFromLocation: 1 });
console.log(db)

const Home = () => {
  const muted = useSelector(state => state.sound)
  const Navigation = useNavigation()
  const [mute, setMute] = useState(muted)


  const dispatch = useDispatch()

  useEffect(() => {
    getData()
    getSettings()

  }, [])

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tbl_items ', [], (tx, results) => {
        console.log(" item query Query completed");
        let arr = []
        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          arr.push(row)
          //console.log(row)
        }
        dispatch(addData(arr))
      },
        (err) => {
          console.log(err)
        }
      );
    });
  }

  const getSettings = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM  tbl_settings', [], (tx, results) => {


        var len = results.rows.length;

        let row = results.rows.item(0);

        // console.log(row)

        dispatch(addSetting(row))

        dispatch(QuestionMode(row.Question))


        console.log("setting query")

      },
        (err) => {
          console.log(err)
        }
      );
    });
  }

  return (
    <ImageBackground style={{ flex: 1 }} source={require('../../Assets4/bgnewcategory.png')}>
      <Header onPress2={() => setMute(!mute)} mute={mute} onPress={() => Navigation.navigate('setting', { pr: 'home' })} home />
      <HorizontalList items={MyData} />
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({})