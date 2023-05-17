import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <>
    <nav>
          <div id="menu" className="collapse navbar-collapse">
            <ul>
              <li className="menu-item"><Link to="/">iPhone</Link></li>
              <li className="menu-item"><Link to="#">Samsung</Link></li>
              <li className="menu-item"><Link to="#">HTC</Link></li>
              <li className="menu-item"><Link to="#">Nokia</Link></li>
              <li className="menu-item"><Link to="#">Sony</Link></li>
              <li className="menu-item"><Link to="#">Blackberry</Link></li>
            </ul>
      </div>
      </nav>
    </>
  )
}

export default Menu