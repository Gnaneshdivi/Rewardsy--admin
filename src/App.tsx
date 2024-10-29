import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navigation from './components/layout/Navigation';
import AddUpdateMerchantPage from './pages/AddUpdateMerchantPage';
import SearchMerchantPage from './pages/SearchMerchantPage';
import './styles/App.css';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="app-container">
        <Navigation />
        <Layout className="site-layout">
          <Content className="content-layout">
            <Routes>
              <Route path="/merchant/search" element={<SearchMerchantPage />} />
              <Route path="/merchant/add" element={<AddUpdateMerchantPage />} />
              <Route
                path="/merchant/edit/:id"
                element={<AddUpdateMerchantPage />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
