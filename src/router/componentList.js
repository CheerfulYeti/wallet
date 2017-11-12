import App from 'containers/App';
import Registration from 'containers/Login/Registration';
import Auth from 'containers/Login/Auth';
import Test from 'containers/Test';
import Profile from 'containers/Profile';
import FactAdd from 'containers/Fact/FactAdd';

export default {
  home: App,
  loginAuth: Auth,
  loginRegistration: Registration,
  profile: Profile,
  test: Test,
  factAdd: FactAdd,
}
