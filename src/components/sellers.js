import React,{Component} from 'react'
import './add_cust.css'
import * as ReactBootStrap from "react-bootstrap"

import  {Seller_temp} from '../templates/post'

class Seller extends Component{
   constructor(props) {
       super(props)
   
       this.state = {
            name:'',
            address:'',
            seller_list:[],
            is_Loaded:false,
            can_edit:false,
            seller_id:''

       }
   }

   delete_handler=(id)=>{
    fetch(`http://178.128.90.226:8000/seller/${id}`,{
        method:'DELETE'
    })
    .then(resd=>{
        const upd_seller_list=this.state.seller_list.filter(seller=>seller.id!==id)
        this.setState({
            seller_list:upd_seller_list
        })
    })
        .catch(err=>console.log(err))
    }

    get_toEdit_seller=(id)=>{
        console.log(id)
        this.setState({
            can_edit:true,
            seller_id:id
        })
    }

    edit_Handler=async (id,name,address)=>{
        const seller={seller_name:name,address:address}
        console.log(seller)
        await fetch(`http://178.128.90.226:8000/seller/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify(seller)
        })
        .then(res=>{return res.json()})
        .then(resd=>{
            console.log(resd)
            this.setState({
                can_edit:false,
                seller_id:''
            })
        })
    }


   componentDidMount()
   {
       fetch('http://178.128.90.226:8000/sellers')
       .then(res=>{return res.json()})
       .then(resData=>{
        //    console.log(resData)
           this.setState({
               seller_list:resData,
               is_Loaded:true
           })
       })
   }
   inputChangeHandler=(event)=>{
    //    console.log(event.target.name)
    if(event.target.name==='seller_name')
    {
        this.setState({
           name:event.target.value
       })
    }
    else if(event.target.name==='address')
    {
        this.setState({
            address:event.target.value
        })
    }
    //    console.log(this.state.name)
   }

   submitHandler=async (event)=>{
       event.preventDefault()
       const body={seller_name:this.state.name,address:this.state.address}
    //    console.log(body)
       await fetch('http://178.128.90.226:8000/sellers',{
           method:'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body:JSON.stringify(body)
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
           this.state.seller_list.push(resd)
        //    console.log(this.state.cust_list)
           this.setState(this.state.seller_list)
           this.setState({
               name:'',
               address:''
           })
        // console.log(resd)
          
                // console.log("Success")
                // // this.setState({
                // //     cust_list:this.state.cust_list.push(resd.data)
                // // })
                
           
    
        
       })
       .catch(err=>console.log(err))
   }
 
    render() {
        
    return (
        <div>
            <div class="container">
                <h1>Add Seller</h1>
                <ReactBootStrap.Form onSubmit={this.submitHandler}>
                    <ReactBootStrap.Form.Group controlId="seller_name">
                        <ReactBootStrap.Form.Label>Seller Name</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control 
                            type="text" 
                            placeholder="Seller Name" 
                            value={this.state.name} 
                            onChange={this.inputChangeHandler } 
                            name="seller_name" 
                        />
                        <ReactBootStrap.Form.Text className="text-muted">
                    
                        </ReactBootStrap.Form.Text>
                    </ReactBootStrap.Form.Group>

                    <ReactBootStrap.Form.Group controlId="seller_address">
                        <ReactBootStrap.Form.Label>Address</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control 
                            type="text" 
                            placeholder="Address" 
                            value={this.state.address} 
                            onChange={this.inputChangeHandler } 
                            name="address" 
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
                        <th>Seller Name</th>
                        <th>Address</th>
                    </tr>
                
                        {this.state.seller_list.map(seller=>{
                            // console.log(cust)
                            return <Seller_temp
                                id={seller.id}
                                address={seller.address} 
                                seller_name={seller.seller_name} 
                                delete_seller={this.delete_handler}
                                can_Edit={this.state.seller_id==seller.id}
                                edit_sell_id={this.get_toEdit_seller}
                                edit_handler={this.edit_Handler}
                            />
                        })}
                
                </table>
            </div> 
        </div>
    )
    }
}

export default Seller


