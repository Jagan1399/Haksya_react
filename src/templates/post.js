import React,{useState} from 'react'
import { render } from '@testing-library/react'
import ReactDOM from 'react-dom'
import {Col,Row,Container} from 'reactstrap'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DoneIcon from '@material-ui/icons/Done';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
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
    console.log(props.cart_quan)
    let [quantity,setQuantity]=useState(props.cart_quan)
    // console.log(quantity)
    let [checked,setChecked]=useState(false)
    // if(props.cart_quan)
    // {
    //     setQuantity(props.cart_quan)
    // }
    return (
        <div>
        <Card style={{marginTop:"30px"}}>
          <CardImg top src={props.image} alt="Image not found" style={{width:"100%",height:"200px",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px"}}/>
          <CardBody>
            <Row>
                <Col sm="8">
                    <Row>
                        <Col sm="8">
                            <CardTitle style={{fontSize:"28px",color:"#1F1547",fontWeight:"bold",left:"24px"}} name="prod_name">{  props.prod_name  }</CardTitle>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="8">
                            <CardSubtitle style={{left:"24px",fontSize:"12px",color:"#92909E",top:"0px",marginBottom:"14px"}} name="scale"><AttachMoneyIcon fontSize="medium" style={{marginBottom:"5px"}}/>{props.cost} / {props.scale}</CardSubtitle>
                        </Col>
                    </Row>
                </Col>
                <Col sm="4">
                    <input style={{border:"1px solid #C4C4C4",borderRadius:"4px",width:"80%",paddingLeft:"5px",marginTop:"10px"}} name="req_quantity" type="number" value={quantity} onChange={e=>{setQuantity(e.target.value)}}></input>
                </Col>
            </Row>
            {/* <Row>
                <Col md="6">
                    <CardSubtitle style={{left:"24px",fontSize:"12px",color:"#92909E"}} name="scale"><AttachMoneyIcon fontSize="medium" style={{marginBottom:"5px"}}/>{props.cost} / {props.scale}</CardSubtitle>
                </Col>
                <Col md="6">
                    <input style={{borderRadius:"5px",width:"80%",paddingLeft:"20px",marginLeft:"10%",marginBottom:"10%"}} name="req_quantity" type="number" value={quantity} onChange={e=>{setQuantity(e.target.value)}}></input>
                </Col>
            </Row> */}
            {/* <CardText style={{textAlign:"center",marginTop:"10px"}} name="cost"><span className="glyphicon glyphicon-usd"></span>{props.cost}</CardText> */}
            <Row>
                <Col sm="6">
                    <Button style={{float:"right"}} className="btn btn-success" onClick={e=>{props.add_to_cart(props.id,quantity,props.cost)}}><AddShoppingCartIcon fontSize="large"/> Add to cart</Button>
                </Col>
                <Col sm="6">
                <Button style={{ float:"center"}} className="btn btn-danger" onClick={e=>{props.delete_from_cart(props.id,quantity,props.cost);setQuantity(0)}}><RemoveShoppingCartIcon fontSize="large"/> Remove</Button>
                </Col>
            </Row>
            
          </CardBody>
        </Card>
      </div>
    )
}









//latest card temp all details
// {/* <div>
//         <Card style={{marginTop:"30px"}}>
//           <CardImg top src={props.image} alt="Image does not found" style={{width:"100%",height:"200px"}}/>
//           <CardBody>
//             <Row>
//                 <Col sm="12">
//                     <CardTitle style={{textAlign:"center",fontSize:"32px"}} name="prod_name">{  props.prod_name  }</CardTitle>
//                 </Col>
//             </Row>
//             <CardSubtitle style={{textAlign:"center"}} name="scale"><span className="glyphicon glyphicon-usd"></span>{props.cost} / {props.scale}</CardSubtitle>
//             {/* <CardText style={{textAlign:"center",marginTop:"10px"}} name="cost"><span className="glyphicon glyphicon-usd"></span>{props.cost}</CardText> */}
//             <Row>
//             <Col sm="6">
//                 <CardText style={{marginLeft:"20%",paddingLeft:"20px"}} name="quantity">{props.quantity} </CardText>
//             </Col>
//             <Col sm="6">
//                 <input style={{borderRadius:"5px",width:"80%",paddingLeft:"20px",marginLeft:"10%",marginBottom:"10%"}} name="req_quantity" type="number" value={quantity} onChange={e=>{setQuantity(e.target.value)}}></input>
//             </Col>
//             </Row>
//             <Row>
//                 <Col sm="6">
//                     <Button style={{}} className="btn btn-success" onClick={e=>{props.add_to_cart(props.id,quantity,props.cost)}}>Add to Cart</Button>
//                 </Col>
//                 <Col sm="6">
//                 <Button style={{ }} className="btn btn-danger" onClick={e=>{props.delete_from_cart(props.id,quantity,props.cost);setQuantity(0)}}>Delete from Cart</Button>
//                 </Col>
//             </Row>
            
//           </CardBody>
//         </Card>
//       </div> */}