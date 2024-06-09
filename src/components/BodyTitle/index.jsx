import styles from './styles.module.css';

const BodyTitle = ({text}) => {

    return (<>
        <p className={styles.bodyTitleText}>{text}</p>
    </>);
};

export default BodyTitle;
