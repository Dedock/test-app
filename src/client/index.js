import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/index'
import { AppContainer } from 'react-hot-loader'

const render = AppNode => {
    ReactDOM.render(
        <AppContainer><AppNode /></AppContainer>,
        document.getElementById('app')
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./app', () => render(App));
}
