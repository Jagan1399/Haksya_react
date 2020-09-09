import React,{Component} from 'react'
import * as ReactBootStrap from "react-bootstrap"
import {Product} from '../templates/post'
import Table from 'react-bootstrap/Table'

class Add_Items extends Component {
    constructor(props) {
        super(props)
        this.inputChangeHandler=this.inputChangeHandler.bind(this)
        this.state = {
             product:{},
             isLoading:false,
             product_list:[],
             prod_name:'',
             scale:'',
             quantity:0,
             editable:false,
             edit_prod:'',
             cost:0,
             file:''
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

   edit_product=async (id,name,scale,quantity,cost)=>{
       const product={id:id,product_name:name,scale:scale,quantity:quantity,cost:parseInt(cost)}
    //    console.log(scale)
    //    console.log(id)
    console.log(product)
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
       console.log(this.state.prod_name)
    event.preventDefault()
    let fd=new FormData()
    fd.append('product_name',this.state.prod_name);
    fd.append('scale',this.state.scale);
    fd.append('quantity',this.state.quantity);
    fd.append('cost',this.state.cost);
    fd.append('image',this.state.file,this.state.file.name);
    const product={product_name:this.state.prod_name,scale:this.state.scale,quantity:this.state.quantity,cost:this.state.cost,image:this.state.file}
    console.log(fd.get("product_name"))
     //    console.log(body)
    await fetch('http://178.128.90.226:8000/products',{
        method:'POST',
        body:fd
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
            quantity:0,
            cost:0,
            file:''
        })
        fd.delete()
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

    filehandler=(event)=>{
        console.log(event.target.files[0])
        this.setState({
            file:event.target.files[0]
        })
        console.log(this.state.file)
    }
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
        else if(event.target.name==='cost')
        {
            this.setState({
                cost:event.target.value
            })
        }
        
       }

    
    
    render() {
        const scale_options=['PKT','CTN','BAG','BOX']
        
    return (
        <div>
            <div class="container">
                <h1 style={{textAlign:"center"}}>Add Products</h1>
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
                        <select onChange={this.inputChangeHandler} value={this.state.scale} name="scale" style={{width:"20%",borderRadius:"5px"}}>
                            {
                                scale_options.map(option_val=>(
                                    <option>
                                        {option_val}
                                    </option>
                                ))
                            }
                        </select>
                    </ReactBootStrap.Form.Group>
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
                    <ReactBootStrap.Form.Group controlId="cost">
                        <ReactBootStrap.Form.Label>Cost</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control 
                            type="number" 
                            placeholder="Enter Cost of Product" 
                            value={this.state.cost} 
                            onChange={this.inputChangeHandler } 
                            name="cost" 
                        />
                    </ReactBootStrap.Form.Group>
                    <ReactBootStrap.Form.Group controlId="file">
                        <ReactBootStrap.Form.Label>Product Image</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control 
                                type="file" 
                                placeholder="Select Product Image" 
                                onChange={this.filehandler} 
                                name="image_file"
                                // value={this.state.file}
                                style={{marginBottom:"5px"}} 
                        />
                    </ReactBootStrap.Form.Group>
                    <ReactBootStrap.Button variant="primary" type="submit" >
                        Submit
                    </ReactBootStrap.Button>
                </ReactBootStrap.Form>
            </div>
            <Table striped borderless hover size="sm" style={{maxWidth:"80%",textAlign:"center",marginLeft:"10%",marginRight:"10%"}}>
                    <thead>
                    <tr>
                        <th style={{textAlign:"center"}}>Product Name</th>
                        <th style={{textAlign:"center"}}>Scale</th>
                        <th style={{textAlign:"center"}}>Cost</th>
                        <th style={{textAlign:"center"}}>Quantity</th>
                        <th style={{textAlign:"center"}}>Delete</th>
                        <th style={{textAlign:"center"}}>Edit</th>
                        <th style={{textAlign:"center"}} hidden={!this.state.editable}>Save</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.product_list.map(prod=>{
                        return <Product 
                                    product_name={prod.product_name} 
                                    image={prod.image}
                                    scale={prod.scale} 
                                    quantity={prod.quantity} 
                                    cost={prod.cost}
                                    on_delete={this.delete_handler} 
                                    on_edit={this.edit_Handler} 
                                    id={prod.id}  
                                    edit_prod={this.state.edit_prod}
                                    can_edit={this.state.edit_prod==prod.id}
                                    edit_product={this.edit_product}
                                    _editable={this.state.editable}
                                    
                        />
                    })}
                    </tbody>
                </Table>
            
        </div>
    )
    }
}

export default Add_Items



// <div class="table">
// <table>
//     <tr>
//         <th>Product Name</th>
//         <th>Scale</th>
//         <th>Cost</th>
//         <th>Quantity</th>
//     </tr>

//         {this.state.product_list.map(prod=>{
//             return <Product 
//                         product_name={prod.product_name} 
//                         image={prod.image}
//                         scale={prod.scale} 
//                         quantity={prod.quantity} 
//                         cost={prod.cost}
//                         on_delete={this.delete_handler} 
//                         on_edit={this.edit_Handler} 
//                         id={prod.id}  
//                         edit_prod={this.state.edit_prod}
//                         can_edit={this.state.edit_prod==prod.id}
//                         edit_product={this.edit_product}
//                         _editable={this.state.editable}
                        
//              />
//         })}

// </table>
// </div>