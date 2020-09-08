import React, { Component } from 'react'


export default class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.email=''
        this.password=''
    }
    

    inputHandler(event)
    {
        if(event.target.name=='email')
        {
            this.email=event.target.value   
        }
        else if(event.target.name=='password')
        {
            this.password=event.target.value
        }
    }

    submitHandler=(event)=>{
    {
        event.preventDefault()
        console.log(this.email)
        console.log(this.password)
    }
    }
    render() {
        return (
        <div style={{width:"50%",marginLeft:"30%",marginTop:"60px"}}>
            <form onSubmit={this.submitHandler}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={e=>{this.inputHandler(e)}}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={e=>{this.inputHandler(e)}}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block" style={{width:"30%",marginLeft:"250px"}}>Submit</button>
                {/* <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p> */}
            </form>
        </div>
        )
    }
}
