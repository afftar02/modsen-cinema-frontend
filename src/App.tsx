import Main from 'pages/Main';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthForm from 'components/AuthForm';
import Film from 'pages/Film';
import Bookings from 'pages/Bookings';
import Auth from 'auth/Auth';
import AuthorizedRoute from 'utils/AuthorizedRoute';

function App() {
  return (
    <Auth>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Main />}>
          <Route
            path="signup"
            element={
              <AuthForm
                isSignUp
                title={
                  'Great Movies in the best cinema! We care about your comfort.'
                }
                brightTitle={'Join us Right Now!'}
                hint={'Already has an account?'}
                underlinedHint={'Login please.'}
                hintLink={'/signin'}
              />
            }
          />
          <Route
            path="signin"
            element={
              <AuthForm
                title={'We are glad to see you again!'}
                brightTitle={'Enjoy watching movies with us!'}
                hint={'No account?'}
                underlinedHint={'Sign up please.'}
                hintLink={'/signup'}
              />
            }
          />
        </Route>
        <Route
          path="/film/:id"
          element={
            <AuthorizedRoute>
              <Film />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <AuthorizedRoute>
              <Bookings />
            </AuthorizedRoute>
          }
        />
      </Routes>
    </Auth>
  );
}

export default App;
