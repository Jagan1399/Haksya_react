import React from 'react'
import * as ReactBootStrap from "react-bootstrap"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Home from './home'
import Add_Cust from './add_cust'
import Add_Items from './add_items'

export default function header() {
    return (
    <Router>
        <div>
            <ReactBootStrap.Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <ReactBootStrap.Navbar.Brand><Link to="/">Haksya Cart</Link></ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto">
                <ReactBootStrap.Nav.Link><Link to="/add_items">Add Items</Link></ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link><Link to="/add_cust">Add Customer</Link></ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link><Link to="/place_do">Place DO</Link></ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link><Link to="/order_history">Order History</Link></ReactBootStrap.Nav.Link>
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
            </Switch>
        </div>
    </Router>
    )
}
