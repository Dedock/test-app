import React from "react";
import {Route, Switch, Redirect} from "react-router";
import TabContent from '../TabContent'

//Dynamic import
function importContent (path) {
  return import(`../../${path}`)
}

//bring 'default' tab
const DefaultPage = ({ tabs }) => {
  const defaultTabUrl = `/${tabs.find(tab => tab.order === 0).id}`
  return <Redirect to={ defaultTabUrl }/>
}

const Routes = ({ tabs }) => (
  <Switch>{
    tabs
      .map(({ id, order, path }) => (
        <Route
          key={ order }
          path={ `/${id}` }
          render={ ({ match }) => <TabContent loader={ match ? importContent(path) : null }/> }/>
      ))
  }
    <Route exact from="*" render={ (props) => <DefaultPage tabs={ tabs }/> }/>
  </Switch>
)

export default Routes