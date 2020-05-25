import React from 'react';
import {Button, Card, Header, Image} from "semantic-ui-react";

const UserPhotos = ({profile, images}) => {
  let filteredImages;

  if (images) {
    filteredImages = images.filter(image => image.url !== profile.photoURL);
  }

  return (
    <>
      <Header sub color='teal' content='All Photos'/>
      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src={profile.photoURL}/>
          <Button positive>Main Photo</Button>
        </Card>

        {filteredImages && filteredImages.map(image => {
          return (
            <Card>
              <Image
                src={image.url}
              />
              <div className='ui two buttons'>
                <Button basic color='green'>Main</Button>
                <Button basic icon='trash' color='red'/>
              </div>
            </Card>
          )
        })}
      </Card.Group>
    </>
  );
};

export default UserPhotos;
