






                    // import React,{Component,useState,useEffect} from 'react'
                    // import './add_cust.css'
                    // import * as ReactBootStrap from "react-bootstrap"
                    // import {Redirect} from 'react-router-dom'
                    // import  {Name,Email} from '../templates/post'
                    
                    // const Add_cust =props=>{
                    // //    constructor(props) {
                    // //        super(props)
                       
                    // //        this.state = {
                    // //             name:'',
                    // //             address:'',
                    // //             cust_list:[],
                    // //             is_Loading:false
                    // //        }
                    // //    }
                    
                    //     const [name,setName]=useState('')
                    //     const [address,setAddress]=useState('')
                    //     const [is_Loading,setIsLoading]=useState(false)
                    //     const [cust_list,setCustList]=useState([])
                       
                    //    useEffect(()=>{
                    //     // setIsLoading(true)
                    //     fetch('https://jsonplaceholder.typicode.com/users')
                    //        .then(res=>{return res.json()})
                    //        .then((resData)=>{
                    //            setCustList(resData)
                    //        })
                    //        .catch(err=>console.log(err))
                    //    },[])
                         
                       
                    //    const inputChangeHandler=(event)=>{
                    //     //    console.log(event.target.name)
                    //     if(event.target.name==='cust_name')
                    //     {
                            
                    //         setName(event.target.value)
                           
                    //     }
                    //     else if(event.target.name==='address')
                    //     {
                    //        setAddress(event.target.value)
                    //     }
                    //     //    console.log(this.state.name)
                    //    }
                    
                    //    const submitHandler=async (event)=>{
                    //        event.preventDefault()
                    //        const body={name:name,address:address}
                    //     //    console.log(body)
                    //        await fetch('http://localhost:8000/cust_info',{
                    //            method:'POST',
                    //            headers:{
                    //                'Content-Type':'application/json'
                    //            },
                    //            body:JSON.stringify(body)
                    //        })
                    //        .then(res=>{
                    //            return res.json()
                    //        })
                    //        .then(resd=>{
                    //         if(resd.msg.toString()=='success')
                    //         {
                    //            console.log(resd)
                    //            cust_list.push(resd.data)
                    //            setCustList(cust_list)
                              
                    //                 // console.log("Success")
                    //                 // // this.setState({
                    //                 // //     cust_list:this.state.cust_list.push(resd.data)
                    //                 // // })
                                    
                    //                 console.log(cust_list)
                    //         }
                    //         else{
                    //             console.log("Failed")
                    //         }
                    //        })
                    //    }
                     
                    //     // let ui=<p>Loading Data...</p>
                    //     // if(is_Loading)
                    //     // {
                            
                    //      const ui=(
                    //         <div>
                    //             <div class="container">
                    //                 <h1>Add Customer</h1>
                    //                 <ReactBootStrap.Form onSubmit={submitHandler}>
                    //                     <ReactBootStrap.Form.Group controlId="customer_name">
                    //                         <ReactBootStrap.Form.Label>Customer Name</ReactBootStrap.Form.Label>
                    //                         <ReactBootStrap.Form.Control 
                    //                             type="text" 
                    //                             placeholder="Customer Name" 
                    //                             value={name} 
                    //                             onChange={inputChangeHandler } 
                    //                             name="cust_name" 
                    //                         />
                    //                         <ReactBootStrap.Form.Text className="text-muted">
                                        
                    //                         </ReactBootStrap.Form.Text>
                    //                     </ReactBootStrap.Form.Group>
                    
                    //                     <ReactBootStrap.Form.Group controlId="customer_address">
                    //                         <ReactBootStrap.Form.Label>Address</ReactBootStrap.Form.Label>
                    //                         <ReactBootStrap.Form.Control 
                    //                             type="text" 
                    //                             placeholder="Address" 
                    //                             value={address} 
                    //                             onChange={inputChangeHandler } 
                    //                             name="address" 
                    //                         />
                    //                     </ReactBootStrap.Form.Group>
                    //                     <ReactBootStrap.Button variant="primary" type="submit" >
                    //                         Submit
                    //                     </ReactBootStrap.Button>
                    //                 </ReactBootStrap.Form>
                    //             </div>
                    //             <div class="table">
                    //                 <table>
                    //                     <tr>
                    //                         <th>Email</th>
                    //                         <th>Name</th>
                    //                     </tr>
                                    
                    //                         {cust_list.map(cust=>{
                    //                             return <Email email={cust.email} name={cust.name} />
                    //                         })}
                                    
                    //                 </table>
                    //             </div>    
                        
                    //         </div>
                    //     )
                        
                    //     return ui
                    // }
                    
                    
                    // export default Add_cust
                    
                    
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