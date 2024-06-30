import styles from './styles.module.css';
import MainContainer from '../MainContainer';
import Post from '../Post';
import CommentContainer from '../CommentContainer';

const PostContainer = ({
                           isSigned,
                           signedNickname,
                           data,
                       }) => {

    const post = JSON.parse(data);

    return (<MainContainer>
        <div className={styles.postContainer}>
            {post && <Post id={post.id} postTitle={post.title}
                           authorImageSrc={`${post.authorImageUrl}`}
                           authorName={post.authorName}
                           createdDate={post.createdDate}
                           postImageSrc={post.imageUrl ? `${post.imageUrl}` : ''}
                           postContent={post.content}
                           views={post.views} comments={post.comments}></Post>}
            {post && <CommentContainer postId={post.id} isSigned={isSigned} signedNickname={signedNickname}/>}
        </div>
    </MainContainer>);
};

export default PostContainer;
