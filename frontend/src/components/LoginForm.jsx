import React, { useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ setIsAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async (values) => {
    const { username, password } = values;
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });

      if (response.data.tokens) {
        localStorage.setItem('access_token', response.data.tokens.access);
        localStorage.setItem('refresh_token', response.data.tokens.refresh);

        setIsAuthenticated(true);
        history.push('/chatbot');
      }
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Login Failed',
        description: 'Invalid username or password. Please try again.',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <Form onFinish={handleLogin} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input
              type="text"
              placeholder="Enter username"
              className="ant-input"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              placeholder="Enter password"
              className="ant-input"
              size="large"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
