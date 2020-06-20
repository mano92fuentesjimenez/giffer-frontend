import React from 'react';
import bem from 'bem-cn'
import Identicon from 'components/IdentIcon/IdentIcon';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { selectUser } from 'services/user/selectors';
import { PATH as LOGIN_PATH} from 'scenes/LogIn';
import { PATH as SIGNUP_PATH} from 'scenes/SignUp';
import { FormattedMessage } from 'react-intl';
import selectSearch from 'services/search/selectSearch';
import { getStringFromSearch } from 'services/search/helpers';
import './UserBtn.scss';

const b = bem('components-user-btn');
const UserBtn = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const search = useSelector(selectSearch);

  const onLoginClick = () => dispatch(push({ pathname: LOGIN_PATH, search: getStringFromSearch(search) }));
  const onSignUpClick = () => dispatch(push({ pathname: SIGNUP_PATH, search: getStringFromSearch(search) }));

  return <div className={b()}>
    {
      !user &&
      <>
        <div
          className={b('login')()}
          onClick={onLoginClick}
        >
          <FormattedMessage id={'login'} />
        </div>
        |
        <div
          className={b('signup')()}
          onClick={onSignUpClick}
        >
          <FormattedMessage id={'signup'} />
        </div>
      </>
    }
    {
      user && <Identicon value={user.email}/>
    }
  </div>;
}

export default UserBtn;