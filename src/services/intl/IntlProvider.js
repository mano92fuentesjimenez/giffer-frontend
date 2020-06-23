import React from 'react';
import { useSelector } from 'react-redux';
import { selectLanguage } from 'services/configuration/selectors';
import { IntlProvider } from 'react-intl';
import messages from 'services/intl/messages';

const InternationalizationProvider = ({ children }) => {
  const language = useSelector(selectLanguage);

  return <IntlProvider locale={language} messages={messages[language]}>
    {children}
  </IntlProvider>
}

export default InternationalizationProvider;