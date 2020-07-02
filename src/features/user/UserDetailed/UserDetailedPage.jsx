import React from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment, Loader} from "semantic-ui-react";
import {connect} from "react-redux";
import {differenceInYears, format} from 'date-fns';
import {isLoaded} from 'react-redux-firebase'
import {firestoreConnect, isEmpty} from "react-redux-firebase";
import {compose} from "redux";
import {Link} from "react-router-dom";

const mapState = (state, ownProps) => {
  let auth = state.firebase.auth;
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === auth.uid) {
    profile = state.firebase.profile;
  } else {
    userUid = ownProps.match.params.id;
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
  }

  return {
    auth,
    userUid,
    profile,
    images: state.firestore.ordered.images,
  }
}

const query = ({auth, userUid}) => {
  if (userUid) {
    return [
      {
        collection: 'users',
        doc: userUid,
        storeAs: 'profile'
      },
      {
        collection: 'users',
        doc: userUid,
        subcollections: [{collection: 'images'}],
        storeAs: 'images'
      }
    ]
  } else {
    return [
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{collection: 'images'}],
        storeAs: 'images'
      }
    ]
  }
}

const UserDetailedPage = ({profile, images}) => {
  if (!isLoaded(profile) || !profile) return <Loader disabled/>

  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image avatar size='small' src={profile.photoURL || '/assets/user.png'}/>
              <Item.Content verticalAlign='bottom'>
                <Header as='h1'>{profile.displayName.split(' ')[0]}</Header>
                <br/>
                <Header as='h3'>{profile.occupation}</Header>
                <br/>
                <Header
                  as='h3'>{profile.dateOfBirth ? differenceInYears(new Date(), profile.dateOfBirth.toDate()) : 'Unknown age'},
                  Lives in Solar System, Milky Way</Header>
              </Item.Content>
            </Item>
          </Item.Group>

        </Segment>
      </Grid.Column>
      <Grid.Column width={12}>
        <Segment>
          <Grid columns={2}>
            <Grid.Column width={10}>
              <Header icon='smile' content={profile.displayName}/>
              <p>I am a: <strong>{profile.occupation}</strong></p>
              <p>Originally from <strong>Milky Way</strong></p>
              <p>Member Since: <strong>{format(profile.createdAt.toDate(), 'LLLL do, yyyy')}</strong></p>
              <p>{profile.about}</p>

            </Grid.Column>
            <Grid.Column width={6}>

              <Header icon='heart outline' content='Interests'/>
              <List>
                {profile.interests && profile.interests.map(int => (
                  <Item key={int}>
                    <Icon name='heart'/>
                    <Item.Content>{int}</Item.Content>
                  </Item>
                ))}
              </List>
            </Grid.Column>
          </Grid>

        </Segment>
      </Grid.Column>
      <Grid.Column width={4}>
        <Segment>
          <Button as={Link} to={'/settings/basic'} color='teal' fluid basic content='Edit Profile'/>
        </Segment>
      </Grid.Column>

      {images && <Grid.Column width={12}>
        <Segment attached>
          <Header icon='image' content='Photos'/>

          <Image.Group size='small'>
            {images.map(img => (<Image key={img.name} src={img.url} alt={img.name}/>))}
          </Image.Group>
        </Segment>
      </Grid.Column>}

      <Grid.Column width={12}>
        <Segment attached>
          <Header icon='calendar' content='Events'/>
          <Menu secondary pointing>
            <Menu.Item name='All Events' active/>
            <Menu.Item name='Past Events'/>
            <Menu.Item name='Future Events'/>
            <Menu.Item name='Events Hosted'/>
          </Menu>

          <Card.Group itemsPerRow={5}>

            <Card>
              <Image src={'/assets/categoryImages/drinks.jpg'}/>
              <Card.Content>
                <Card.Header textAlign='center'>
                  Event Title
                </Card.Header>
                <Card.Meta textAlign='center'>
                  28th March 2018 at 10:00 PM
                </Card.Meta>
              </Card.Content>
            </Card>

            <Card>
              <Image src={'/assets/categoryImages/drinks.jpg'}/>
              <Card.Content>
                <Card.Header textAlign='center'>
                  Event Title
                </Card.Header>
                <Card.Meta textAlign='center'>
                  28th March 2018 at 10:00 PM
                </Card.Meta>
              </Card.Content>
            </Card>

          </Card.Group>
        </Segment>
      </Grid.Column>
    </Grid>

  );
}

export default compose(
  connect(mapState),
  firestoreConnect((args) => query(args))
)(UserDetailedPage);