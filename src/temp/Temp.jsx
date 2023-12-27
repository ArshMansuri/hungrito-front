import React, { useEffect } from "react";

const Gmap =()=>{
     useEffect(()=>{
        const iframeData =document.getElementById('iframeId');
        const lat=23.038801;
        const lon=72.512048;

        iframeData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es&output=embed`;
     })
    return(
        <>
            <div>
                <iframe id="iframeId"height="500px" width="100%" title="google map"></iframe>
            </div>
        </>
    )
}

export default Gmap;