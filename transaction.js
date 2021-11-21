import React from "react";
import {TouchableOpacity,View,StyleSheet,Text , Image, TextInput} from "react-native";
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";
import db from "../config"
import firebase from "firebase"
export default class Transaction extends React.Component{
    constructor(){
        super()
        this.state={
            hasCamPermissions:null,
            scanned:false,
            buttonState:"normal",
            scannedBookId:"",
            scannedStudentId:"",

        }
    }
    getCamPermission=async(id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCamPermissions:status==="granted",
            buttonState: id,
            scannned:false,

        })
    }
    handleTransaction=async()=>{
        var massage=null
        db.collection("books").doc(this.state.scannedBookId).get()
        .then(doc=>{
            var book=doc.data()
            if(book.bookavail){
                this.initiatebookissue()
                message="issue"
            }
else{this.initiatebookreturn()
    message="return"
}
        })
    }
    initiatebookissue=async()=>{
       db.collection("transactions").add(
           {studentId:this.state.scannedStudentId,
        bookId:this.state.scannedBookId,
    date:firebase.firestore.Timestamp.now().toDate(),
transactionType:"issued"})
db.collection("books").doc(this.state.scannedBookId).update({
    bookavail:false
})
db.collection("Students").doc(this.state.scannedStudentId).update({
    noofbooksissued:firebase.firestore.FieldValue.increment(1)
})
this.setState({scannedBookId:"",scannedStudentId:""})
    }

    initiatebookreturn=async()=>{
        db.collection("transactions").add(
            {studentId:this.state.scannedStudentId,
         bookId:this.state.scannedBookId,
     date:firebase.firestore.Timestamp.now().toDate(),
 transactionType:"returned"})
 db.collection("books").doc(this.state.scannedBookId).update({
     bookavail:true
 })
 db.collection("Students").doc(this.state.scannedStudentId).update({
     noofbooksissued:firebase.firestore.FieldValue.increment(-1)
 })
 this.setState({scannedBookId:"",scannedStudentId:""})
     }
handleBarcode=async({type,data})=>{
    var {buttonState}=this.state
    if(buttonState==="bookId"){

    
    this.setState({
        scanned:true,
        scannedBookId:data,
        buttonState:"normal"
    })}
    else if(buttonState==="studentId"){
        this.setState({
            scanned:true,
            scannedStudentId:data,
            buttonState:"normal"
        }) 
    }
}
    render(){
        const hasCamPermissions=this.state.hasCamPermissions
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState!=="normal"&&hasCamPermissions){
            return(
                <BarCodeScanner style={StyleSheet.absoluteFillObject} onBarCodeScanned={scanned?undefined:this.handleBarcode }></BarCodeScanner>
            )
        }
        else if (buttonState==="normal"){
      return(
           <View style={styles.container}>
               <View>
                   <Image source={require("../assets/booklogo.jpg")} style={{width:200,height:200}}></Image>
                   <Text style={{fontSize:30, textAlign:"center"}}> WILY </Text>
               </View>
               <View style={styles.inputView}>
                   <TextInput value={this.state.scannedBookId} style={styles.inputBox} placeholder="bookId" onChangeText={txt=>{
                       this.setState({scannedBookId:txt})
                   }}/>
                   <TouchableOpacity style={styles.scanButton} onPress={()=>{this.getCamPermission("bookId")}}> 
                   <Text style={styles.buttonText}> Scan </Text>
                   </TouchableOpacity>
               </View>
               <View style={styles.inputView}>
                   <TextInput value={this.state.scannedStudentId} style={styles.inputBox} placeholder="studentId" onChangeText={txt=>{
                       this.setState({scannedStudentId:txt})
                   }}/>
                   <TouchableOpacity style={styles.scanButton} onPress={()=>{this.getCamPermission("studentId")}}> 
                   <Text style={styles.buttonText}> Scan </Text>
                   </TouchableOpacity>
               </View>
               <TouchableOpacity style={styles.submitButton}onPress={async()=>this.handleTransaction()}>
                   <Text> submit </Text>
               </TouchableOpacity>
            </View>
        )}
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });