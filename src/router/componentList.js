import App from 'containers/App';
import Registration from 'containers/Login/Registration';
import Auth from 'containers/Login/Auth';
import Test from 'containers/Test';
import Profile from 'containers/Profile';
import FactAdd from 'containers/Fact/FactAdd';
import FactList from 'containers/Fact/FactList';
import FactListAccepted from 'containers/Fact/FactList/FactListAccepted';
import FactListUnAccepted from 'containers/Fact/FactList/FactListUnAccepted';

export default {
  home: App,
  loginAuth: Auth,
  loginRegistration: Registration,
  profile: Profile,
  test: Test,
  factAdd: FactAdd,
  factList: FactList,
  factListAccepted: FactListAccepted,
  factListUnAccepted: FactListUnAccepted,
};
