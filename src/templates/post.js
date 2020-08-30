import React,{useState} from 'react'
import { render } from '@testing-library/react'




export const Product=(props)=>{
    // console.log(props)
    // let prod_name='',scale='',quantity=0
    let [prod_name,setProdName]=useState(props.product_name)
    let [scale,setScale]=useState(props.scale)
    let [quantity,setQuantity]=useState(props.quantity)
    // console.log(props)
    let content=
        (
            <tr>
            <td contentEditable={props.can_edit ? true:false} name="product_name" onInput={e=>{setProdName(e.target.innerHTML)}}>{props.product_name}</td>
            <td contentEditable={props.can_edit ? true:false} name="scale" onInput={e=>{setScale(e.target.innerHTML)}}>{props.scale}</td>
            <td contentEditable={props.can_edit ? true:false} name="quantity" onInput={e=>{setQuantity(e.target.innerHTML)}} >{props.quantity}</td>
            <td><button onClick={()=>{
                props.on_delete(props.id)
            }}>x</button></td>
            <td><button onClick={()=>{props.on_edit(props.id)}}>Edit</button></td>
            <td hidden={!props.can_edit ? true:false}><button onClick={()=>{props.edit_product(props.id,prod_name,scale,quantity)}}>Save</button></td>
            </tr>
        )
    return content
        
}


export const Customer=(props)=>{
    // console.log(props)
    let [cust_name,setCustName]=useState(props.customer_name)
    let [address,setAddress]=useState(props.address)
    render()
    {
        // console.log("RERENDERING")
        return(
            <tr>
            <td contentEditable={props.can_Edit ? true:false} name="cust_name" onInput={e=>{setCustName(e.target.innerHTML)}} >{props.customer_name}</td>
            <td contentEditable={props.can_Edit ? true:false} name="address" onInput={e=>{setAddress(e.target.innerHTML)}} >{props.address}</td>
            <td><button onClick={()=>{
                props.delete_cust(props.id)
            }}>x</button></td>
            <td><button onClick={()=>{props.edit_prod(props.id)}}>Edit</button></td>
            <td hidden={!props.can_Edit ? true:false}><button onClick={()=>{props.edit_handler(props.id,cust_name,address)}}>Save</button></td>
            </tr>
        )
    }
}

export const Seller_temp=(props)=>{
    // console.log(props)
    let [seller_name,setSellerName]=useState(props.seller_name)
    let [address,setAddress]=useState(props.address)
    render()
    {
        // console.log("RERENDERING")
        return(
            <tr>
            <td contentEditable={props.can_Edit ? true:false} name="seller_name" onInput={e=>{setSellerName(e.target.innerHTML)}} >{props.seller_name}</td>
            <td contentEditable={props.can_Edit ? true:false} name="address" onInput={e=>{setAddress(e.target.innerHTML)}} >{props.address}</td>
            <td><button onClick={()=>{
                props.delete_seller(props.id)
            }}>x</button></td>
            <td><button onClick={()=>{props.edit_sell_id(props.id)}}>Edit</button></td>
            <td hidden={!props.can_Edit ? true:false}><button onClick={()=>{props.edit_handler(props.id,seller_name,address)}}>Save</button></td>
            </tr>
        )
    }
}


