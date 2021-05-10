import * as React from 'react';
import{Text,View,StyleSheet,TouchableOpacity,Image} from 'react-native';
import * as Perissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state= {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }
    }

    getCameraPermissions= async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status=== 'granted',
            buttonState: status=== 'clicked'
        });
    }
    handleBarCodeScanner= async ({type,data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        });
    }
    render(){
        const hasCameraPermissions= this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState=== "clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned={
                    scanned? undefined:this.handleBarCodeScanner
                }
                style={StyleSheet.absoluteFillObject}
                />
            );
        }
        else if (buttonState==="normal"){
        return(
            <View style={StyleSheet.container}>
            <Image
            source={require("../assets/barcodescanner")}
            style={{width:200, height: 200}}/>
            <Text style={StyleSheet.text}>{
                hasCameraPermissions===true? this.state.scannedData: "Request Camera Permissions"
            }</Text>
            <TouchableOpacity
            onPress={this.getCameraPermissions}
            style={StyleSheet.scanButton}>
                <Text style={StyleSheet.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>
            </View>
        );
        }
    }

}
const styles= StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 17,
        textDecorationLine: 'underline'
    },
    scanButton:{
       backgroundColor: '#c8d0e6',
        padding: 10,
        margin: 10,
    },
    buttonText:{
        color:'black',
        fontSize: 15,
    }
})