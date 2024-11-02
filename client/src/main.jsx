import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthContext from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
    <AuthContext>
      <App />
    </AuthContext>
)
