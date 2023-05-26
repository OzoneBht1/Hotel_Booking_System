# Hotel Booking System
A comprehensive hotel booking platform with features such as authentication, searching and filtering, review and rating system, recommendation system, and booking management. The platform also includes payment processing, a user-friendly interface, and real-time hotel updates and availability check.

## Features
- User authentication and authorization
- Search and filter options for hotels
- Review and rating system
- Recommendation system based on user preferences
- Booking management and payment processing
- User-friendly interface with real-time updates and availability check

## Prerequisites 
- [Node.js](https://nodejs.org/) 
- [Python 3](https://www.python.org/downloads/)
- [Stripe Api Key](https://stripe.com/)
- [PostgreSQL](https://www.postgresql.org/)


##Installing

1. Clone the repository:

```bash
$ git clone https://github.com/OzoneBht1/FYP--Hotel-Booking-System.git
```
2. Configure publishable Stripe API key for the frontend:

```bash
$ cd frontend
$ touch .env
$ vi .env
$ VITE_REACT_APP_STRIPE_URL="YOUR_STRIPE_PUBLISHABLE_KEY"
$ :wq
```

3. Install the required packages for the frontend:

```bash
$ npm install
```

3. Create and activate a virtual environment

```bash
$ cd ../backend
$ python3 -m venv myenv
$ source myenv/bin/activate
```

4. Configure SMTP, Database and Stripe for the backend:

```bash
$ touch .env
$ vi .env

SECRET_KEY='YOUR_VALUE_HERE'

DATABASE_NAME='YOUR_VALUE_HERE'
DATABASE_USER='YOUR_VALUE_HERE'
DATABASE_PASSWORD='YOUR_VALUE_HERE'
DATABASE_HOST='YOUR_VALUE_HERE'
DATABASE_PORT='YOUR_VALUE_HERE'

EMAIL_BACKEND='YOUR_VALUE_HERE'
EMAIL_HOST='YOUR_VALUE_HERE'
EMAIL_USE_TLS='YOUR_VALUE_HERE'
EMAIL_PORT='YOUR_VALUE_HERE'
EMAIL_HOST_USER='YOUR_VALUE_HERE'
EMAIL_HOST_PASSWORD='YOUR_VALUE_HERE'
STRIPE_API_KEY='YOUR_VALUE_HERE'
$ wq

```

4. Install the required packages for the backend:

```bash
$ pip install -r requirements.txt
```

5. Run the frontend and backend servers seperately:

```bash
$ python manage.py runserver
```

```bash
$ cd ../frontend
$ npm run dev 
```

The application should now be running on http://localhost:3000.

## Built With

* [Django](https://www.djangoproject.com/) - The web framework used
* [Django Rest Framework](https://www.django-rest-framework.org/) - Used to generate REST API
* [React](https://reactjs.org/) - Used to build the frontend
* [Node.js](https://nodejs.org/) - Used to run the frontend
* [Material-UI](https://material-ui.com/) - Used to build the UI components
* [React-Router](https://reactrouter.com/) - Used to manage routing in the application
* [React-Redux](https://react-redux.js.org/) - Used to connect React with Redux
  
