import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Image, StyleSheet, FlatList, Dimensions, ImageSourcePropType, NativeScrollEvent, NativeSyntheticEvent, FlatListProps, TouchableOpacity } from "react-native";
import Button from "../../components/buttons";
import ButtonWhite from "../../components/buttonwhite";
import { useFonts } from "expo-font";
import {useRouter } from 'expo-router';
interface Item {
    id: string;
    image: ImageSourcePropType;
    title: string,
    description: string,
}
const WelcomeScreen: React.FC = () => {
    const router=useRouter();
    const flatListRef: any = useRef();
    const [activeIndex, setActiveIndex] = useState(0);
    const screenWidth = Dimensions.get("window").width;
    const num=1;
    useEffect(() => {
        let interval = setInterval(() => {
            if (activeIndex === images.length - 1) {
                flatListRef.current.scrollToIndex({
                    index: 0,
                    animated: true
                })
            }
            else {
                flatListRef.current.scrollToIndex({
                    index: activeIndex + 1,
                    animated: true
                })
            }
        }, 3000);
        return () => {
            clearInterval(interval);
        }
    })
    const getItemLayout = (data: any, index: number) => ({
        length: screenWidth,
        index: index,
        offset: screenWidth * index,
    })
    const images: Array<Item> = [{
        id: "1",
        image: require("../../assets/images/26432779_hr_text1.jpg"),
        title: "Welcome to HR-App!",
        description: "Easily access company and partnership data in one place."
    },
    {
        id: "2",
        image: require("../../assets/images/siccc2.jpeg"),
        title: "All Employee Info",
        description: "Quickly find employee details, roles, and performance data contract and related documents."
    },
    {
        id: "3",
        image: require("../../assets/images/jobInRwanda.webp"),
        title: "Easy Data Access",
        description: "Get instant access to essential data with just a few taps."
    }
    ]
    
    const [fontLoaded] = useFonts({
        'Avenir': require('../../assets/fonts/avenir_ff/AvenirLTStd-Book.otf'),
        'Avenirbold': require('../../assets/fonts/avenir_ff/AvenirLTStd-Black.otf'),
        'Avenirroman': require('../../assets/fonts/avenir_ff/AvenirLTStd-Roman.otf'),
    })
    if (!fontLoaded) return null;
    const renderItem = ({ item, index }: { item: Item, index: number }) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={item.image} style={{ height: 200, width: screenWidth, resizeMode: 'contain' }} />
                <View style={styles.align}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>
        )
    }
    const renderDots = () => {
        return images.map((image, index) => {
            if (activeIndex === index) {
                return (
                    <View
                        key={index}
                        style={{
                            width: 7,
                            height: 7,
                            borderRadius: 3.5,
                            backgroundColor: '#F43939',
                            marginHorizontal: 3
                        }}></View>
                )
            }
            else {
                return (
                    <View
                        key={index}
                        style={{
                            width: 7,
                            height: 7,
                            borderRadius: 3.5,
                            backgroundColor: 'grey',
                            marginHorizontal: 3
                        }}></View>
                )
            }

        })
    }
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const x = event.nativeEvent.contentOffset.x;
        const index = x / screenWidth;
        setActiveIndex(index);
    }
    return (
        <View style={styles.container}>
                <Text style={[styles.skip, styles.description]}>Skip</Text>
            <View>
                <FlatList
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={(item: Item) => item.id}
                    horizontal={true}
                    pagingEnabled={true}
                    onScroll={handleScroll}
                    getItemLayout={getItemLayout}
                    ref={flatListRef as any}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.align}>
                <View style={{ flexDirection: 'row' }}>
                    {renderDots()}
                </View>
            </View>
            <View style={{ width: '90%' }}>
                <TouchableOpacity onPress={()=>router.push("/Screens/RegisterWithEmail")}>
                    <Button />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/Screens/RegisterWithPhone")}>
                    <ButtonWhite />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={styles.signup}>Don't have an account?
                    </Text>
                    <Pressable>
                        <Text style={[styles.active, styles.signup]}> Signup</Text>
                    </Pressable>
                </View>
            </View>

        </View>
    );
}
export default WelcomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEAF3',
        alignItems: 'center',
        overflow: 'scroll',
    },
    imgContainer: {
        marginTop: 130,
        width: '80%',
        height: 300,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    img: {
        width: "100%",
        resizeMode: 'contain',
    },
    skip: {
        marginTop: 40,
        marginBottom: 40,
        marginRight: 40,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        color:"blue",
    },
    title: {
        fontFamily: 'Avenirroman',
        fontSize: 30,
        marginBottom: 5,
        color:"green"
    },
    description: {
        fontFamily: 'Avenir',
        opacity: 0.5,
        textAlign: 'center',
        letterSpacing: 0.24,
        lineHeight: 20,
    },
    align: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        marginTop: 10,
        marginBottom: 20,
        width: 300,
    },
    points: {
        fontFamily: 'Avenirbold',
        fontSize: 35,
        color: 'grey',

    },
    active: {
        color: '#F43939',
    },
    signup: {
        fontFamily: 'Avenir',
        alignSelf: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
    },
    up: {
        marginTop: 2,
    }
})
