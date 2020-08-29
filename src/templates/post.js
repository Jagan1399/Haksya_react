import React,{Component,useState} from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'




export const Product=(props)=>{
    // let prod_name='',scale='',quantity=0
    let [prod_name,setProdName]=useState(props.product_name)
    let [scale,setScale]=useState(props.scale)
    let [quantity,setQuantity]=useState(props.quantity)

    const input_handler=(event)=>{
        console.log(event)
        if(event.target.name=='product_name')
        {
            setProdName(event.target.value)
        }
        else if(event.target.name=='scale')
        {
            scale=event.target.value
        }
        else if(event.target.name=='quantity')
        {
            quantity=event.target.value
        }
    }
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
    render()
    {
        // console.log("RERENDERING")
        return(
            <tr>
            <td>{props.customer_name}</td>
            <td>{props.address}</td>
            </tr>
        )
    }
}



// function post(props)
// {
//     const isLoading=props.isLoading
//     console.log(props)
//     render()
//     {
//     if(!isLoading)
//     {
//         return <loading />
//     }
//     else{
//         props.cust_list.map(cust=>{
//             return <table cust={cust} />
//         })
//     }
// }}

// function loading()
// {
//     return <h2>Loading...</h2>
// }
// function table(props)
// {
//     console.log("FROM"+props)
//     return (
//         <table>
//             <tr><th>Email</th></tr>
//             <tr><td>{props.cust.email}</td></tr>
//         </table>
//     )
// }

// // ReactDOM.render(
// //     <post  />,
// //     document.getElementById('root')
// // )




// export default post




// {/* <div>        
// <table>
//     <tr>
//         <th>Email</th>
//     </tr>
//     <tr>
//         {props.cust_list.map((post,index)=>{
//             <td key={index}>{post.email}</td>
//         })}
//     </tr>
// </table>

// </div> */}