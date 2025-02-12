import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ChatbotPage from './components/ChatbotPage';
import ProtectedRoute from './components/ProtectedRoute'
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    setIsAuthenticated(false);
    history.push('/login');
  };

  return (
    <Router>
      <div>
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <h1 className="text-xl">Chat App</h1>
          {isAuthenticated && (
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </header>

        <div className="">
          <Switch>
            <Route path="/login">
              <LoginForm setIsAuthenticated={setIsAuthenticated} />
            </Route>
            <ProtectedRoute
              path="/chatbot"
              component={ChatbotPage}
              isAuthenticated={isAuthenticated}
            />
            <Route exact path="/">
              {isAuthenticated ? <ChatbotPage /> : <LoginForm setIsAuthenticated={setIsAuthenticated} />}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
