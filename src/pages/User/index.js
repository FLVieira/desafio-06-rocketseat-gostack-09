import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    stars: [],
    loading: false,
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadStarred();
  }

  loadStarred = async () => {
    try {
      const { page, stars } = this.state;
      const { route } = this.props;
      const { user } = route.params;

      this.setState({ loading: true });

      // Paginating Starred
      const newStarred = await api.get(
        `/users/${user.login}/starred?page=${page}`
      );
      const { data } = newStarred;

      if (page === 1) {
        this.setState({ stars: [...data], loading: false, page: page + 1 });
      } else {
        this.setState({
          // eslint-disable-next-line react/destructuring-assignment
          stars: [...stars, ...data],
          loading: false,
          page: page + 1,
        });
      }
    } catch (err) {
      this.setState({ loading: false });
    }
  };

  renderFooter = () => {
    const { loading } = this.state;
    if (!loading) return null;
    return (
      <View>
        <ActivityIndicator size="large" color="#7159c1" />
      </View>
    );
  };

  refreshList = () => {
    this.setState({ page: 1 });
    const { stars } = this.state;
    const pageOneStars = stars.slice(0, 29);
    this.setState({ stars: [...pageOneStars] });
  };

  handleWebView = (item) => {
    const { navigation } = this.props;
    navigation.navigate('WebView', {
      item,
      title: item.full_name,
    });
  };

  render() {
    const { stars, refreshing } = this.state;
    const { route } = this.props;
    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={(start) => String(start.id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.handleWebView(item)}>
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            </TouchableOpacity>
          )}
          onEndReachedThreshold={0.2}
          onEndReached={this.loadStarred}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.refreshList}
          refreshing={refreshing}
        />
      </Container>
    );
  }
}

User.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.shape({
        login: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
