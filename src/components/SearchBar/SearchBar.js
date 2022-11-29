import React from "react"
import './SearchBar.css'
export class SearchBar extends React.Component {

    constructor(props){
        super(props);
        
       
        this.search = this.search.bind(this);
        this.handelTermChange = this.handelTermChange.bind(this);
    }

    search(){
        this.props.onSearch(this.state.term);
        

    }

    handelTermChange(e){
        this.setState({term:e.target.value})
        
    }
    render(){
        return (
            <div className="SearchBar">
             <input placeholder="Enter A Song, Album, or Artist" onChange={this.handelTermChange}/>
             <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}