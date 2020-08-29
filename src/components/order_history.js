import React,{Component} from 'react'
// import Post from '../templates/post'

class Order extends Component{
    constructor(props) {
        super(props)
        
        this.state = {
             posts:[],
             isLoaded:false
        }
        // this.loadposts=this.loadposts.bind(this)
    }
    
    componentDidMount()
    {
        // console.log(this)
       const _this=this
        // fetch('https://jsonplaceholder.typicode.com/todos/2')
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=> res.json())
        .then(resData=>{
            // console.log(resData)
            // const post_arr=resData
            // console.log(post_arr)
            _this.setState({
                posts:resData,
                isLoaded:true
            })
            console.log(this.state.posts)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render()
    {
        const {posts,isLoaded}=this.state
        return (
            <div>
                <div>
                    <h1>Order History</h1>
                </div>
                {/* {
                    posts.map(post=>{
                       return  <Post key={post.id} name={post.name} email={post.email} />
                    })
                } */}
            </div>

        )
    }
}
export default Order