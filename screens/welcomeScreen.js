import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView,Image} from 'react-native';
import db from'../config';
import firebase from 'firebase';
import {RFValue} from 'react-native-responsive-fontsize'

export default class WelcomeScreen extends Component{
constructor(){
    super();
    this.state={
        emailId:'',
        password:'',
        firstName:'',
        lastName:'',
        address:'',
        contact:'',
        confirmPassword:'',
        isModalVisible:'false'
    }
}
userLogin=(emailId,password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId,password)
    .then(()=>{
        this.props.navigation.navigate('HomeScreen')
    })
    .catch((error)=>{
        var errorCode=error.code;
        var errorMessage=error.message;
        return alert(errorMessage)
    })
}
userSignUp=(emailId,password,confirmPassword)=>{
    if(password!==confirmPassword){
    return alert("password doesnt match please check your password")
    }
    else{
        firebase.auth().createUserWithEmailAndPassword(emailId,password)
        .then(()=>{
            db.collection('users').add({
                first_name:this.state.firstName,
                last_name:this.state.lastName,
                contact:this.state.contact,
                email_id:this.state.emailId,
                address:this.state.address,
            })
            return alert(
                'user Added Successfully',
                '',
                [
                    {text:'OK',onPress:()=>this.setState({"isModalVisible":false})}
                ]
            )
        })
        .catch((error)=>{
            var errorCode=error.code;
            var errorMessage=error.message;
            return alert(errorMessage)
        })
   }
}
    showModal=()=>{
        return(
            <Modal
            animationType="fade"
            transparent={true}
            visble={this.state.isModalVisible}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{width:'100%'}}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                            <Text style={styles.modalTitle}>
                                Registration
                            </Text>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"first name"}
                            maxLength={8}
                            onChangeText={(text)=>{
                                this.setState({
                                    firstName:text
                                })
                            }}/>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"last name"}
                            maxLength={8}
                            onChangeText={(text)=>{
                                this.setState({
                                    lastName:text
                                })
                            }}/>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"contact"}
                            maxLength={10}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>{
                                this.setState({
                                    contact:text
                                })
                            }}/>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"address"}
                           multiline={true}
                            onChangeText={(text)=>{
                                this.setState({
                                    address:text
                                })
                            }}/>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"email"}
                            keyboardType={'email-address'}
                            onChangeText={(text)=>{
                                this.setState({
                                    emailId:text
                                })
                            }}/>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"password"}
                            secureTextEntry={true}
                            onChangeText={(text)=>{
                                this.setState({
                                    password:text
                                })
                            }}/>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"confirm password"}
                            secureTextEntry={true}
                            onChangeText={(text)=>{
                                this.setState({
                                    confirmPassword:text
                                })
                            }}/>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                style={styles.registerButton}
                                onPress={()=>{
                                    this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
                                }}
                                >
                                    <Text style={styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={()=>{
                                    this.setState({"isModalVisible":false})
                                }}
                                >
                                    <Text style={styles.registerButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>

        )
    }
render(){
    return(
        <View style={styles.container}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                {
                    this.showModal()
                }
            </View>
            <View style={styles.profileContainer}>
                <Text style={{fontSize:50,fontWeight:'bold',color:'green'}}>Resource Management</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TextInput
                style={styles.loginBox}
                placeholder="example@gmail.com"
                placeholderTextColor="#ffff"
                keyboardType='email-address'
                onChangeText={(text)=>{
                    this.setState({
                        emailId:text
                    })
                }}/>
                 <TextInput
                style={styles.loginBox}
                placeholder="password"
                placeholderTextColor="#ffff"
                secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({
                        password:text
                    })
                }}/>
                <TouchableOpacity
                style={[styles.button,{marginBottom:20,marginTop:20}]}
                onPress={()=>this.userLogin(this.state.emailId,this.state.password)}>
                    <Text style={styles.buttonText}>login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                    this.setState({"isModalVisible":true})
                }}>
                    <Text style={styles.buttonText}>signUp</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#6fc0b8',
    },
    profileContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        fontSize:65,
        fontWeight:'300',
        paddingBottom:30,
        color:'#ff3b00'
    },
    loginBox:{
        width:"80%",
        height:RFValue(50),
        borderBottomWidth:1.5,
        borderColor:'#ff8a65',
        fontSize:RFValue(20),
        margin:10,
        
    },
    keyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    modalTitle:{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:20,
        color:'#ff5722',
        margin:50
    },
    modalContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        backgroundColor:"#fff",
        marginRight:30,
        marginLeft:30,
        marginTop:80,
        marginBottom:80
    },
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30 
     },
     registerButtonText:{
         color:'#ff5722',
         fontSize:15,
         fontWeight:'bold'
     },
     cancelButton:{
         width:200,
         height:30,
         justifyContent:'center',
         alignItems:'center',
         marginTop:5
     },
    button:{
        width:"80%",
        height:RFValue(50),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:RFValue(25),
        marginBottom:RFValue(10),
        backgroundColor:"#ff9800",
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:8,
        },
        shadowOpacity:0.30,
        shadowRadius:10.32,
        elevation:16
    },
    buttonText:{
        color:'#fff',
        fontWeight:'200',
        fontSize:20
    },
    buttonContainer:{
        flex:1,
        alignItems:'center'
    },
    santaImage:{
        width:"70%",
        height:"100%",
        resizeMode:"stretch"
    },
    bookImage:{
        width:"100%",
        height:RFValue(220)
    }
})