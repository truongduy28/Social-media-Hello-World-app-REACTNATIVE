import {View, Text} from 'react-native';
import React from 'react';
import TabFeed from './TabFeed';
import TabFollower from './TabFollower';
import TabFollowing from './TabFollowing';
import TabAbout from './TabAbout';

const ProfileBody = ({tabState, profile, auth, rootState}) => {
  const {tab} = tabState;

  switch (tab) {
    case 'Posts':
      return <TabFeed state={{profile, auth}} />;
    case 'Followers':
      return (
        <TabFollower
          auth={auth}
          profile={profile}
          rootState={rootState}
          tab={tab}
        />
      );
    case 'Followings':
      return (
        <TabFollowing
          auth={auth}
          profile={profile}
          rootState={rootState}
          tab={tab}
        />
      );
    default:
      return <TabAbout profile={profile} />;
  }
};

export default ProfileBody;
