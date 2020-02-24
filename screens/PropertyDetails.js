import React,{ useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView , FlatList, List,  ListItem} from 'react-native';
import PropTypes from 'prop-types';
import {createStackNavigator,CreateBottomTabNavigator} from 'react-navigation';

import { db } from '../src/config';
import 'firebase/firestore';
import { Appbar, TextInput, Button  } from 'react-native-paper';

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

function PropertyDetails(){
	const [ loading, setLoading ] = useState(true);
	const [ propertyDetails, setpropertyDetails ] = useState([]);
	
	const ref = db.collection('Properties');
	 
	useEffect(() => {
   /* return ref.doc("DLMpunSCtrCIM4xuJh0i").onSnapshot(querySnapshot => {
           const list = [];
      querySnapshot.forEach(doc => {
        const { data } = doc.data();
        
        });
     list.push({
          id: doc.id,
          name,
          
        });

      setpropertyDetails(list);

      if (loading) {
        setLoading(false);
      }
    }); */
	return ref.doc("Chennai")
    .onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
		
		const propertyDetailsArray = Object.keys(doc.data()).map(i => doc.data()[i])
        console.log("Current array: ", propertyDetailsArray);
		setpropertyDetails(propertyDetailsArray);
        console.log("propertyDetails data: ", propertyDetails);

      if (loading) {
        setLoading(false);
      }
    });
	
	  

  }, []);
  
  return(
	<>
      <Appbar>
        <Appbar.Content title={'Property Details'} />
      </Appbar>
		
		<Text>
		{propertyDetails}
		</Text> 
		
	  </> 
  ); 
}

export default PropertyDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})
;
