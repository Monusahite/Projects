import {Component} from 'react'
import {Link} from 'react-router-dom'

class Navbar extends Component{
    render(){
        return(
    
        <div style={{display:"flex",color:"blue" ,padding:"0.5rem"}}>
            <Link to="/" style={{textDecoration:"none"}}> <h1>Movies App</h1></Link>
            <Link to="/favourites"  style={{textDecoration:"none"}}> <h2 style={{marginLeft:"3rem",marginTop:"0.5rem"}} >Favourite</h2></Link>
           
           
        </div> 
        )
    }
}

export default Navbar;
