import React,{Component} from 'react'
// import Post from '../templates/post'
import FilterListIcon from '@material-ui/icons/FilterList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './order_history.scss'
class Order extends Component{
    constructor(props) {
        super(props)
        
        this.state = {
             posts:[],
             orders:[],
             isLoaded:false
        }
        // this.loadposts=this.loadposts.bind(this)
    }
    
    componentDidMount()
    {
        fetch('http://178.128.90.226:8000/orders')
        .then(res=>{return res.json()})
        .then(resData=>{
            console.log(resData)
            this.setState({
                orders:resData,
                is_Loading:true
            })
        })
    }

    render()
    {
        const {posts,isLoaded}=this.state
        return (
           
            <section class="md-ui component-data-table">
	<header class="main-table-header">
		<h1 class="table-header--title">Order History</h1>
		<span class="table-header--icons"><FilterListIcon fontSize="large"/><MoreVertIcon fontSize="large"/>
        {/* <i class="material-icons">more_vert</i> */}
		</span>
	</header>
	<div class="main-table-wrapper">
		<table class="main-table-content">
			<thead class="data-table-header">
				<tr class="data-table-row">
                    <td class="table-datacell datatype-numeric">Order ID</td>
					<td class="table-datacell datatype-string">Customer</td>
					<td class="table-datacell datatype-numeric">Total Price</td>
                    <td class="table-datacell datatype-string">Order Date</td>
				</tr>
			</thead>
            
			<tbody class="data-table-content">
            {this.state.orders.map( order => (
                
			<tr class="data-table-row">
			<td class="table-datacell datatype-numeric"><a href={'/order/' + order.id}>{order.id}</a></td>
            <td class="table-datacell datatype-string">{order.customer.customer_name}</td>
            <td class="table-datacell datatype-numeric">{order.total_price}</td>
            <td class="table-datacell datatype-string">{order.date}</td>
           
                </tr>
                
				))}
			</tbody>
		</table>
	</div>
	<footer class="main-table-footer">
		<span class="rows-selection">
			<span class="rows-selection-label">Rows per page:</span>
			<span class="rows-selection-dropdown">10<KeyboardArrowDownIcon fontSize="large"/></span>
		</span>
		<span class="rows-amount">1-10 of 100</span>
		<span class="table-pagination">
            <ArrowBackIosIcon fontSize="large"/>
            <ArrowForwardIosIcon fontSize="large"/>
			{/* <i class="material-icons">keyboard_arrow_left</i>
			<i class="material-icons">keyboard_arrow_right</i> */}
		</span>
	</footer>
</section>

        )
    }
}
export default Order