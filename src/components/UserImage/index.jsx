import styles from './styles.module.css';

const UserImage = ({
                       src,
                       alt,
                       width,
                       height,
                   }) => {
    return (<>
        <img className={styles.userImage} src={src} alt={alt} width={width} height={height}/>
    </>);
};

export default UserImage;
