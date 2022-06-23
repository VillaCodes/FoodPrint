import React, {useEffect} from "react";

/*  
Custom hook to append the Google Identity Services script to the Index.html file without directly saving changes to the index file.
@param url refers to the google url script src
@param onload takes in a function that accesses the google.accounts.id utilities such as the initialize function and element rendering methods
*/

export const useScript = (url: string, onload: any) => {
    useEffect (() => {
        const script = document.createElement("script");

        script.src = url;

        script.onload = onload;

        document.head.appendChild(script);

        () => document.head.removeChild(script);

        return; 
    }, [url, onload]);
};