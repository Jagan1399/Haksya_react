import React,{Component} from 'react'
import * as ReactBootStrap from "react-bootstrap"
import {Product} from '../templates/post'

class Add_Items extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product:{},
             isLoading:false,
             product_list:[],
             prod_name:'',
             scale:'',
             quantity:0,
             editable:false,
             edit_prod:''
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
               is_Loading:true
           })
       })
   }

   edit_product=async (id,name,scale,quantity)=>{
       const product={product_name:name,scale:scale,quantity:quantity}
       console.log(scale)
       console.log(id)
       await fetch(`http://178.128.90.226:8000/product/${id}`,{
           method:"PUT",
           headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(product)
       })
       .then(res=>{return res.json()})
       .then(resd=>{
           console.log(resd)
           this.setState({
               edit_prod:'',
               editable:false
           })
           this.componentDidMount()
       })

   }

   edit_Handler=(id)=>{
       const to_edit=id
       console.log(to_edit)
        this.setState({
            editable:true,
            edit_prod:to_edit
        })
        
   }

   delete_handler=(id)=>{
        fetch(`http://178.128.90.226:8000/product/${id}`,{
            method:'DELETE'
        })
        .then(resd=>{
            const upd_prod_list=this.state.product_list.filter(prod=>prod.id!==id)
            this.setState({
                product_list:upd_prod_list
            })
        })
        .catch(err=>console.log(err))
   }

   submitHandler=async (event)=>{
    event.preventDefault()
    const product={product_name:this.state.prod_name,scale:this.state.scale,quantity:this.state.quantity}
 //    console.log(body)
    await fetch('http://178.128.90.226:8000/products',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(product)
    })
    .then(res=>{
        return res.json()
    })
    .then(resd=>{
        console.log(resd)
        if(!resd)
        {
            throw new Error("No response data for post customer")
        }
        this.state.product_list.push(resd)
        this.setState(this.state.product_list)
        this.setState({
            prod_name:'',
            scale:'',
            quantity:0
        })
        // this.state.cust_list.push(resd)
     //    console.log(this.state.cust_list)
        // this.setState(this.state.cust_list)
     // console.log(resd)
    })
    .catch(err=>console.log(err))
}

    // selectorHandler=(event)=>{
    //     console.log(`selector event ${event.target.value}`)
    // }

    inputChangeHandler=(event)=>{
        //    console.log(event.target.name)
        if(event.target.name==='product_name')
        {
            
           this.setState({
               prod_name:event.target.value
           })
        }
        else if(event.target.name==='scale')
        {
            this.setState({
                scale:event.target.value
            })
        }
        else if(event.target.name==='quantity')
        {
            this.setState({
                quantity:event.target.value
            })
        }
        //    console.log(this.state.name)
       }

    
    
    render() {
        const scale_options=['PKT','CTN','BAG','BOX']
        
    return (
        <div>
            <div class="container">
                <h1>Add Products</h1>
                <ReactBootStrap.Form onSubmit={this.submitHandler}>
                    <ReactBootStrap.Form.Group controlId="prod_name">
                        <ReactBootStrap.Form.Label>Product Name</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control 
                            type="text" 
                            placeholder="Enter Item Name" 
                            value={this.state.prod_name} 
                            onChange={this.inputChangeHandler} 
                            name="product_name" 
                        />
                        <ReactBootStrap.Form.Text className="text-muted">
                    
                        </ReactBootStrap.Form.Text>
                    </ReactBootStrap.Form.Group>

                    <ReactBootStrap.Form.Group controlId="scale">
                        <ReactBootStrap.Form.Label>Scale</ReactBootStrap.Form.Label>
                        <br></br>
                        <select onChange={this.inputChangeHandler} value={this.state.scale} name="scale">
                            {
                                scale_options.map(option_val=>(
                                    <option>
                                        {option_val}
                                    </option>
                                ))
                            }
                        </select>
                    </ReactBootStrap.Form.Group>
                     {/* <ReactBootStrap.Dropdown controlId="scale">
                        <ReactBootStrap.Dropdown.Toggle variant="secondary" name="scale" onChange={this.inputChangeHandler} value={this.state.scale}>Scale</ReactBootStrap.Dropdown.Toggle>
                        <ReactBootStrap.Dropdown.Menu >
                            {
                                scale_options.map(option_val=>(
                                    <ReactBootStrap.Dropdown.propTypes>
                                        {option_val}
                                    </ReactBootStrap.Dropdown.propTypes>
                                ))
                            }
                        </ReactBootStrap.Dropdown.Menu>
                    </ReactBootStrap.Dropdown> */}
                    <ReactBootStrap.Form.Group controlId="quantity">
                        <ReactBootStrap.Form.Label>Quantity</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control 
                            type="number" 
                            placeholder="Enter Quantity" 
                            value={this.state.quantity} 
                            onChange={this.inputChangeHandler } 
                            name="quantity" 
                        />
                    </ReactBootStrap.Form.Group>
                    <ReactBootStrap.Button variant="primary" type="submit" >
                        Submit
                    </ReactBootStrap.Button>
                </ReactBootStrap.Form>
            </div>
            <div class="table">
                <table>
                    <tr>
                        <th>Product Name</th>
                        <th>Scale</th>
                        <th>Quantity</th>
                    </tr>
                
                        {this.state.product_list.map(prod=>{
                            return <Product 
                                        product_name={prod.product_name} 
                                        scale={prod.scale} 
                                        quantity={prod.quantity} 
                                        on_delete={this.delete_handler} 
                                        on_edit={this.edit_Handler} 
                                        id={prod.id}  
                                        edit_prod={this.state.edit_prod}
                                        can_edit={this.state.edit_prod==prod.id}
                                        edit_product={this.edit_product}
                                        _editable={this.state.editable}
                                
                             />
                        })}
                
                </table>
            </div> 
        </div>
    )
    }
}

export default Add_Items