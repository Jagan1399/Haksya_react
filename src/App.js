import React,{useState,Component} from 'react';
import * as ReactBootStrap from "react-bootstrap"
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Home from './components/home'
  import Add_Cust from './components/add_cust'
  import Add_Items from './components/add_items'
  import Order from './components/order_history'

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
            <ReactBootStrap.Navbar.Brand><Link onMouseEnter={this.onhover} onMouseLeave={this.onLeave} to="/"  style={{ color: '#FFF',textDecoration:'none' },linkStyle}>Haksya Cart</Link></ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto">
                <ReactBootStrap.Nav.Link><Link  to="/add_items" style={{ color: '#FFF',textDecoration:'none' }}>Add Items</Link></ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link><Link  to="/add_cust" style={{ color: '#FFF',textDecoration:'none' }}>Add Customer</Link></ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link><Link  to="/place_do" style={{ color: '#FFF',textDecoration:'none' }}>Place DO</Link></ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link><Link  to="/order_history" style={{ color: '#FFF',textDecoration:'none' }}>Order History</Link></ReactBootStrap.Nav.Link>
            </ReactBootStrap.Nav>
    
            </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/add_items">
                    <Add_Items />
                </Route>
                <Route path="/add_cust">
                    <Add_Cust />
                </Route>
                <Route path="/order_history">
                    <Order />
                </Route>
            </Switch>
        </div>
    </Router>
  )
};
}

export default App;
// style={{ color: '#FFF',textDecoration:'none' }}