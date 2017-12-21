import React from 'react';
import {NavLink} from 'react-router-dom';


const TabsNavigation = ({ tabs }) => (
  <div className='tabs-navigation'>
    { tabs
      .map(({ order, id, title }) =>
         <NavLink className='tab' activeClassName="active-tab"
                 key={ order }
                 to={ `/${id}` }>
          { title }
        </NavLink>
      ) }
  </div>
)

export default TabsNavigation