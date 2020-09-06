import React,{Component} from 'react'
import Table from 'react-bootstrap/Table'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import {Place_order,Card_temp} from '../templates/post'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {Col,Row,Container} from 'reactstrap'
import './place_do.css'

class Place_do extends Component{
    constructor(props) {
        super(props)
        this.add_to_cart=this.add_to_cart.bind(this)
        this.place_order=this.place_order.bind(this)
        this.set_curr_cust=this.set_curr_cust.bind(this)
        this.remove_from_cart=this.remove_from_cart.bind(this)
        this.state = {
            order_list:[],
            product_list:[],
            cust_list:[],
            curr_cust:'',
            curr_cust_id:0,
            temp_cart:{
                customer_id:'',
                products:[],
                total_price:0
            },
            cust_change:false,
            totalCost:0
        }
    }

    componentDidMount()
    {
        fetch('http://178.128.90.226:8000/products')
       .then(res=>{return res.json()})
       .then(resData=>{
           console.log(resData)
           this.setState({
               product_list:resData,
           })
           this.get_cust_list()
       })
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
        // console.log(id+" "+name+" "+scale+" "+avai_quan+" "+req_quan+" "+is_check+" ")
        // console.log(this)
        let {temp_cart,totalCost}=this.state
        // console.log(this.state.curr_cust_id)
            // const product={id:id,product_name:name,scale:scale,quantity:avai_quan,req_quan:req_quan}
            const product={product_id:id,quantity:req_quan}
            temp_cart.customer_id=this.state.curr_cust_id
            temp_cart.products.push(product)
            totalCost=totalCost+(cost*req_quan)
            temp_cart.total_price=totalCost
           this.setState({
              temp_cart,
              cust_change:false,
              totalCost
           })
      
        console.log(temp_cart)
        // console.log(totalCost)
    }

    remove_from_cart(id,req_quan,cost)
    {   
        let {temp_cart,totalCost}=this.state
        temp_cart.products=temp_cart.products.filter(prod=>prod.product_id!==id)
        totalCost=totalCost-(req_quan*cost)
        temp_cart.total_price=totalCost
        this.setState({
            temp_cart,
            totalCost
        })
        console.log(temp_cart)
    }

    place_order(event)
    {
        fetch('http://178.128.90.226:8000/placeorder',{
            headers:{
                'Content-Type':"application/json"
            },
            method:"POST",
            body:JSON.stringify(this.state.temp_cart)
        })
        .then(res=>{res.json()})
        .then(resd=>{
            console.log(resd.success)
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
            

        })
        .catch(err=>console.log(err))
    }


    
    render()
    {
        let prod_card=this.state.product_list.map(prod=>{
            return (
                <Col sm="3">
                <Card_temp 
                            id={prod.id}
                            customer_name={this.state.curr_cust}
                            prod_name={prod.product_name}
                            scale={prod.scale}
                            quantity={prod.quantity}
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
                            <Form.Control as="select" onChange={e=>{this.set_curr_cust(e.target.value)}} style={{maxWidth:"70%",marginLeft:"20px",fontSize:"18px",height:"40px"}} >
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
                            Total Cost = <span className="glyphicon glyphicon-usd"></span>{this.state.totalCost}
                        </p>
                    </Col>
                    <Col md="3">
                    <Button 
                        variant="outline-primary" 
                        style={{marginTop:"20px",marginLeft:"20px",fontSize:"20px"}} 
                        onClick={e=>{this.place_order(e)}}>
                        <a href='/invoice/1' style={{color:""}}>
                            Place Order
                        </a>
                    </Button>
                    </Col>
                </Row>
                
                <Form.Label style={{marginLeft:"20px",marginTop:"20px",fontSize:"24px"}}>Product List</Form.Label>
                <Container fluid style={{width:"100%",overflowY:"auto"}}>
                    <Row style={{height:"500px"}}>
                    {prod_card}
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














