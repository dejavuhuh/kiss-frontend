import { suppressAntdConsoleWarning } from '@/utils/suppressAntdConsoleWarning.ts'
import { App as AntdApp, ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

suppressAntdConsoleWarning()

createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={enUS}>
    <AntdApp className="h-full">
      <App />
    </AntdApp>
  </ConfigProvider>,
)
