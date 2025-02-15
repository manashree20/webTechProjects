import { createRoot } from 'react-dom/client'
import './index.css'

import React, { Suspense } from 'react'
let App = React.lazy(()=>import("./App.jsx"))


createRoot(document.getElementById('root')).render(
    <Suspense fallback='Loading.....'>
        <App />
    </Suspense>
)
