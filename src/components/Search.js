import './Search.css';// JavaScript source code
import React from "react";

class Search extends React.Component {
	state =
		{
			search: "",
			type: "all",
			page: 1,
			//totalPages:1
		}
	//componentDidMount()
	//{
	//	let itemsPerPage = 10;
	//	this.setState({ totalPages: Math.ceil(this.props.totalCount / itemsPerPage) });
	//}
	handleKey = (event) => {
		if (event.key === 'Enter') {
			this.props.searchMovie(this.state.search, this.state.type);
			this.setState({ page: 1 });
		}
	}
	handleFilter = (event) => {
		this.setState
			(
				() => ({ type: event.target.dataset.type }),
				() => ({ search: this.props.searchMovie(this.state.search, this.state.type) }),
			)
	}

	prevPage = () => {
		this.setState
			(
				() => (this.state.page > 1 ? { page: this.state.page - 1 } : { page: 1 }),
				() => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
			)
	}
	nextPage = () => {
		const itemsPerPage = 10;
		const totalPages = Math.ceil(this.props.totalCount / itemsPerPage);
		this.setState
			(
				() => (this.state.page < totalPages ? { page: this.state.page + 1 } : { page: totalPages }),
				() => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
			)
	}
	setPage = (pageNumber) => {
		if (typeof pageNumber !== 'number') return; 
		this.setState
			(
				() => ({ page: pageNumber }),
				() => (this.props.searchMovie(this.state.search, this.state.type, this.state.page))
			)
	}



	getPaginationNumbers = () => {
		const itemsPerPage = 10;
		const totalPages = Math.ceil(this.props.totalCount / itemsPerPage);
		const currentPage = this.state.page;

		// Если страниц мало
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}
		const pages = new Set();
		pages.add(1);
		if (currentPage !== 1 || currentPage !== null)
		{
			for (let i = -1; i <= 1; i++) {
			const p = currentPage + i;
			if (p >= 1 && p <= totalPages) {
				pages.add(p);
			}
		}}
		if(totalPages!==1)pages.add(totalPages);

		const sorted = Array.from(pages).sort((a, b) => a - b);
		const result = [];
		sorted.forEach((pageNum, index) => {
			result.push(pageNum);

			// Если не последний элемент и следующий номер не идёт подряд
			if (index < sorted.length - 1 && sorted[index + 1] - pageNum > 1) {
				result.push('.');
			}
		});

		return result;
	};

	

	render() {
		const paginationNumbers = this.getPaginationNumbers();
		let itemsPerPage = 10;
		let totalPages = Math.ceil(this.props.totalCount / itemsPerPage);
		//this.setState({ totalPages: Math.ceil(this.props.totalCount / itemsPerPage) });
		//const lastIndex = totalPages <= 10 ? totalPages + 1 : ;
		let number = [];

		for (let i = 0; i < totalPages; i++)
			number.push(i + 1);

		const pagesToShow = [
			1,                
			this.state.page-1,         
			this.state.page,       
			this.state.page+1,          
			totalPages
		].filter((p) => p != null); // если страниц нет

		return (
			<>
				<div className="search">
					<input type="search"
						placeholder="Поиск"
						value={this.state.search}
						onChange={(e) => this.setState({ search: e.target.value })}
						onKeyUp={this.handleKey}
					/>
					<button className="btn"
						onClick=
						{
							() => {
								this.props.searchMovie(this.state.search, this.state.type);
								this.setState({ page: 1 });
							}
						}
					>&#128269;
					</button>
				</div>
				<div className="radio">
					<input type="radio"
						name="type"
						id="radio-all"
						data-type="all"
						checked={this.state.type === 'all'}
						onChange={this.handleFilter} />
					<label htmlFor="radio-all">All</label>

					<input type="radio"
						name="type"
						id="radio-movie"
						data-type="movie"
						checked={this.state.type === 'movie'}
						onChange={this.handleFilter} />
					<label htmlFor="radio-all">Movie</label>

					<input type="radio"
						name="type"
						id="radio-series"
						data-type="series"
						checked={this.state.type === 'series'}
						onChange={this.handleFilter} />
					<label htmlFor="radio-all">Series</label>

					<input type="radio"
						name="type"
						id="radio-game"
						data-type="game"
						checked={this.state.type === 'game'}
						onChange={this.handleFilter} />
					<label htmlFor="radio-all">Game</label>
				</div>
				<div className="pagination">
					<button className="btn" onClick={this.prevPage}>◄ prev</button>
					{/*<>█▓▒░</>*/}
					{/*<div className="items">*/}
					{/*{*/}

					{/*{number.map*/}
					{/*	(*/}
					{/*		(element, index) =>*/}
					{/*		(*/}
					{/*			<button className={element === this.state.page ? "btn-current-page" : "btn2"}*/}
					{/*				onClick={()=>(this.setPage(element))}*/}
					{/*			>*/}
					{/*				{element}*/}
					{/*			</button>*/}
					{/*		)*/}
					{/*	)}*/}



					{paginationNumbers.map((item) => {
						if (item === '.') {
							return <span key={'dot-' + item} className="pagination-dots">...</span>;
						}
						return (
							<button
								key={item}
								className={item === this.state.page ? 'btn-current-page' : 'btn2'}
								onClick={() => this.setPage(item)}
							>
								{item}
							</button>
						);
					})}


					{/*{*/}
					{/*	pagesToShow.map((pageNum) => (*/}
					{/*		<button*/}
					{/*			key={pageNum}*/}
					{/*			className={pageNum === this.state.page ? "btn-current-page" : "btn2"}*/}
					{/*			onClick={() => this.setPage(pageNum)}*/}
					{/*		>*/}
					{/*			{pageNum}*/}
					{/*		</button>*/}
					{/*	))*/}
					{/*}*/}

					{/*	}*/}
					{/*</div>*/}
					{/*<>░▒▓█</>*/}
					<button className="btn" onClick={this.nextPage}>next ►</button>
				</div>
			</>
		)

	}
}
export default Search;