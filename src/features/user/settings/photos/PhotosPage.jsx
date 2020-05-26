import React, {useEffect, useState} from 'react';
import {Segment, Header, Divider, Grid, Button} from 'semantic-ui-react';
import DropzoneInput from "./DropzoneInput";
import CropperInput from "./CropperInput";
import {connect} from "react-redux";
import {deleteImage, uploadProfileImage} from "../../userActions";
import {toastr} from 'react-redux-toastr';
import {compose} from 'redux';
import {firestoreConnect} from "react-redux-firebase";
import UserPhotos from "./UserPhotos";

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  images: state.firestore.ordered.images
})

const actions = {
  uploadProfileImage,
  deleteImage
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

const PhotosPage = ({uploadProfileImage, profile, images, deleteImage}) => {
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
      handleCancelCrop();
      toastr.success('Success', 'Image has been uploaded');
    } catch(error) {
      console.log(error);
      toastr.error('Oops', 'Something went wrong')
    }
  }

  const handleDeleteImage = async (photo) => {
    try {
      await deleteImage(photo);
    } catch (error) {
      toastr.error('Oops', error.message)
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
      <UserPhotos profile={profile} images={images} deleteImage={handleDeleteImage}/>
    </Segment>
  );
}

export default compose(
  connect(mapState, actions),
  firestoreConnect(auth => query(auth))
)(PhotosPage);