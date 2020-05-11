import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { LoadingIndicator } from './styles';

export default function Loading(props) {
  const { loading } = props;

  if (!loading) {
    return <></>;
  }
  return (
    <LoadingIndicator>
      <ActivityIndicator size="large" color="#7159c1" />
    </LoadingIndicator>
  );
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};
