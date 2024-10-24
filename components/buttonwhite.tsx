import { View,Pressable, Text, StyleSheet } from "react-native";
import {useFonts} from "expo-font"
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome"
import {faPhone} from "@fortawesome/free-solid-svg-icons"
const ButtonWhite: React.FC=()=>{
    const [fontsLoaded]= useFonts({'Avenir': require('./../assets/fonts/avenir_ff/AvenirLTStd-Book.otf')})
    if(!fontsLoaded) return null;
    return(
        <View>
            <View style={styles.button}>
                <View style={styles.flex}>
                    <FontAwesomeIcon icon={faPhone} size={20} />
                    <Text style={styles.btntxt}> Continue with phone</Text>
                </View>
            </View>
            
        </View>
    )
}
export default ButtonWhite;
const styles = StyleSheet.create({
     button:{
         backgroundColor: 'white',
         width: '100%',
         height: 60,
         borderRadius: 10,
         justifyContent: 'center',
         alignItems: 'center',
         marginTop: 10,
         marginBottom: 20,
     },
     btntxt:{
         fontSize: 17,
         fontFamily:'Avenir',
     },
     flex:{
        flexDirection: 'row',
        gap: 10,
     }
})