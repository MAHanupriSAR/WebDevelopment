import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {App2, Clock} from './App.jsx'

createRoot(document.getElementById('root')).render(
    <>
        <Clock></Clock>
        <App></App>
        <App2></App2>
    </>
)
