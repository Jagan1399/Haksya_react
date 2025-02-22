import React, { Component } from 'react'
import './invoice.css'
import Table from 'react-bootstrap/Table'
import {
    Link
  } from "react-router-dom";



export default class Invoice extends Component {
    constructor(props) {
        super(props)
        this.componentDidMount=this.componentDidMount.bind(this)
        this.state = {
            order:{
                customer:{
                    address:'',
                    customer_name:'',
                    id:null
                },
                order_items:[]
            },
            order_id:this.props.match.params
        }
    }

    
    componentDidMount()
    {
        // console.log(this.state.order_id)
        // console.log(this.props)
        let {order_id,order}=this.props.match.params 
        fetch('http://178.128.90.226:8000/order/'+order_id)
        .then(res=>{return res.json()})
        .then(resd=>{
            console.log(resd)
            order=resd
            this.setState({
                order,
                order_id
            })
            console.log(this.state.order)
        })
        .catch(err=>console.log(err))
    }

    print_handler()
    {
        console.log("wgeuowgeofu")
        window.print()
    }
    

    render() {
        const {order}=this.state
        // const customer_name=order.customer.customer_name
        return (
        
        <div>
        <div id="invoice">

            <div class="toolbar hidden-print">
                <div class="text-right">
                    <button className="btn btn-info" onClick={e=>{this.print_handler()}}>Print</button>
                </div>
                <div class="toolbar hidden-print">
                    {/* <a href={'/cart/'+this.state.order_id}>Edit DO</a> */}
                    <Link style={{textDecoration:"none"}} to={`/cart/${this.state.order_id}`}>Edit DO</Link>
                </div>
                <hr></hr>
            </div>
            

            <div id="printableArea" class="invoice overflow-auto print-container">
                <div style={{minWidth: "600px"}}>
                    <header>

                        <div class="row">
                            <div class="col">
                                <img src={process.env.PUBLIC_URL+'/img/LOGO.png'} style={{width:"150px"}}></img>
                            </div>
                            <div class="col company-details">
                                <h2 class="name">
                                    <div>
                                         HAKSYA GLOBAL SDN BHD ( 1036889-A)
                                    </div>
                                </h2>
                                <div>NO:65 JALAN SELAT SELATAN, 7KS05 TMN PERIND SOBENA JAYA, 42000 PELABUHAN KLANG, SELANOR DARUL EHSAN, MALAYSIA</div>
                                <div>TEL/FAX: 03-3162 6164 H/P: 012-252 5849 / 012-202 2849</div>
                                <div>WEBSITE: www.haksyaglobal.com.my</div>
                                <div>haksyaglobal@gmail.com</div>
                            </div>
                        </div>
                    </header>
                    <main>
                        <div class="row contacts">
                            <div class="col invoice-to">
                                <div class="text-gray-light">INVOICE TO:</div>
                                    <h2 className="to">{this.state.order.customer.customer_name}</h2>
                                    <div className="address">{ this.state.order.customer.address}</div>
                            </div>
                            <div class="col invoice-details">
                                    <h1 class="invoice-id">D.O NO: {this.state.order.id}</h1>
                                    <div class="date">Date of D.O: {this.state.order.date}</div>

                            </div>
                        </div>

                        <Table striped borderless size="sm" style={{maxWidth:"80%",textAlign:"center"}}>
                            <thead>
                                <tr>
                                    <th style={{textAlign:"center"}}>NO</th>
                                    <th style={{textAlign:"center"}}>ITEM NAME</th>
                                    <th style={{textAlign:"center"}}>QUANTITY</th>
                                    <th style={{textAlign:"center"}}>Cost</th>
                                </tr>
                            </thead>
                            <tbody style={{}}>
                                {
                                    this.state.order.order_items.map((prod,i)=>{
                                   return( <tr>
                                        <td>{prod.id}</td>
                                        <td>{prod.product.product_name}</td>
                                        <td>{prod.quantity} {prod.product.category}</td>
                                        <td>${prod.product.cost} * {prod.quantity}</td>
                                    </tr>)
                                    })
                                } 
                            </tbody>
                        </Table>
                        <p className="invoice-id" style={{float:"right",marginRight:"25%",fontWeight:"bold",fontSize:"24px"}}>Total Cost = <span style={{color:"#3989c6",fontSize:"24px"}}>${this.state.order.total_price}</span></p>

                    </main>
                    <table style={{width:"100%"}}>
                        <tr>
                            <td style={{textAlign: "left"}}>
                                <div className="notice">FOR HAKSYA GLOBAL SDN.HD</div>
                                <br></br>
                                <div> ____________________________
                                </div>
                                <div> Invoice was created on a computer and is valid without the signature and seal.</div>
                                <br></br>
                            </td>
                            <td style={{textAlign: "right"}}>
                                <div class="notice">RECEIVED GOODS IN GOOD CONDITION</div>
                                <br></br>
                                <div> ____________________________
                                </div>
                                <div>COMPANY CHOP & SIGNATURE</div>
                                <br></br>
                            </td>
                        </tr>

                    </table>

                </div>
            </div>

        </div>

        </div>

    )
    }
}
