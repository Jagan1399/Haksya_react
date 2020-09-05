import React,{useState} from 'react'
import { render } from '@testing-library/react'
import ReactDOM from 'react-dom'
import {Col,Row,Container} from 'reactstrap'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DoneIcon from '@material-ui/icons/Done';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEdit } from '@fortawesome/free-regular-svg-icons'
// import Card from 'react-bootstrap/Card'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';




export const Product=(props)=>{
    // console.log(props)
    let [prod_name,setProdName]=useState(props.product_name)
    let [scale,setScale]=useState(props.scale)
    let [quantity,setQuantity]=useState(props.quantity)
    let [cost,setCost]=useState(props.cost)
    // console.log(props._editable)
    // let prod_name='',scale='',quantity=0
    const scale_options=['PKT','CTN','BAG','BOX']
    let scale_view
 
    let content=
        (
            <tr>
            <td contentEditable={props.can_edit ? true:false} name="product_name" onInput={e=>{setProdName(e.target.innerHTML)}}>{props.product_name}</td>
            <td contentEditable={props.can_edit ? true:false} name="scale" id="scale_ele" onInput={e=>{setScale(e.target.innerHTML)}}>{props.scale}</td>
            <td contentEditable={props.can_edit ? true:false} name="cost" id="cost_ele" onInput={e=>{setCost(e.target.innerHTML)}}><span className="glyphicon glyphicon-usd"></span>{props.cost}</td>
            <td contentEditable={props.can_edit ? true:false} name="quantity" onInput={e=>{setQuantity(e.target.innerHTML)}} >{props.quantity}</td>
            <td><button onClick={()=>{
                props.on_delete(props.id)
            }}><DeleteIcon fontSize="large"/></button></td>
            <td><button onClick={()=>{props.on_edit(props.id)}}><EditIcon fontSize="large"/></button></td>
            <td hidden={!props.can_edit ? true:false}><button onClick={()=>{props.edit_product(props.id,prod_name,scale,quantity,cost)}}><DoneIcon fontSize="large"/></button></td>
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
            }}><span className="glyphicon glyphicon-trash"></span></button></td>
            <td><button onClick={()=>{props.edit_prod(props.id)}}><span className="glyphicon glyphicon-pencil"></span></button></td>
            <td hidden={!props.can_Edit ? true:false}><button onClick={()=>{props.edit_handler(props.id,cust_name,address)}}><span className="glyphicon glyphicon-ok"></span></button></td>
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
            }}><span className="glyphicon glyphicon-trash"></span></button></td>
            <td><button onClick={()=>{props.edit_sell_id(props.id)}}><span className="glyphicon glyphicon-pencil"></span></button></td>
            <td hidden={!props.can_Edit ? true:false}><button onClick={()=>{props.edit_handler(props.id,seller_name,address)}}><span className="glyphicon glyphicon-ok"></span></button></td>
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


export const Card_temp=(props)=>{
    // console.log(props.cost)
    // console.log(props.quantity)
    // console.log(props.image)
    let [quantity,setQuantity]=useState(0)
    let [checked,setChecked]=useState(false)
    return (
        <div>
        <Card style={{marginTop:"30px"}}>
          <CardImg top src={props.image} alt="Image does not found" style={{width:"100%",height:"200px"}}/>
          <CardBody>
            <Row>
                <Col sm="12">
                    <CardTitle style={{textAlign:"center",fontSize:"32px"}} name="prod_name">{  props.prod_name  }</CardTitle>
                </Col>
            </Row>
            <CardSubtitle style={{textAlign:"center"}} name="scale">{props.scale}</CardSubtitle>
            <CardText style={{textAlign:"center",marginTop:"10px"}} name="cost"><span className="glyphicon glyphicon-usd"></span>{props.cost}</CardText>
            <Row>
            <Col sm="6">
                <CardText style={{marginLeft:"20%",paddingLeft:"20px"}} name="quantity">{props.quantity} </CardText>
            </Col>
            <Col sm="6">
                <input style={{borderRadius:"5px",width:"80%",paddingLeft:"20px",marginLeft:"10%",marginBottom:"10%"}} name="req_quantity" type="number" value={quantity} onChange={e=>{setQuantity(e.target.value)}}></input>
            </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <Button style={{}} className="btn btn-success" onClick={e=>{props.add_to_cart(props.id,quantity,props.cost)}}>Add to Cart</Button>
                </Col>
                <Col sm="6">
                <Button style={{ }} className="btn btn-danger" onClick={e=>{props.delete_from_cart(props.id,quantity,props.cost);setQuantity(0)}}>Delete from Cart</Button>
                </Col>
            </Row>
            
          </CardBody>
        </Card>
      </div>
    )
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