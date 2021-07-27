import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const height = Dimensions.get('screen').height;

export default StyleSheet.create({
  screen: {
    flex: 1,
    padding: '2%',
    paddingTop: hp('5%'),
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: wp('4%'),
    alignSelf: 'center',
  },
  subText: {
    color: '#696969',
    fontWeight: 'bold',
    fontSize: RFValue(26, height),
  },
  inputs: {
    marginTop: hp('9%'),
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  errorText: {
    color: 'red',
    bottom: hp('2%'),
    paddingLeft: '3%',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#1ca3dc',
  },
  buttonT: {
    paddingVertical: hp('2%'),
  },
  image: {
    alignSelf: 'center',
    marginLeft: wp('4%'),
  },
  seperator: {
    width: '90%',
    backgroundColor: 'lightblue',
    height: 1,
    alignSelf: 'center',
    marginVertical: '5%',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
