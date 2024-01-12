import React from 'react'
import './skeleton.css'

const Skeleton = ({width='unset', count=5}) => {

    const loader = Array.from({length: count}, (s,inX)=>(
         <div key={inX} className='skeloton-shap my-1'></div>
    ))

  return (
    <div className='skeleton-loader d-flex flex-column' style={{width}}>
       {loader}
    </div>
  )
}

export default Skeleton