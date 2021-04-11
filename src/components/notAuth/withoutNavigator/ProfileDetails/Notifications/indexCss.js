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

    borderColor: 'red',
    borderWidth: 0,
    width: '103%',
    backgroundColor:'#5541E1',
    justifyContent: 'space-between',
    alignItems:'center',
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
    height: 45,
    width: 30,
    margin: 10,
    marginEnd: 25,
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
  peopleStyle: {height: 90, width: 90, alignSelf:'center'},
  continueBtn: {
    backgroundColor: '#b41565',
    margin: 6,
    borderRadius: 5,
    alignSelf: 'center',
  },
  continueBtnTxt: {
    margin: 10,
    marginStart: 40,
    marginEnd: 40,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    alignSelf: 'center',
  },
});
