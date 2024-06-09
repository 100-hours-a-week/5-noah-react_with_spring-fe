import styles from './styles.module.css';
import BodyTitle from '../BodyTitle';
import LabeledInput from '../LabeledInput';
import HelperText from '../HelperText';
import SubmitInput from '../SubmitInput';
import LabeledTextarea from '../LabeledTextarea';
import MainContainer from '../MainContainer';
import Label from '../Label';
import useInput from '../../hooks/useInput';
import useValidation from '../../hooks/useValidation';
import useAllValid from '../../hooks/useAllValid';

// 이 컴포넌트에서만 사용하기 때문에 분리 X
const validateTitle = (title) => {
    if (title.length === 0 || !title) {
        return {
            status: false,
            message: '* 제목을 입력해주세요.',
        };
    } else if (title.length > 26) {
        return {
            status: false,
            message: '* 제목은 최대 26글자 입니다.',
        };
    } else {
        return {
            status: true,
            message: null,
        };
    }
};

// 이 컴포넌트에서만 사용하기 때문에 분리 X
const validateContent = (content) => {
    if (content.length === 0) {
        return {
            status: false,
            message: '* 내용을 입력해주세요.',
        };
    } else {
        return {
            status: true,
            message: null,
        };
    }
};

const EditPostForm = ({
                          bodyTitleText,
                          data,
                          onSubmit,
                      }) => {
    // 야매야매 코드
    let post;
    if (data) {
        post = JSON.parse(data);

        if (!post) {
            // 로딩 시
            post = {
                title: '',
                content: '',
            };
        }
    } else {
        // 새로운 게시글 생성 시
        post = {
            title: '',
            content: '',
        };
    }

    const {
        value: title,
        onChangeWithEvent: onChangeTitle,
    } = useInput(post.title);
    const {
        value: content,
        onChangeWithEvent: onChangeContent,
    } = useInput(post.content);

    const titleValidation = useValidation(title, validateTitle);
    const contentValidation = useValidation(content, validateContent);

    const isAllValid = useAllValid(titleValidation.isValid, contentValidation.isValid);

    return (<MainContainer>
        <BodyTitle text={bodyTitleText}></BodyTitle>
        <form className={styles.editPostForm} encType={'multipart/form-data'} onSubmit={onSubmit}>
            <LabeledInput labelText={'제목 *'} type={'text'} name={'title'} placeholder={'제목을 입력해주세요 (최대 26글자)'}
                          maxLength={26} onChange={onChangeTitle} value={title}/>
            <LabeledTextarea labelText={'내용 *'} textareaHeight={'300px'} name={'content'} placeholder={'내용을 입력해주세요'}
                             onChange={onChangeContent} value={content}/>
            <HelperText text={titleValidation.helperText || contentValidation.helperText}/>
            <Label labelText={'이미지'}/>
            <div className={styles.editPostFormInputImageContainer}>
                <input type={'file'} name={'image'}/>
            </div>
            <SubmitInput disabled={!isAllValid} value={'완료'}></SubmitInput>
        </form>
    </MainContainer>);
};

export default EditPostForm;
