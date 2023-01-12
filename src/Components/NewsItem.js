import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl ,author,date,Source} = this.props;
        return (
            <div className="my-3">
                < div className="card">
                <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{Source}
                    </span>
                    <img src={!imageUrl?"https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2020/12/0/0/iStock-1280356987.jpg?ve=1&tl=1":imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}   
                     </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer"href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )


    }
}

export default NewsItem
