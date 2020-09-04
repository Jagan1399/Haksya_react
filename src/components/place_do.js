import React,{Component} from 'react'
import Table from 'react-bootstrap/Table'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import {Place_order} from '../templates/post'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class Place_do extends Component{
    constructor(props) {
        super(props)
        this.check_add=this.check_add.bind(this)
        this.place_order=this.place_order.bind(this)
        this.set_curr_cust=this.set_curr_cust.bind(this)
        this.state = {
            order_list:[],
            product_list:[],
            cust_list:[],
            curr_cust:'',
            curr_cust_id:0,
            temp_cart:{
                customer_id:'',
                products:[]
            },
            cust_change:false
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

    check_add(id,name,scale,avai_quan,req_quan,is_check)
    {   
        // console.log(id+" "+name+" "+scale+" "+avai_quan+" "+req_quan+" "+is_check+" ")
        // console.log(this)
        const {temp_cart}=this.state
        console.log(this.state.curr_cust_id)
        if(is_check)
        {
            // const product={id:id,product_name:name,scale:scale,quantity:avai_quan,req_quan:req_quan}
            const product={id:id,quantity:req_quan}
            temp_cart.customer_id=this.state.curr_cust_id
            temp_cart.products.push(product)
           this.setState({
              temp_cart,
              cust_change:false
           })
        }
        else if(!is_check)
        {
            temp_cart.products=temp_cart.products.filter(prod=>prod.id!==id)
            this.setState({
                temp_cart,
                cust_change:false
            })
        }
        console.log(temp_cart)
    }

    place_order(event)
    {
        console.log(event)
        fetch('http://178.128.90.226:8000/placeorder',{
            headers:{
                'Content-Type':"application/json"
            },
            method:"POST",
            body:JSON.stringify(this.state.temp_cart)
        })
        .then(res=>{res.json()})
        .then(resd=>{
            console.log(resd)
            let {curr_cust_id,temp_cart}=this.state
            curr_cust_id=null
            temp_cart.customer_id=curr_cust_id
            temp_cart.products=[]
            this.setState({
                curr_cust_id,
                temp_cart
            })
            console.log(temp_cart)

        })
        .catch(err=>console.log(err))
    }


    
    render()
    {
        const {cust_list}=this.state
        return (
            <div>
                <Form>
                    <Form.Group>
                        <Form.Label style={{marginLeft:"20%",marginTop:"8%"}}>Customer</Form.Label>
                        <Form.Control as="select" onChange={e=>{this.set_curr_cust(e.target.value)}} style={{maxWidth:"30%",marginLeft:"20%"}} >
                            {
                                this.state.cust_list.map(cust=>{
                                return <option value={cust.id}>{cust.customer_name}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Table striped bordered hover size="sm" style={{maxWidth:"60%",textAlign:"center"}}>
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
                </Table>   
               
          <Button 
            variant="outline-primary" 
            style={{marginLeft:"45%"}} 
            onClick={e=>{this.place_order(e)}}
          >Submit</Button>
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














