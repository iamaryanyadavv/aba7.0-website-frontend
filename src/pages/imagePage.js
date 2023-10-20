import { Button, Input, Text } from "@nextui-org/react";
import React, { useState } from "react";
import imageCompression from 'browser-image-compression';

export default function ImagePage() {
    const [initialImage, setInitialImage] = useState();
    const [finalImage, setFinalImage] = useState();

    async function sendForm(img,name) {
        //required inputs: firstname, lastname, batch, phonenumber, gender, position 1, position 2, 
        //not required inputs: middlename, image, comment

        // image, name, ppos, spos, comments, tier, price, team, teamlogo, gender, batch, email
        // https://aplapi.onrender.com/registration/player
        
        const res = await fetch('http://localhost:3001/image', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                image: img,
                name: name
            })
        })
        console.log(res.status)
    }

    const convertImageToBase64 = async (e) => {
        const options = {
            maxSizeMB: 0.015,
            maxWidthOrHeight: 400,
            useWebWorker: true
        }

        console.log(initialImage)
        for(var img in initialImage){
            const compressedFile = await imageCompression(initialImage[img], options);
            convertBlobToBase64(compressedFile, initialImage[img].name)
        }

    }

    const convertBlobToBase64 = async (blob, name) => { // blob data
        const img = await blobToBase64(blob);
        // setFinalImage(img);
        sendForm(img, name)
    }

    const blobToBase64 = blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => { resolve(reader.result); }
        reader.onerror = error => reject(error);
    });

    return (
        <>
            <input 
                onChange={(event) => {
                    console.log(event.target.files)
                    if (event.target.files[0].size > 2200000) {
                        window.alert('Maximum file size: 2mb!')
                    }
                    else {
                        setInitialImage(event.target.files)
                        console.log('Thank you for correct image size')
                    }
                }}
                className="photobtn" animated={'true'} type='file' accept="image/*" multiple />
            <Button auto rounded
                css={{
                    background: '$gray900'
                }}
                onPress={() => {
                    if (initialImage) { convertImageToBase64() }
                }}>
                <Text
                    css={{
                        color: 'White',
                        fontWeight: '$semibold'
                    }}>
                    Set Final Image
                </Text>
            </Button>
            <Button auto rounded
                css={{
                    background: '$gray900'
                }}
                onPress={(e) => {
                    sendForm(e);
                    // setRegProcess(true);
                    // checkIfRegSuccess(emailID);
                }}>
                <Text
                    css={{
                        color: 'White',
                        fontWeight: '$semibold'
                    }}>
                    Send Image
                </Text>
            </Button>
        </>
    )
}