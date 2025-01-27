import React,{Component} from 'react';
import * as ReactBootStrap from "react-bootstrap"
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Home from './components/home'
  import AddCust from './components/add_cust'
  import AddItems from './components/add_items'
  import Order from './components/order_history'
  import Seller from './components/sellers'
  import PlaceDO from './components/place_do'
  import Invoice from './components/invoice'
  import Login from './components/login'

class App extends Component {
    constructor(props) {
        super(props)
        this.onLeave=this.onLeave.bind(this)
        this.onhover=this.onhover.bind(this)
        this.state = {
             hover:false
        }
    }
    
    onhover()
    {
        this.setState({
            hover:!this.state.hover
        })
    }
    onLeave()
    {
        this.setState({
            hover:!this.state.hover
        })
    }
    render() {
        var linkStyle
        if(this.state.hover)
        {
            linkStyle={color:'#86cbdd',textDecoration:'none'}
        }
        else{
            linkStyle={color:'white',textDecoration:'none'}
        }
  return (
    <Router>
        <div className="mynav">
            <ReactBootStrap.Navbar collapseOnSelect expand="sm" bg="dark">
            <ReactBootStrap.Navbar.Brand><Link onMouseEnter={this.onhover} onMouseLeave={this.onLeave} to="/"  style={{ color: '#FFF',textDecoration:'none',fontWeight:"bold" },linkStyle}>Haksya Cart</Link></ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto">
                <ReactBootStrap.Nav.Link><Link  to="/add_items" onMouseOver={e=>{e.target.style.color='#86cbdd'}} onMouseOut={e=>{e.target.style.color='white'}} style={{ color: '#FFF',textDecoration:'none',marginLeft:"20px" }}>Products</Link></ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link><Link  to="/add_cust" style={{ color: '#FFF',textDecoration:'none',marginLeft:"20px" }} onMouseOver={e=>{e.target.style.color='#86cbdd'}} onMouseOut={e=>{e.target.style.color='white'}}>Customers</Link></ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link><Link  to="/add_sellers" onMouseOver={e=>{e.target.style.color='#86cbdd'}} onMouseOut={e=>{e.target.style.color='white'}} style={{ color: '#FFF',textDecoration:'none',marginLeft:"20px" }}>Sellers</Link></ReactBootStrap.Nav.Link>
                {/* <ReactBootStrap.Nav.Link><Link  to="/place_do" style={{ color: '#FFF',textDecoration:'none' }} onMouseOver={e=>{e.target.style.color='#86cbdd'}} onMouseOut={e=>{e.target.style.color='white'}}>Place DO</Link></ReactBootStrap.Nav.Link> */}
                <ReactBootStrap.Nav.Link><Link  to="/order_history" style={{ color: '#FFF',textDecoration:'none',marginLeft:"20px" }} onMouseOver={e=>{e.target.style.color='#86cbdd'}} onMouseOut={e=>{e.target.style.color='white'}}>Order History</Link></ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link><Link  to="/login" style={{ color: '#FFF',textDecoration:'none',marginLeft:"650px" }} onMouseOver={e=>{e.target.style.color='#86cbdd'}} onMouseOut={e=>{e.target.style.color='white'}}>Login</Link></ReactBootStrap.Nav.Link>
            </ReactBootStrap.Nav>
    
            </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
            <Switch>
                <Route exact 
                    path="/" 
                    render={props=><PlaceDO {...props}/>}
                >
                </Route>
                <Route path="/add_items" component={AddItems}>
                    
                </Route>
                <Route path="/add_cust" component={AddCust}>
                    
                </Route>
                <Route path="/add_sellers" component={Seller}>
                    
                </Route>
                <Route path="/order_history" component={Order}>
                    
                </Route>
                <Route 
                    path="/order/:order_id"
                    render={props=><Invoice {...props}/>}
                >    
                </Route>
                <Route 
                    path="/cart/:id" 
                    render={props=><PlaceDO {...props}/>}>
                </Route>
                <Route path="/login" component={Login}>
                    
                </Route>
            </Switch>
        </div>
    </Router>
  )
};
}

export default App;
// style={{ color: '#FFF',textDecoration:'none' }}