import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {View, Text, FlatList, Pressable, Alert} from 'react-native';
import {verifyInvoice} from '../../api/methods/invoice';

import styles from './styles';

const getStatus = status => {
  return status === 'Verify';
};

const HomeScreen = ({route}) => {
  const {params} = route;
  const [isVerified, setIsVerified] = useState(
    getStatus(params.invoice_status),
  );

  const onInvoiceVerify = async () => {
    try {
      const result = await verifyInvoice(params.id);
      if (result.message === 'Invoice verified') {
        const title = 'Invoice Verified';
        Alert.alert(title);
        setIsVerified(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const data = [
    {
      title: 'Discount Name',
      price: params.discount_name,
    },
    {
      title: 'Discount type',
      price: params.discount_type,
    },
    {
      title: 'Discount Price',
      price: params.discount_price,
    },
    {
      title: 'Subtotal',
      price: params.sub_total,
    },
    {
      title: 'Tax %',
      price: params.tax_percentage,
    },
    {
      title: 'Tax Price',
      price: params.tax_price,
    },
  ];

  const displayData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      console.log(user);
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={styles.dot} />
        <Text style={styles.statusText}>{params.invoice_slug}</Text>
      </View>
      <View style={styles.mianContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.invoiceText}>INVOICE FOR</Text>
          <Text style={styles.nameText}>{params.client_name}</Text>
          <View style={styles.mainSubContainer}>
            <Text style={styles.contactText}>Contact:</Text>
            <Text style={styles.phoneNumberText}> {params.client_contact}</Text>
          </View>
          <View style={styles.mainSubContainer}>
            <Text style={styles.contactText}>Email:</Text>
            <Text style={styles.phoneNumberText}>{params.client_email}</Text>
          </View>
        </View>
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalAmountText}>TOTAL AMOUNT</Text>
          <Text style={styles.amountText}>{params.total_price}</Text>
          <View style={styles.dateContainer}>
            <View style={styles.dot} />
            <Text style={styles.dateText}>{params.created_at}</Text>
          </View>
        </View>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.serviceText}>CONSULTANCY\SERVICE</Text>
        <Text style={styles.serviceText}>PRICE</Text>
      </View>
      <View style={styles.hairRemovalContainer}>
        <View style={styles.serviceNameContainer}>
          <Text numberOfLines={2} style={styles.serviceNameText}>
            {params.service_name}
          </Text>
        </View>
        <Text style={styles.totalText}>{params.service_price}</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${item.title}_${index}`}
          renderItem={({item}) => {
            return <List item={item} />;
          }}
        />
      </View>
      <View style={styles.seperator} />
      <View style={styles.notesContainer}>
        <Text numberOfLines={2} style={styles.noteText}>
          Note: All treatment prices are inclusive of taxes
        </Text>
        <Text style={styles.totalPriceText}>TOTAL: {params.total_price}</Text>
      </View>

      <Pressable onPress={displayData}>
        <Text>user name</Text>
      </Pressable>

      <Pressable
        style={isVerified ? styles.greyButton : styles.button}
        disabled={isVerified}
        onPress={onInvoiceVerify}>
        <Text style={styles.buttonText}>A P P R O V E</Text>
      </Pressable>
    </View>
  );
};

const List = ({item}) => {
  return (
    <View style={styles.list}>
      <Text style={styles.serviceText}>{item.title}</Text>
      <Text style={styles.serviceNameText}>{item.price}</Text>
    </View>
  );
};
export default HomeScreen;
