import React from 'react'

function Item(props) {  
    let {item}=props;
    return (
      <div className="my-2">
              <div className="card">
              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left:'90%',zIndex:'1'}}>
    
  </span>
        <div className="card-body">
          <h6 className="card-title">{item.name}</h6>
          <p className="card-text">brewery_type={item.brewery_type}</p>
          <p className="card-text">Address={item.address_1}</p>
          <p className="card-text">city={item.city}</p>
          <p className="card-text">state_province={item.state_province}</p>
          <p className="card-text">postal_code={item.postal_code}</p>
          <p className="card-text">country={item.country}</p>
          <div className="text-center">
          <a href={item.website_url} rel="noopener noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
      </div>
    
  )
}

export default Item
