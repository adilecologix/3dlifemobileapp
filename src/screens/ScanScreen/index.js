/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {getInvoice} from '../../api/methods/invoice';

const ScanScreen = ({navigation}) => {
  const handleScan = async e => {
    try {
      const data = await getInvoice(e.data);
      console.log(data);
      navigation.navigate('Home', data);
    } catch (err) {
      const {error} = err.response;
      console.log(err);
      console.log(error);
    }
  };

  return (
    <QRCodeScanner
      onRead={handleScan}
      showMarker={true}
      reactivate={true}
      reactivateTimeout={5000}
      containerStyle={{backgroundColor: 'black'}}
    />
  );
};

export default ScanScreen;
