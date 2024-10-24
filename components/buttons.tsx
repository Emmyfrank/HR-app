import { View,Pressable, Text, StyleSheet } from "react-native";
import {useFonts} from "expo-font"
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome"
import {faEnvelope} from "@fortawesome/free-solid-svg-icons"
const Button: React.FC=()=>{
    const [fontsLoaded]= useFonts({'Avenir': require('../assets/fonts/avenir_ff/AvenirLTStd-Book.otf')})
    if(!fontsLoaded) return null;
    return(
        <View>
            <View style={styles.button}>
                <View style={styles.flex}>
                    <FontAwesomeIcon icon={faEnvelope} size={20} color="#fff"/>
                    <Text style={styles.btntxt}> Continue with email</Text>
                </View>
            </View>
            
        </View>
    )
}
export default Button;
const styles = StyleSheet.create({
     button:{
         backgroundColor: '#1D4ED8',
         width: '100%',
         height: 60,
         borderRadius: 10,
         justifyContent: 'center',
         alignItems: 'center',
         marginTop: 20,
         marginBottom: 10,
     },
     btntxt:{
         color: '#fff',
         fontSize: 17,
         fontFamily:'Avenir',
     },
     flex:{
        flexDirection: 'row',
        gap: 10,
     }
})