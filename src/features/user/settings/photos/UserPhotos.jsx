import React from 'react';
import {Button, Card, Header, Image} from "semantic-ui-react";

const UserPhotos = ({profile, images, deleteImage}) => {
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
            <Card key={image.id}>
              <Image
                src={image.url}
              />
              <div className='ui two buttons'>
                <Button basic color='green'>Main</Button>
                <Button onClick={() => deleteImage(image)} basic icon='trash' color='red'/>
              </div>
            </Card>
          )
        })}
      </Card.Group>
    </>
  );
};

export default UserPhotos;
