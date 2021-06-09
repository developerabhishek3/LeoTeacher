import { StyleSheet,Dimensions } from "react-native";
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
    container:{
        flex:1,               
        backgroundColor:'#F6F2EF',
        justifyContent:'center',
        alignItems:'center',
    },
   
    bgImgStyle: {
        height:'100%',
        width:'100%', 
        
        },
        continueBtn:{
            backgroundColor:'#b41565',
            margin:20,
            borderRadius:5,
            width:'40%',
            alignSelf:'center',
            justifyContent:"center"
        
        },
    headerView:{
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:20,
    },
    headerLogo:{
        height:60,width:45,
        margin:10,
    },
    headerTxt:{
        fontSize:26,
        fontWeight:'700',
        margin:1,
        marginStart:30

    },
    txtStyle:{
        fontSize:15,
        fontWeight:'600',
        marginStart:30,
        alignSelf:'flex-start',marginBottom:30,
        margin:10,
        color:"#000000"
    },
    txtStyle1:{
        fontSize:15,
        fontWeight:'600',
        marginStart:30,
        alignSelf:'flex-start',
        marginBottom:10   ,
        color:"#000000"     
    },
    txtStyle2:{
        fontSize:14,
        fontWeight:'600',        
        marginStart:20,
        alignSelf:'center',        
        margin:2,
        color:"#000000",
        width:"90%",

    },
    txtStyle3:{
        fontSize:15,
        fontWeight:'700',
        marginStart:20,
        alignSelf:'center',  
        marginBottom:10   ,
        color:"#000000"
    },

    continueBtnTxt:{
        margin:10,
        color:'#FFFFFF',
        fontWeight:"700",
        fontSize:16,
        textAlign:"center",
        alignSelf:"center",
        marginStart:30,marginEnd:30,
    },

})