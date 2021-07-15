import React from "react";
import {Toaster} from "react-hot-toast";


export const renderToast = () => {
 return(
     <Toaster
         position="bottom-center"
         toastOptions={{
             success: {
                 style: {
                     background: "#212121",
                     maxWidth: "fit-content",
                     color: "#fff",
                     padding: ".8rem 1rem",
                     fontSize: "15px"
                 },
             },
             error: {
                 style: {
                     background: "#212121",
                     maxWidth: "fit-content",
                     color: "#fff",
                     padding: ".8rem 1rem",
                     fontSize: "15px"
                 },
             },
         }}
     />
 )
}