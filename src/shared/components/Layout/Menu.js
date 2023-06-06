import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({categories}) => {
  return (
    <>
    <nav>
          <div id="menu" className="collapse navbar-collapse">
            <ul>
              {
                categories.map((categories)=>
                (<li key={categories._id} className="menu-item"><Link to={`/category/${categories._id}`}>{categories.name}</Link></li>))
              }
              
            </ul>
      </div>
      </nav>
    </>
  )
}

export default Menu