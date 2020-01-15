import React from 'react';
import Dropzone from 'react-dropzone';

const UploadMultiImage = props => {
    const { listImage = [], onDrop = {} } = props;

    const onDropListItem = (acceptedFiles, rejectedFiles) => {
        const imagePreview = acceptedFiles[0];
        onDrop([...listImage, imagePreview]);
    }
    return (
        <div className='row' style={{ margin: 0 }}>
            {
                listImage.map(item => (
                    <div className='col-md-2 col-lg-2 col-sm-2'
                        style={{ position: 'relative' }}
                        key={Math.random()}>
                        <i className={`deleteIconItemImage fa fa-minus-circle`}
                            onClick={index => onDrop(listImage.filter(i => i.preview !== item.preview), item.preview)}
                        />
                        <div
                            className="dropzoneItemSlider"
                            style={{
                                backgroundImage: `url(${item.preview})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '100% 100%',
                                zIndex: '1',
                                align: "center"
                            }}
                        />
                    </div>
                ))
            }
            <div className='col-md-2 col-lg-2 col-sm-2'>
                <Dropzone
                    className="dropzoneItemSlider"
                    accept="image/jpeg, image/png"
                    onDrop={onDropListItem} >
                    <p>Drop or Select a file to upload.</p>
                </Dropzone>
            </div>
        </div>
    )
}

export default UploadMultiImage;