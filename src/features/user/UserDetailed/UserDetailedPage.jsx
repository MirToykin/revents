import React, {useEffect} from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment, Loader} from "semantic-ui-react";
import {connect} from "react-redux";
import {differenceInYears, format} from 'date-fns';
import {isLoaded} from 'react-redux-firebase'
import {firestoreConnect, isEmpty} from "react-redux-firebase";
import {compose} from "redux";
import {Link} from "react-router-dom";
import LazyLoad from 'react-lazyload'
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {getUserEvents} from "../userActions";

const mapState = (state, ownProps) => {
  let auth = state.firebase.auth;
  let userUid = null;
  let profile = {};
  let images = null;

  if (ownProps.match.params.id === auth.uid) {
    profile = state.firebase.profile;
    images = !isEmpty(state.firestore.ordered.authUserImages) && state.firestore.ordered.authUserImages;
  } else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
    images = state.firestore.ordered.images;
  }

  userUid = ownProps.match.params.id;

  return {
    auth,
    userUid,
    profile,
    images,
    requesting: state.firestore.status.requesting,
    events: state.events,
    eventsLoading: state.async.loading
  }
}

const actions = {
  getUserEvents
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
      },
      {
        collection: "users",
        doc: auth.uid,
        subcollections: [{collection: 'images'}],
        storeAs: 'authUserImages'
      }
    ]
  } else {
    return [
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{collection: 'images'}],
        storeAs: 'authUserImages'
      }
    ]
  }
}

const UserDetailedPage = ({profile, images, auth, match, requesting, userUid, getUserEvents, events, eventsLoading}) => {
  useEffect(() => {
    (async () => {
      const events = await getUserEvents(userUid);
      console.log(events);
    })();
  }, [userUid, getUserEvents])

  if (!isLoaded(profile) || !profile) return <Loader disabled/>

  const isCurrentUser = auth.uid === match.params.id;
  const loading = Object.values(requesting).some(a => a === true);

  if (loading) return <LoadingComponent inverted={false}/>

  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment loading={eventsLoading}>
          <Item.Group>
            <Item>
              <LazyLoad height={150} placeholder={<Item.Image src='/assets/user.png'/>}>
                <Item.Image avatar size='small' src={profile.photoURL || '/assets/user.png'}/>
              </LazyLoad>
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
          {isCurrentUser ?
            <Button as={Link} to={'/settings/basic'} color='teal' fluid basic content='Edit Profile'/> :
            <Button color='teal' fluid basic content='Follow user'/>
          }
        </Segment>
      </Grid.Column>

      {images && <Grid.Column width={12}>
        <Segment attached>
          <Header icon='image' content='Photos'/>

          <Image.Group size='small'>
            {images.map(img => (<LazyLoad key={img.name} height={150} offset={-150} placeholder={<Image src='/assets/user.png'/>}>
              <Image src={img.url} alt={img.name}/>
            </LazyLoad>))}
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
              {events && events.map(event => (
                <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                  <Image src={`/assets/categoryImages/${event.category}.jpg`}/>
                  <Card.Content>
                    <Card.Header textAlign='center'>
                      {event.title}
                    </Card.Header>
                    <Card.Meta textAlign='center'>
                      <div>{format(event.date && event.date.toDate(), 'dd LLL yyyy')}</div>
                      <div>{format(event.date && event.date.toDate(), 'h:mm a')}</div>
                    </Card.Meta>
                  </Card.Content>
                </Card>
              ))}
          </Card.Group>
        </Segment>
      </Grid.Column>
    </Grid>

  );
}

export default compose(
  connect(mapState, actions),
  firestoreConnect((args) => query(args))
)(UserDetailedPage);