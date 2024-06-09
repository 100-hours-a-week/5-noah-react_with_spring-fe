import styles from './styles.module.css';

const MainContainer = ({children}) => {

    return (<div className={styles.mainContainer}>
        {children}
    </div>);
};

export default MainContainer;
