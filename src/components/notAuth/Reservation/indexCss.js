import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F2EF',
  },
  header: {
    height: 70,
    backgroundColor: '#5541E1',
    borderColor: 'red',
    borderWidth: 0,
    width: '103%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
    color: '#FFFFFF',
    margin: 10,
  },
  headertxtInputImg: {
    height: 20,
    width: 20,
    margin: 10,
    marginStart: 15,
  },
  headertxtInputImg1: {
    height: 50,
    width: 30,
    margin: 10,
    marginEnd: 15,
  },
  subhaderView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    borderWidth: 0,
    width: '100%',
  },
  subheadingTxt:{
    fontSize: 16,
    fontWeight: '700',
    margin: 10,
    color: 'gray',
  },
  subheadingTxt1:{
    fontSize: 16,
    fontWeight: '700',
    margin: 10,
    color: '#b41565',
  },
  mainContainer:{
    borderWidth: 0,
    flex: 2,
    marginTop: 0,
    marginBottom: 7,
    width: '99%',
  },
  contentView: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    elevation: 0,
    width: '96%',
    borderRadius: 7,
    alignSelf: 'center',
    margin: 7,
  },
  peopleStyle: {height: 70, width: 70, margin: 10,borderRadius:60},
  bookStyle: {height: 16, width: 16, margin: 3},
  contentTextStyle: {
    fontSize: 10,
    margin: 3,
    color: 'gray',
    fontWeight: '700',
  },
  continueBtn: {
    backgroundColor: '#b41565',
    margin: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width:SCREEN_WIDTH/3.5,
    
    marginEnd: 10,
  },
  continueBtn1: {
    backgroundColor: '#b41565',
    margin: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart:3,
    marginEnd: 0,
    width:SCREEN_WIDTH/3.5,
  },
  continueBtnTxt: {
    margin: 7,
    marginStart: 10,
    marginEnd: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
    alignSelf: 'center',
  },
  continueBtnTxt1: {
    margin: 7,
    marginStart: 10,
    marginEnd: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
    alignSelf: 'center',
  },


  contentTextStyle1: {
    fontSize: 13,
    margin: 3,
    color: 'gray',
    fontWeight: '700',
  },
  contentTextStyle2:{
    fontSize: 12,
    margin: 5,
    marginStart:-3,
    color: '#b41565',
    fontWeight: '700',
  },
});
