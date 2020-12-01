import React from 'react';
import './App.scss';
import Header from './components/navbar/navbar.component';
import Footer from './components/footer/footer.component';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchContext from './contexts/search';
import CategoryContext from './contexts/category';
import AppContextProvider from './contexts/appContext';
import Main from './pages/container-page';
import LoginModal from './components/Modal/Modal.component';
import ResetPasswordModal from './components/reset-password/reset-password-modal';

function App() {
  return (
    <div className='App'>
      <AppContextProvider>
        <CategoryContext>
          <SearchContext>
            <Router>
              <Header />
              <br />
              <br />
              <Main />
              <br />
              <br />
              <Footer />
              <LoginModal />
              <ResetPasswordModal />
            </Router>
          </SearchContext>
        </CategoryContext>
      </AppContextProvider>
    </div>
  );
}

export default App;
