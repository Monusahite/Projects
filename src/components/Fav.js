import { Component } from "react";
import {movies} from '../movieData'

class Fav extends Component {
      constructor(){
          super();
          this.state={
              currgenre:"All Genres",
              movies:[],
              movies2:[],
              genres:[],
              currText:''
          }
     }
     componentDidMount(){
            const genreId ={28:"Action",12:"Adventure",16:"Animation",53:"Thriller",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy"}
            let data=JSON.parse(localStorage.getItem('movie-app'),'[]')
            let tempArr=[]
            tempArr.push("All Genres")
            data.map((movieObj)=>{
                if(!tempArr.includes(genreId[movieObj.genre_ids[0]]))
                tempArr.push(genreId[movieObj.genre_ids[0]])
            })
            this.setState({
                movies:[...data],
                movies2:[...data],
                genres:[...tempArr]
            })
        }

        handleClickGenre(genre){
           this.setState({
               currgenre:genre
           },this.filterMovies)
        }

        filterMovies=()=>{
            const genreId ={28:"Action",12:"Adventure",16:"Animation",53:"Thriller",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy"}

            let data=JSON.parse(localStorage.getItem('movie-app'),'[]')
            if(this.state.currgenre==='All Genres'){
                this.setState({
                    movies2:[...data],
                    movies:[...data]
                })
            }
            else{
                let filterMovies=data.filter((movieObj)=>genreId[movieObj.genre_ids[0]] === this.state.currgenre)
                
                this.setState({
                    movies2:[...filterMovies],
                    movies:[...filterMovies]
                })
            }
        }
        handleCurrText=(textValue)=>{
            this.setState({
                currText:textValue        
            },this.handleSearch)
        }
        handleSearch=()=>{
            if(this.state.currText!==''){
                let filterArr=this.state.movies2.filter((movieObj)=>{
                    let title = movieObj.original_title.toLowerCase()
                    return title.includes(this.state.currText.toLowerCase())
                })
                this.setState({
                    movies:[...filterArr]
                })
            }
            else{
                this.setState({
                    
                    movies:[...this.state.movies2]
                })
            }
        }
        handleDelete=(movieTitle)=>{
            let data=JSON.parse(localStorage.getItem('movie-app'),'[]')
            let tempArr=data.filter((movieObj)=>{
                return movieTitle!==movieObj.title;
            })
            let temp=this.state.movies.filter((movieObj)=>{
                return movieObj.title!==movieTitle
            })
            this.setState({
                movies:[...temp],
                movies2:[...temp]
            })
            
                localStorage.setItem('movie-app', JSON.stringify(tempArr));
        
        }
        sortPopularityDec=()=>{
          let temp=  this.state.movies.map((movieObj)=>movieObj)
          temp.sort(function(objA,objB){
              return objB.popularity-objA.popularity
          })
     
          this.setState({
              movies:[...temp],
              movies2:[...temp]
          })
        }
        sortPopularityInc=()=>{
          let temp=  this.state.movies.map((movieObj)=>movieObj)
          temp.sort(function(objA,objB){
              return objA.popularity-objB.popularity
          })
     
          this.setState({
              movies:[...temp],
              movies2:[...temp]
          })
        }
        sortRatingsDec=()=>{
            let temp=  this.state.movies.map((movieObj)=>movieObj)
            temp.sort(function(objA,objB){
                return objB.vote_average-objA.vote_average
            })
       
            this.setState({
                movies:[...temp],
                movies2:[...temp]
            })
        }
        sortRatingsInc=()=>{
            let temp=  this.state.movies.map((movieObj)=>movieObj)
            temp.sort(function(objA,objB){
                return objA.vote_average-objB.vote_average
            })
       
            this.setState({
                movies:[...temp],
                movies2:[...temp]
            })
        }
    render() {
        const movieArr=movies.results;
        // console.log(movieArr);
        console.log(this.state.currText)

        const genereId ={28:"Action",12:"Adventure",16:"Animation",53:"Thriller",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy"}
        const tempArr=[];
        tempArr.push("All Genre")
        movieArr.map((ele)=>{
            if(!tempArr.includes(genereId[ele.genre_ids[0]])){
                tempArr.push(genereId[ele.genre_ids[0]]);
            }
        })
        return (
            <div className="container">
                <div className="row genere-selector">
                    <div className="col-3">
                        <ul class="list-group ">
                            {this.state.genres.map((genre)=>(
                                this.state.currgenre===genre?
                                (<li className="list-group-item active">{genre}</li>)
                                :(<li className="list-group-item" onClick={()=>this.handleClickGenre(genre)}>{genre}</li>)
                            ))}
                        </ul>
                    </div>
                    <div className="col-9 ">
                        <div className="input-group-text">
                            <input type="text" class="form-control" placeholder="Search" value={this.state.currText} onChange={(e)=>this.handleCurrText(e.target.value)}/>
                            <input type="text" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genere</th>
                              
                                <th scope="col" style={{display:"flex",alignItem:"center",justifyContent:"center"}}>
                                <i class="fa fa-sort-up" onClick={this.sortPopularityDec}></i>
                                 Popularity
                                <i class="fa fa-sort-down" onClick={this.sortPopularityInc}></i>
                                </th>

                                <th scope="col"> 
                                <i class="fa fa-sort-up" onClick={this.sortRatingsDec}></i>
                                 Ratings
                                <i class="fa fa-sort-down"onClick={this.sortRatingsInc}></i></th>

                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.movies.map((movieEle)=>(

                            <tr>
                                <th scope="row"><img src={`https://image.tmdb.org/t/p/original${movieEle.backdrop_path}`} style={{width:"8rem",padding:"1rem"}} alt={movieEle.title}/>
                                {movieEle.title}</th>
                                <td>{genereId[movieEle.genre_ids[0]]}</td>
                                <td>{movieEle.popularity}</td>
                                <td>{movieEle.vote_average}</td>
                                <td><button type="button" className="btn btn-danger" onClick={()=>{this.handleDelete(movieEle.title)}} >Delete</button></td>
                            </tr>
                        ))}
                           
                        </tbody>
                    </table>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#i">1</a></li>
                                <li className="page-item"><a className="page-link" href="#i">2</a></li>
                                <li className="page-item"><a className="page-link" href="#i" >3</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}
export default Fav;