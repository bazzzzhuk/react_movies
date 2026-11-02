import "./Main.css";// JavaScript source code
import React from "react";
import MovieList from "../components/MovieList";
import Preloader from "../components/Preloader";
import Search from "../components/Search";

class Main extends React.Component
{
	state =
		{
			movies: []
		}
	componentDidMount()
	{
		fetch('https://www.omdbapi.com/?s=Terminator&apikey=12a19c25')
			.then(response => response.json())
			.then(data => this.setState({movies:data.Search}));
	}
	searchMovie = (str, type='all') =>
	{
		let search_string = `https://www.omdbapi.com/?s=${str}${type !== 'all' ? `&type=${type}` : ''}&apikey=12a19c25`;
		fetch(search_string)
			.then(response => response.json())
			.then(data => this.setState({ movies: data.Search }));
	}
	render()
	{
		return (
				< div className = "main">
				<Search searchMovie={ this.searchMovie} />
				{
					this.state.movies == null ? <h1>Nothing</h1>:
					this.state.movies.length === 0 ? <Preloader /> : 
					<MovieList movies={ this.state.movies} />
				}
				</div >
				
		)
	}
}
export default Main;
