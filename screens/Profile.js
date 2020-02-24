import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default function Profile() {
    return (
      <ScrollView style={styles.container}>
        {/**
         * Go ahead and delete ExpoLinksView and replace it with your content;
         * we just wanted to provide you with some helpful links.
         */}
        <ExpoLinksView />
      </ScrollView>
    );
  }
  
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
    },
  });
  

