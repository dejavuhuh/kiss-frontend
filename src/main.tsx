import { createRoot } from 'react-dom/client'
import App from './App'
import { setupGlobalErrorHandling } from './utils/setupGlobalErrorHandling'

setupGlobalErrorHandling()

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(<App />)
}
