import React, {useEffect, useState} from 'react';
import {Image, Segment, Header, Divider, Grid, Button, Card} from 'semantic-ui-react';
import DropzoneInput from "./DropzoneInput";
import CropperInput from "./CropperInput";
import {connect} from "react-redux";
import {uploadProfileImage} from "../../userActions";
import {toastr} from 'react-redux-toastr';
import {compose} from 'redux';
import {firestoreConnect} from "react-redux-firebase";

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
})

const actions = {
  uploadProfileImage
}

const query = ({auth}) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{collection: 'images'}],
      storeAs: 'images'
    }
  ]
}

const PhotosPage = ({uploadProfileImage}) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [files]);

  const handleUploadImage = async () => {
    try {
      await uploadProfileImage(image, files[0].name);
      toastr.success('Success', 'Image has been uploaded');
    } catch(error) {
      console.log(error);
      toastr.error('Oops', 'Something went wrong')
    }
  }

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  }

  return (
    <Segment>
      <Header dividing size='large' content='Your Photos'/>
      <Grid>
        <Grid.Row/>
        <Grid.Column width={4}>
          <Header color='teal' sub content='Step 1 - Add Photo'/>
          <DropzoneInput setFiles={setFiles}/>
        </Grid.Column>
        <Grid.Column width={1}/>
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 2 - Resize image'/>
          {files.length > 0 && <CropperInput previewImage={files[0].preview} setImage={setImage}/>}
        </Grid.Column>
        <Grid.Column width={1}/>
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 3 - Preview and Upload'/>
          {
            files.length > 0 &&
              <>
                <div
                  style={{
                    minHeight: '200px',
                    minWidth: '200px',
                    maxWidth: '200px',
                    overflow: 'hidden'
                  }}
                  className='img-preview'
                />
                <Button.Group>
                  <Button onClick={handleUploadImage} style={{width: '100px'}} positive icon='check'/>
                  <Button onClick={handleCancelCrop} style={{width: '100px'}} icon='close'/>
                </Button.Group>
              </>
          }
        </Grid.Column>

      </Grid>

      <Divider/>
      <Header sub color='teal' content='All Photos'/>

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
          <Button positive>Main Photo</Button>
        </Card>

        <Card>
          <Image
            src='https://randomuser.me/api/portraits/men/20.jpg'
          />
          <div className='ui two buttons'>
            <Button basic color='green'>Main</Button>
            <Button basic icon='trash' color='red'/>
          </div>
        </Card>
      </Card.Group>
    </Segment>
  );
}

export default compose(
  connect(mapState, actions),
  firestoreConnect(auth => query(auth))
)(PhotosPage);