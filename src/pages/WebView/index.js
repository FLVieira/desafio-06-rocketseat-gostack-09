import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default function MyWeb(props) {
  const { route } = props;
  const { item } = route.params;
  return <WebView source={{ uri: item.html_url }} />;
}

MyWeb.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      item: PropTypes.shape({
        html_url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
