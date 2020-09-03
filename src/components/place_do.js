import React,{Component} from 'react'
import Table from 'react-bootstrap/Table'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import {Place_order} from '../templates/post'

class Place_do extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            order_list:[],
            product_list:[],
            cust_list:[],
            curr_cust:'',
            temp_cart:{
                customer:'',
                products:[]
            }
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
           this.setState({
               cust_list:resData
           })
           console.log(resData)
       })
    }

    check_add(id,name,scale,avai_quan,req_quan,is_check)
    {   
        // console.log(id+" "+name+" "+scale+" "+avai_quan+" "+req_quan+" "+is_check+" ")
        
        if(is_check)
        {
            const product={id:id,product_name:name,scale:scale,quantity:avai_quan,req_quan:req_quan}
           this.setState({
               temp_cart:{
                   customer:this.state.curr_cust,
                   products:this.state.temp_cart.products.push(product)
               }
           })
           console.log(this.state.temp_cart)
        }
    }

    
    render()
    {
        
        return (
            <div>
                <Form>
                    <Form.Group>
                        <Form.Label>Customer</Form.Label>
                        <Form.Control as="select" onChange={e=>{this.setState({curr_cust:e.target.value})}} >
                            {
                                this.state.cust_list.map(cust=>{
                                return <option>{cust.customer_name}</option>
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
                         />
                     })
                 }
                </tbody>
          </Table> 
          </div>
        )
    }
}


export default Place_do
