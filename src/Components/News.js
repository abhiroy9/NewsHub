import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        Country: 'in',
        PageSize: 12,
        category: 'general'
    }
     static propTypes = {
        Country: PropTypes.string,
        PageSize: PropTypes.number,
        category: PropTypes.string,
     }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            Page:1
        }
    }

     async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?Country=${this.props.country}&category=${this.props.category}&apiKey=7c7ee043809e404280645ccb96ed3ce6&page=1&PageSize=${this.props.PageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,
            loading:false
        })

    }

    handlePrevClick = async ()=>{
       console.log("Previous");
       let url = `https://newsapi.org/v2/top-headlines?Country=${this.props.country}&category=${this.props.category}&apiKey=7c7ee043809e404280645ccb96ed3ce6&page=${this.state.Page - 1}&PageSize=${this.props.PageSize}`;
       this.setState({loading: true});
       let data = await fetch(url);
       let parsedData = await data.json()
       console.log(parsedData);
       this.setState({
           Page: this.state.Page - 1,
           articles: parsedData.articles,
           loading: false
        })

    }

    handleNextClick = async ()=>{
        console.log("Next");
        if(!(this.state.Page + 1 > Math.ceil(this.state.totalResults/this.props.PageSize))){
        
        let url = `https://newsapi.org/v2/top-headlines?Country=${this.props.country}&category=${this.props.category}&apiKey=7c7ee043809e404280645ccb96ed3ce6&page=${this.state.Page + 1}&PageSize=${this.props.PageSize}`;
        this.setState({loading: true})
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            Page: this.state.Page + 1,
            articles: parsedData.articles,
            loading: false
        })
 
    } 
}     

    render() {
        console.log("render")
        return (
            < div className="container my-3" >
                <h1 className="text-center" style={{margin: '30px 0px'}}>NewsHub - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row" >
                    { !this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url} >
                            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}author={element.author} date={element.publishedAt}Source={element.source.name} />
                        </div>


                    })}


                </div>
              <div className="container d-flex justify-content-between">
              <button disabled={this.state.Page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;
Previous</button>
              <button disabled={(this.state.Page + 1 > Math.ceil(this.state.totalResults/this.props.PageSize))}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;
</button>


              </div>

            </div>
        )
    }
}

export default News
