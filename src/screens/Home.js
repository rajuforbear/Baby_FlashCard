import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { addData } from '../reduxToolkit/Slice';
import HorizontalList from '../components/HorizontalList';
import Header from '../components/Header';
import MyData from '../components/CatagotyData'
var SQLite = require('react-native-sqlite-storage')
const db = SQLite.openDatabase({ name: "eFlashEngishinappnew.db", createFromLocation: 1 });
console.log(db)

const Home = () => {

  const dispatch=useDispatch()

  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tbl_items ', [], (tx, results) => {
        console.log("Query completed");
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

  return (
    <ImageBackground style={{ flex: 1 }} source={require('../../Assets4/bgnewcategory.png')}>
      <Header/>
      <HorizontalList items={MyData}/>
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({})