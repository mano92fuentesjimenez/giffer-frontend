import React from 'react';
import bem from 'bem-cn';
import './LanguageSelector.scss';
import { LANGUAGES } from 'services/intl/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from 'services/configuration/selectors';
import { setLanguage } from 'services/configuration/actions';

const b = bem('components-language-selector');
const LanguageSelector = () => {
  const dispatch = useDispatch();

  const currentLanguageId = useSelector(selectLanguage);
  const currentLanguage = LANGUAGES.find(l => currentLanguageId === l.id);

  const onLanguageSelected = (languageId) => dispatch(setLanguage(languageId));

  return (
    <div className={b()}>
      <div className={b('current-language')()}>{currentLanguage.value}</div>
      <div className={b('languages-container')()}>
        {LANGUAGES.map(l => (
          <div
            className={b('language-element')()}
            onClick={() => onLanguageSelected(l.id)}
            key={l.id}
          >
            {l.value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LanguageSelector