import React from "react"
import "../main.css"
import TabsNavigation from "./components/TabsNavigation"
import Routes from "./components/Routes"
import {BrowserRouter} from "react-router-dom"
import tabs from '../../../tabs.json'

function sortByOrderId (tabs) {
  return tabs.sort((a, b) => a.order > b.order)
}

class App extends React.Component {

  constructor () {
    super()
    this.state = {
      tabs: sortByOrderId(tabs)
    }
  }

  render () {
    return (
      <BrowserRouter>
        <div>
          <TabsNavigation tabs={ this.state.tabs }/>
          <Routes tabs={ this.state.tabs }/>
        </div>
      </BrowserRouter>
    )

  }
}

export default App
