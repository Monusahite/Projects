import { Component } from "react";
import { movies } from "../movieData";
// import {axios} from 'axios'
const axios =require('axios')

class MovieList extends Component {
    constructor(){
        super();
        this.state={
            hover:"",
            pArr:[1],
            movie:[],
            currentPage:1,
            Favourites:[]
        }
    }
    previousPage=()=>{
        if(this.state.currentPage!==1){
            this.setState({
                currentPage:this.state.currentPage-1,
            },this.changeMovies)
        }
    }
    async componentDidMount(){ 
        const res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=84d9ea6d99b38863f7d41e7d9074ad62&language=en-US&page=${this.state.currentPage}`)

           this.setState({
               movie:[...res.data.results]
            })
            console.log("component did mount")
    }
    async changeMovies(){
         const res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=84d9ea6d99b38863f7d41e7d9074ad62&language=en-US&page=${this.state.currentPage}`)

          this.setState({
          movie:[...res.data.results]
       })
    }
    nextPage=()=>{
        this.setState({
            pArr:[...this.state.pArr,this.state.pArr.length+1],
            currentPage:this.state.currentPage+1 
        },this.changeMovies)
       
    }
    handlePageClick=(ele)=>{
        if(ele!==this.state.currentPage)
        this.setState({
           currentPage:ele 
        },this.changeMovies)
    }
    handleFav=(movieObj)=>{
        let oldData=JSON.parse(localStorage.getItem('movie-app')||'[]')
        if(this.state.Favourites.includes(movieObj.id)){
            oldData=oldData.filter((movie)=>movie.id!=movieObj.id)
        }
        else{
            oldData.push(movieObj)
        }
        localStorage.setItem("movie-app",JSON.stringify(oldData))

        this.handleFavState();
    }
    handleFavState=()=>{
        let oldData=JSON.parse(localStorage.getItem('movie-app')||'[]')
        let temp=oldData.map((movieObj)=>movieObj.id)

        this.setState({
            Favourites:[...temp]
        })

    }
    render() {
         console.log(this.currentPage)
        // let MovieArr = movies.results;
        return (
            <>
                <div>
                    <h2 className="text-center"><strong>Trending</strong></h2>
                </div>
                <div className="movies-list">
                    {this.state.movie.map((MovieEle) => (
                        <div className="card movie-card" onMouseEnter={()=>this.setState({hover:MovieEle.id})} onMouseLeave={()=>this.setState({hover:""})} >
                            <img src={`https://image.tmdb.org/t/p/original${MovieEle.backdrop_path}`} style={{ width: "20vw", height: "40vh" }} className="card-img-top" alt="..." />

                            <h5 className="card-title movies-title" >{MovieEle.original_title} </h5>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                {this.state.hover===MovieEle.id && (
                                     <a href="#i" type="button" className="btn btn-primary movies-button" onClick={()=>this.handleFav(MovieEle)}>
                                         {this.state.Favourites.includes(MovieEle.id)?"Remove From Favourite":"Add To Favourite"}</a>)}
                               
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item " ><a className="page-link"style={{pointerEvents:"auto"}} href="#" onClick={this.previousPage}>Previous</a></li>
                            {this.state.pArr.map((ele)=>( 
                            <li key={ele} className="page-item"><a className="page-link" style={{pointerEvents:"auto"}} href="#" onClick={()=>this.handlePageClick(ele)} >{ele}</a></li>
                            ))}
                           
                            <li className="page-item"><a className="page-link"style={{pointerEvents:"auto"}} href="#" onClick={this.nextPage}  >Next</a></li>
                        </ul>
                    </nav>
                </div>
            </>
        )
    }
}
export default MovieList;