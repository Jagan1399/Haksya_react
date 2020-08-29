import React,{Component} from 'react'
import './add_cust.css'
import * as ReactBootStrap from "react-bootstrap"
import {Redirect} from 'react-router-dom'
import  {Name,Customer} from '../templates/post'

class Add_cust extends Component{
   constructor(props) {
       super(props)
   
       this.state = {
            name:'',
            address:'',
            cust_list:[],
            is_Loading:false
       }
   }

   shouldComponentUpdate(nextprops,nextstate)
   {
        if(this.state.name===nextprops.name)
        {
            return false
        }
        else{
            return true
        }
   }
   componentDidMount()
   {
       fetch('http://178.128.90.226:8000/customers')
       .then(res=>{return res.json()})
       .then(resData=>{
        //    console.log(resData)
           this.setState({
               cust_list:resData,
               is_Loading:true
           })
       })
   }
   inputChangeHandler=(event)=>{
    //    console.log(event.target.name)
    if(event.target.name==='cust_name')
    {
        let curr_name
        curr_name=event.target.value
        // console.log(curr_name)
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
       const body={customer_name:this.state.name,address:this.state.address}
    //    console.log(body)
       await fetch('http://178.128.90.226:8000/customers',{
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
           this.state.cust_list.push(resd)
        //    console.log(this.state.cust_list)
           this.setState(this.state.cust_list)
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
        const {is_Loading,cust_list}=this.state
        
    return (
        <div>
            <div class="container">
                <h1>Add Customer</h1>
                <ReactBootStrap.Form onSubmit={this.submitHandler}>
                    <ReactBootStrap.Form.Group controlId="customer_name">
                        <ReactBootStrap.Form.Label>Customer Name</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control 
                            type="text" 
                            placeholder="Customer Name" 
                            value={this.state.name} 
                            onChange={this.inputChangeHandler } 
                            name="cust_name" 
                        />
                        <ReactBootStrap.Form.Text className="text-muted">
                    
                        </ReactBootStrap.Form.Text>
                    </ReactBootStrap.Form.Group>

                    <ReactBootStrap.Form.Group controlId="customer_address">
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
                        <th>Customer Name</th>
                        <th>Address</th>
                    </tr>
                
                        {this.state.cust_list.map(cust=>{
                            console.log(cust)
                            return <Customer address={cust.address} customer_name={cust.customer_name} />
                        })}
                
                </table>
            </div> 
        </div>
    )
    }
}

export default Add_cust


{/* <div>
            {
                    cust_list.map(post=>{
                       return  <Post key={post.id}  name={post.name} email={post.email} />
                    })
            }
            </div> */}



/* <tr>
                        <td>
                                {
                                    cust_list.map(cust=>{
                                    return <Email email={cust.email} is_Loading={is_Loading} />
                                    })
                                }
                        </td>
                        <td>
                            {
                                cust_list.map(cust=>{
                                    return <Name name={cust.name} is_Loading={is_Loading} />
                                })
                            }
                        </td>
                    </tr> */