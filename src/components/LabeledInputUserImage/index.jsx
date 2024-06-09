import styles from './styles.module.css';
import {useEffect, useState} from 'react';

const DEFAULT_USER_IMAGE_PATH = '/etc-images/sign-up-default-background-image.png';

const LabeledInputUserImage = ({
                                   name,
                                   defaultUserImageSrc,
                                   onChange,
                               }) => {
    const initialImageSrc = defaultUserImageSrc || DEFAULT_USER_IMAGE_PATH;

    const [imageSrc, setImageSrc] = useState(initialImageSrc);

    const handleChangeUserImage = (event) => {
        if (!event.target.files) {
            setImageSrc(initialImageSrc);
            onChange(null);
            return;
        }

        const userImage = event.target.files[0];

        if (!userImage) {
            setImageSrc(initialImageSrc);
            onChange(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            if (typeof fileReader.result === 'string') {
                setImageSrc(fileReader.result);
                onChange(userImage);
            }
        };

        fileReader.readAsDataURL(userImage);
        onChange(null);
    };

    useEffect(function updateUserImage() {
        setImageSrc(initialImageSrc);
    }, [initialImageSrc]);

    return (<>
        <label htmlFor={name} className={styles.imageContainer}>
            <img className={styles.previewImage} src={imageSrc} alt={'사용자 사진'}/>
            <span className={styles.hoverText}>변경</span>
        </label>
        <input className={styles.input} id={name} type={'file'} onChange={handleChangeUserImage}/>
    </>);
};

export default LabeledInputUserImage;
