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
    backgroundColor: 'blue',
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
    height: 30,
    width: 30,
    margin: 2,
    marginEnd: 10,
  },
  headertxtInputImg2: {
    height: 24,
    width: 24,
    margin: 4,
    marginEnd: 10,
  },
  mainContainer: {
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
  contentView2: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    elevation: 0,

    width: '96%',
    borderRadius: 7,
    alignSelf: 'center',
    margin: 7,
  },
  contViewHeader: {
    flexDirection: 'row',
    margin: 3,
  },
  contViewTxt1: {
    color: '#FF1493',
    fontWeight: '700',
    fontSize: 13,
    margin: 6,
  },
  contentViewTxt2: {
    color: 'gray',
    fontSize: 13,
    fontWeight: '700',
    margin: 6,
  },
  peopleStyle: {height: 70, width: 70, margin: 10},
  bookStyle: {height: 16, width: 16, margin: 3},
  thirdHeaderTxt: {
    margin: 10,
    alignSelf: 'flex-start',
    marginStart: 10,
    fontWeight: '700',
    fontSize: 15,
    color: '#FF1493',
  },
  thirdHeaderTxtContent: {
    fontSize: 14,
    margin: 7,
    fontSize: 10,
    fontWeight: '700',
    padding: 6,
    color: 'gray',
  },

  contentTextStyle: {
    fontSize: 12,
    margin: 3,
    color: 'gray',
    fontWeight: '700',
  },
  continueBtn: {
    backgroundColor: '#FF1493',
    margin: 6,
    borderRadius: 5,
    alignSelf: 'center',
  },
  continueBtnTxt: {
    margin: 10,
    marginStart: 20,
    marginEnd: 20,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
    alignSelf: 'center',
  },
});
