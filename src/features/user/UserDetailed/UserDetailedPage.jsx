import React from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment, Loader} from "semantic-ui-react";
import {connect} from "react-redux";
import {differenceInYears, format} from 'date-fns';
import { isLoaded } from 'react-redux-firebase'

const mapState = (state) => ({
  profile: state.firebase.profile
})

const UserDetailedPage = ({profile}) => {
  if (!isLoaded(profile)) return <Loader disabled/>

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
                <Header as='h3'>{profile.dateOfBirth ? differenceInYears(new Date(), profile.dateOfBirth.toDate()) : 'Unknown age'}, Lives in Solar System, Milky Way</Header>
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
              <p>Description of user</p>

            </Grid.Column>
            <Grid.Column width={6}>

              <Header icon='heart outline' content='Interests'/>
              <List>
                <Item>
                  <Icon name='heart'/>
                  <Item.Content>Interest 1</Item.Content>
                </Item>
                <Item>
                  <Icon name='heart'/>
                  <Item.Content>Interest 2</Item.Content>
                </Item>
                <Item>
                  <Icon name='heart'/>
                  <Item.Content>Interest 3</Item.Content>
                </Item>
              </List>
            </Grid.Column>
          </Grid>

        </Segment>
      </Grid.Column>
      <Grid.Column width={4}>
        <Segment>
          <Button color='teal' fluid basic content='Edit Profile'/>
        </Segment>
      </Grid.Column>

      <Grid.Column width={12}>
        <Segment attached>
          <Header icon='image' content='Photos'/>

          <Image.Group size='small'>
            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
          </Image.Group>
        </Segment>
      </Grid.Column>

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

export default connect(mapState)(UserDetailedPage);