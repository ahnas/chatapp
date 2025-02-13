# Chat Application

This is a real-time chat application built using Django for the backend and React (with Vite) for the frontend. The application supports AI-powered chat, real-time messaging using WebSockets, and user authentication.

## Features

- **User Authentication** – Sign up, log in, and manage user accounts using JWT tokens.
- **AI Chatbot** – Uses OpenAI API for AI-driven chat responses.
- **Responsive UI** – Styled with Tailwind CSS and Ant Design.
- **Django REST API** – Backend API built using Django Rest Framework.
- **Database** – Uses SQLite for local development.

---

## Backend Setup (Django)

### Installation & Setup

```sh
cd mychatapp
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Running Daphne for WebSockets

```sh
daphne mychatapp.asgi:application
```

---

## Frontend Setup (React + Vite)

### Installation & Running

```sh
cd frontend
npm install  # Install dependencies
npm run dev  # Start the Vite development server
```

---

## API Endpoints

### Authentication

- **Register:** `POST http://127.0.0.1:8000/api/register/`
- **Login:** `POST http://127.0.0.1:8000/api/login/`

---

## Usage

1. **User Registration & Login**

   - Open the frontend in your browser.
   - Register a new account or log in with existing credentials.

2. **Chat Functionality**

   - AI Chatbot available for AI-powered conversations.

3. **WebSockets**

   - Real-time chat updates without refreshing the page.

---


## Technologies Used

### Backend

- Django
- Django REST Framework
- Django Channels
- Daphne
- SQLite (for development)

### Frontend

- React (Vite)
- React Router
- Tailwind CSS
- Ant Design
- Axios
- Socket.IO Client

---

## Contributing

Feel free to fork this project and submit pull requests. If you encounter any issues, please create a GitHub issue with details.

---

## License

This project is open-source and available under the MIT License.

