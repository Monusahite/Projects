import { Component } from 'react'
import {movies} from '../movieData'
const axios=require('axios')


class Banner extends Component {
    constructor(){
        super();
        this.state={
            movie:[]
        }
    }
    async componentDidMount(){ 
        const res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=84d9ea6d99b38863f7d41e7d9074ad62&language=en-US&page=1`)

           this.setState({
           movie:[...res.data.results]
       })
    }
    render() {
      

        let bp=this.state.movie.map((ele)=>{
            return ele.backdrop_path;
        })
        let title=this.state.movie.map((ele)=>{
            return ele.title;
        })
        let overview=this.state.movie.map((ele)=>{
            return ele.overview;
        })
        
        let randNum = Math.floor(Math.random()*20)
        console.log("***",bp[0],title[0],overview[0])
       
        console.log("render")
        let movieList=movies.results[0];
        return (
            
            <div className="card banner-card">
                <img src={`https://image.tmdb.org/t/p/original${bp[randNum]}`} className="card-img-top banner-img" alt="..." />
                <h1 className="card-title banner-title">{title[randNum]}</h1>
                <p className="card-text banner-text">{overview[randNum]}</p>
            </div>
        )
    }
}
export default Banner;