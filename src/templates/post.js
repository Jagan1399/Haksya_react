import React,{useState} from 'react'
import { render } from '@testing-library/react'
import ReactDOM from 'react-dom'
import Card from 'react-bootstrap/Card'




export const Product=(props)=>{
    console.log(props)
    let [prod_name,setProdName]=useState(props.product_name)
    let [scale,setScale]=useState(props.scale)
    let [quantity,setQuantity]=useState(props.quantity)
    // console.log(props._editable)
    // let prod_name='',scale='',quantity=0
    const scale_options=['PKT','CTN','BAG','BOX']
  
    
    // const dropdown=  <select onChange={e=>{setScale(e.target.value)}}>
    //              {
    //                  scale_options.map(opt_val=>{
    //                  return <option>{opt_val}</option>
    //                  })
    //              }
    //         </select>
    
    // if(props._editable)
    // {
    //     console.log(dropdown)
    //     // document.getElementById('scale_ele').innerHTML=dropdown
    //     ReactDOM.render(dropdown,document.getElementById('scale_ele'))
    // }
   
    
    
    // console.log(props)
    let content=
        (
            <tr>
            <td contentEditable={props.can_edit ? true:false} name="product_name" onInput={e=>{setProdName(e.target.innerHTML)}}>{props.product_name}</td>
            <td contentEditable={props.can_edit ? true:false} name="scale" id="scale_ele" onInput={e=>{setScale(e.target.innerHTML)}}>{props.scale}</td>
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


export const Place_order=(props)=>{
    let [quantity,setQuantity]=useState(0)
    let [checked,setChecked]=useState(false)
    
    // console.log(props)
    render()
    {
    return (
        
        <tr>
            <td name="prod_name">{props.prod_name}</td>
            <td name="scale">{props.scale}</td>
            <td name="avai_quan">{props.quantity}</td>
            <td><input type="number" name="req_quan" value={quantity} onChange={e=>{setQuantity(e.target.value)}}></input></td>
            <td><input type="checkbox" onChange={e=>{
                props.on_check(props.id,props.prod_name,props.scale,props.quantity,quantity,e.target.checked)
                }}></input></td>
        </tr> 

    )
    }
}


// export const Place_order_card=(props)=>{
//     render()
//     {
//         return (
//             <Card style={{ width: '18rem' }}>
//             <Card.Body>
//                 <Card.Title>{props.prod_name}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">{props.price}</Card.Subtitle>
//                 <Card.Text>
//                     {props.scale}
//                 </Card.Text>
//                 <Card.Text>
//                     {props.quantity}
//                 </Card.Text>
//                 <Card.Link href="#">Card Link</Card.Link>
//                 <Card.Link href="#">Another Link</Card.Link>
//             </Card.Body>
//             </Card>
//         )
//     }
// }

// export const Place_order_card_pen=(props)=>{
//     render()
//     {
//         return (
        
//         <div class="shopping-cart">

//             <div class="column-labels">
//             <label class="product-image">Image</label>
//             <label class="product-details">Product</label>
//             <label class="product-price">Price</label>
//             <label class="product-quantity">Quantity</label>
//             <label class="product-removal">Remove</label>
//             <label class="product-line-price">Total</label>
//             </div>
//             <div class="product">
//                 <div class="product-image">
//                     <img src=""/>
//                 </div>
//                 <div class="product-details">
//                     <div class="product-title">{props.prod_name}</div>
//                     <p class="product-description">{props.scale}</p>
//                 </div>
//                 <div class="product-price">{props.price}</div>
//                 <div class="product-quantity">
//                     <input type="number" value="2" min="1"/>
//                 </div>
//                 <div class="product-removal">
//                     <button class="remove-product">
//                         Remove
//                     </button>
//                 </div>
//                 <div class="product-line-price">25.98</div>
//             </div>
//         </div>
//         )
//     }
// }






