import React, {Component, createRef} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class CropperInput extends Component {
  cropper = createRef();

  cropImage = () => {
    const {setImage} = this.props;

    if (typeof this.cropper.current.getCroppedCanvas() === 'undefined') {
      return
    }

    this.cropper.current.getCroppedCanvas().toBlob(blob => {
      setImage(blob);
    })
   }

  render() {
    const {previewImage} = this.props;
    return (
      <Cropper
        ref={this.cropper}
        src={previewImage}
        style={{height: 200, width: '100%'}}
        aspectRatio={1}
        preview='.img-preview'
        viewMode={1}
        dragMode='move'
        guides={false}
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}
        crop={this.cropImage} />
    );
  }
}

export default CropperInput;