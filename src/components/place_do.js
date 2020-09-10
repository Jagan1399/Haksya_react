import React,{Component} from 'react'
import Table from 'react-bootstrap/Table'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import {Place_order,Card_Products,Card_Cart} from '../templates/post'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {Col,Row,Container} from 'reactstrap'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import FilterRes from 'react-filter-search'

import './place_do.scss'
import { Redirect } from "react-router-dom";
class Place_do extends Component{
    constructor(props) {
        super(props)
        this.add_to_cart=this.add_to_cart.bind(this)
        this.render=this.render.bind(this)
        this.place_order=this.place_order.bind(this)
        this.set_curr_cust=this.set_curr_cust.bind(this)
        this.remove_from_cart=this.remove_from_cart.bind(this)
        this.componentDidMount=this.componentDidMount.bind(this)
        this.state = {
            order_id:'',
            order_list:[],
            product_list:[],
            cust_list:[],
            curr_cust:'',
            curr_cust_id:null,
            temp_cart:{
                customer_id:'',
                products:[],
                total_price:0
            },
            cust_change:false,
            redirect: null,
            totalCost:0,
            cart_id:null,
            order_id:null,
            quantities:[],
            product_name:''
        }
        this.products_list=[]
        this.order=[]
    }

    componentDidMount()
    {
        // console.log(this.props.match.params)
        let {cart_id}=this.state
        cart_id=this.props.match.params?this.props.match.params:null
        // console.log(cart_id)
        if(Object.entries(cart_id).length!==0)
        {
            // console.log('not empty')
            // console.log(cart_id.id)
            fetch('http://178.128.90.226:8000/order/'+cart_id.id)
            .then(res=>{return res.json()})
            .then(resData=>{
                // console.log(resData)
                this.order=resData.order_items
                console.log(this.order)
                let {temp_cart,totalCost,curr_cust_id,quantities}=this.state
                temp_cart.customer_id=resData.customer.id
                curr_cust_id=resData.customer.id
                temp_cart.total_price=resData.total_price
                totalCost=resData.total_price
                temp_cart.products=resData.order_items.map((prod,index)=>{
                    quantities[index]=prod.quantity
                    return {quantity:prod.quantity,product_id:prod.product.id}
                })
                this.setState({
                    temp_cart,
                    order_id:cart_id.id,
                    totalCost,
                    curr_cust_id,
                    quantities
                })
                console.log(temp_cart)
            })
            .catch(err=>console.log(err))
        }
        // else{
            
        //     const {temp_cart}=this.state
        //     temp_cart.customer_id=''
        //     temp_cart.products=[]
        //     temp_cart.total_price=0
        //     this.setState({
        //         temp_cart,
        //         order_id:null,
        //         totalCost:0,
        //         curr_cust_id:null,
        //         quantities:[]
        //     })
        // }   
        fetch('http://178.128.90.226:8000/products')
        .then(res=>{return res.json()})
        .then(resData=>{
            console.log(resData)
            this.products_list=resData
            // this.setState({
            //     product_list:resData,
            // })
            this.get_cust_list()
        })
        .catch(err=>console.log(err))
       
    }

    get_cust_list()
    {
        fetch('http://178.128.90.226:8000/customers')
       .then(res=>{return res.json()})
       .then(resData=>{
        //    console.log(resData)
        let temp_cust_list=resData
           this.setState({
               cust_list:[
                   {
                       id:null,
                       customer_name:'Select Customer'
                   }
               ].concat(temp_cust_list)
           })
           
           
        //    console.log(this.state.cust_list)
       })
    }

    set_curr_cust(cust_id)
    {
        // console.log(cust_id)
        let {curr_cust_id,temp_cart}=this.state
        curr_cust_id=cust_id
        temp_cart.customer_id=curr_cust_id
        this.setState({
            curr_cust_id,
            temp_cart,
            cust_change:true
        })
        console.log(temp_cart)
        
    }

    add_to_cart(id,req_quan,cost)
    {   
        // console.log(typeof(req_quan)+" "+typeof(cost))
        // console.log((req_quan)+" "+(cost))
        // console.log((req_quan)*(cost))
        // console.log(id+" "+name+" "+scale+" "+avai_quan+" "+req_quan+" "+is_check+" ")
        // console.log(this)
        let {temp_cart,totalCost}=this.state
        let Is_same_prod=false
        // console.log(this.state.curr_cust_id)
        // let product={id:id,product_name:name,scale:scale,quantity:avai_quan,req_quan:req_quan}
        temp_cart.customer_id=this.state.curr_cust_id
        totalCost=temp_cart.total_price
        let product={product_id:id,quantity:parseInt(req_quan),order_item_cost:parseInt((req_quan*cost))}
        // console.log(product.order_item_cost)
        temp_cart.products.forEach(prod=>{
            if(prod.product_id==id)
            {
                product.quantity=parseInt(product.quantity)+parseInt(prod.quantity)
                totalCost+=product.order_item_cost
                product.order_item_cost+=prod.order_item_cost
                
                Is_same_prod=true
                // console.log(Is_same_prod)
            }
            else{
                product=product
            }
        })
        // console.log(product)
        if(Is_same_prod)
        {
            // console.log("insidefnpwep")
            temp_cart.products=temp_cart.products.map(prod=>{
                if(prod.product_id==id)
                {
                    return {...product}
                    // console.log(prod)
                }
                else{
                    return {...prod}
                }
            })
            product={}
        }
        else if(!Is_same_prod)
        {
            // console.log(Is_same_prod)
            // console.log(product)
            totalCost+=product.order_item_cost  
            // console.log(totalCost) 
            temp_cart.products.push(product)
            product={}
            // temp_cart.products.forEach(prod=>{temp_cart.total_price+=prod.order_item_cost})
        }
        temp_cart.total_price=totalCost
        this.setState({
            temp_cart,
            cust_change:false,
         })
        console.log(temp_cart)
        // console.log(totalCost)
    }

    remove_from_cart(id,req_quan,cost)
    {   
        console.log(typeof(req_quan))
        let {temp_cart,totalCost}=this.state
        const curr_product=[...this.state.temp_cart.products]
        temp_cart.products.forEach(prod=>
            {
                if(prod.product_id==id)
                {
                    temp_cart.total_price-=prod.order_item_cost
                    totalCost=temp_cart.total_price
                }
            }
        )
        temp_cart.products=temp_cart.products.filter(prod=>prod.product_id!==id)
        
        this.setState({
            temp_cart,
            totalCost
        })
        console.log(temp_cart)
    }

    place_order(event)
    {   if (this.state.temp_cart.customer_id && !this.state.order_id){
        fetch('http://178.128.90.226:8000/placeorder',{
            headers:{
                'Content-Type':"application/json"
            },
            method:"POST",
            body:JSON.stringify(this.state.temp_cart)
        })
        .then(res=>{return res.json()})
        .then(resd=>{
            console.log(this.state.temp_cart)
            console.log(resd)
            this.state.order_id = resd.id
            console.log(this.state.order_id)
            let {curr_cust_id,temp_cart}=this.state
            curr_cust_id=null
            temp_cart.customer_id=curr_cust_id
            temp_cart.products=[]
            temp_cart.total_price=0
            this.setState({
                curr_cust_id,
                temp_cart,
                totalCost:0
            })
            this.setState({ redirect: "/order/"+ resd.id});
        })
        .catch(err=>console.log(err))
    }
    else if (this.state.temp_cart.customer_id && this.state.order_id){
        fetch('http://178.128.90.226:8000/order/'+this.state.order_id,{
            headers:{
                'Content-Type':"application/json"
            },
            method:"PUT",
            body:JSON.stringify(this.state.temp_cart)
        })
        .then(res=>{return res.json()})
        .then(resd=>{
            console.log("PUT")
            console.log(this.state.temp_cart)
            console.log(resd)
            this.state.order_id = resd.id
            console.log(this.state.order_id)
            let {curr_cust_id,temp_cart}=this.state
            curr_cust_id=null
            temp_cart.customer_id=curr_cust_id
            temp_cart.products=[]
            temp_cart.total_price=0
            this.setState({
                curr_cust_id,
                temp_cart,
                totalCost:0
            })
            this.setState({ redirect: "/order/"+ resd.id});
        })
        .catch(err=>console.log(err))
    }

    

else    {
alert('select customer');
}
}


    
    render()
    {   
        if (this.state.redirect) {

            return <Redirect to={this.state.redirect} />
          
        }
        let cart
        if(this.order.length==0)
        {
            cart=<div></div>
        }
        else{
            cart=this.order.map(order_item=>{
                return (
            
                    <Col sm="3">
                        <Card_Cart 
                                    id={order_item.product.id}
                                    customer_name={this.state.curr_cust}
                                    prod_name={order_item.product.product_name}
                                    scale={order_item.product.scale}
                                    avai_quantity={order_item.product.quantity}
                                    cart_quan={order_item.quantity}
                                    add_to_cart={this.add_to_cart}
                                    has_cust_change={this.state.cust_change}
                                    cost={order_item.product.cost}
                                    image={order_item.product.image}
                                    delete_from_cart={this.remove_from_cart}
                        />
                    </Col>
                
                )
            })
        }
        // let cart_prod_quan
        let products_card=this.products_list.map((prod,i)=>{
            return (
                <Col sm="3">
                <Card_Products 
                            id={prod.id}
                            customer_name={this.state.curr_cust}
                            prod_name={prod.product_name}
                            scale={prod.scale}
                            avai_quantity={prod.quantity}
                            // cart_quan={cart_prod_quan}
                            // cart_quan={this.state.temp_cart.products[i]['product_id']==prod.id? this.state.temp_cart.products[i].quantity : null }
                            // cart_quan={this.state.temp_cart.products.map(produ=>{if(produ.product_id==prod.id){return produ.quantity}else{return null}})}
                            // cart_quan={ this.state.temp_cart.products.reduce((accu,curr_prod)=>{return curr_prod.product_id == prod.id ? curr_prod.quantity: null},0)}
                            // cart_quan={
                            //     this.state.temp_cart.products.reduce((init,cart_prod)=>{
                            //         return cart_prod.product_id==prod.id ? cart_prod.quantity : init
                            //     },null)
                            // }
                            // cart_quan={this.state.quantities[i]>0?this.state.quantities[i]:0}
                            add_to_cart={this.add_to_cart}
                            has_cust_change={this.state.cust_change}
                            cost={prod.cost}
                            image={prod.image}
                            delete_from_cart={this.remove_from_cart}
                />
                </Col>
            )
        })
        const {cust_list}=this.state
        return (
            <div style={{overflow:"hidden"}}>
                <Row>
                    <Col md="6">
                        <Form>
                        <Form.Group>
                            <Form.Label style={{marginLeft:"20px" ,fontSize:"24px"}}>Customer</Form.Label>
                            <Form.Control as="select" onChange={e=>{this.set_curr_cust(e.target.value)}} style={{maxWidth:"70%",marginLeft:"20px",fontSize:"18px",height:"40px"}} 
                                value={this.state.curr_cust_id?this.state.curr_cust_id:null}
                            >
                                {
                                    this.state.cust_list.map(cust=>{
                                    return <option value={cust.id}>{cust.customer_name}</option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                        </Form>
                    </Col>
                    <Col md="3">
                        <p style={{marginLeft:"20px",marginTop:"30px",fontSize:"20px"}}>
                            Total Cost = <span className="glyphicon glyphicon-usd"></span>{this.state.temp_cart.total_price}
                        </p>
                    </Col>
                    <Col md="3">
                    <Button 
                        variant="outline-primary" 
                        style={{marginTop:"20px",marginLeft:"20px",fontSize:"20px"}} 
                        onClick={e=>{this.place_order(e)}}
                        // className="btn third">
                        className="place_btn"
                    >
                        {/* <a href='/order/1' style={{color:""}}> */}
                            Place Order
                        {/* </a> */}
                    </Button>
                    
                    </Col>
                </Row>
                <Form.Label hidden={!this.order.length>0} style={{marginLeft:"20px",marginTop:"20px",fontSize:"24px"}}>Order Items</Form.Label>

                <Container className="card_container" fluid style={{width:"98%",overflowY:"auto"}}>
                <Row height="auto">
                    {cart}
                </Row>
                </Container>




                <Form.Label style={{marginLeft:"20px",marginTop:"20px",fontSize:"24px"}}>Product List</Form.Label>
                <Container className="card_container" fluid style={{width:"98%",overflowY:"auto"}}>
                    <Row style={{height:"500px"}}>
                        {/* <Tabs defaultActiveKey="products">
                                <Tab eventkey="products" title="All Products" style={{width:"100%"}}>
                                    {products_card}
                                </Tab>
                                {/* <Tab eventkey="cart" title="Products in Cart">

                                </Tab> */}
                        {/* </Tabs> */} 
                        {products_card}
                    
                    </Row>
                </Container>
            
          </div>
        )
    }
}


export default Place_do









// {
//     this.state.product_list.map(prod=>{
//        return <Place_order_card
//            id={prod.id}
//            customer_name={this.state.curr_cust}
//            prod_name={prod.product_name}
//            scale={prod.scale}
//            quantity={prod.quantity}
//            on_check={this.check_add}
//            has_cust_change={this.state.cust_change}
//         />
//     })
// }

     {/* <Table striped bordered hover size="sm" style={{maxWidth:"60%",textAlign:"center"}}>
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Scale</th>
                        <th>Available Quantity</th>
                        <th>Quantity</th>
                        <th>Select</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.product_list.map(prod=>{
                            return <Place_order
                                id={prod.id}
                                customer_name={this.state.curr_cust}
                                prod_name={prod.product_name}
                                scale={prod.scale}
                                quantity={prod.quantity}
                                on_check={this.check_add}
                                has_cust_change={this.state.cust_change}
                            />
                        })
                    }
                    </tbody>
                </Table>    */}














