import React, { useEffect, useState } from 'react'
import './Post.css'
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { db } from './firebase';
import firebase from "firebase"

const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));  

function Post({user, username, imageUrl, caption, postId}) {
    const classes = useStyles();
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection("posts").doc(postId).collection("comments").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                setComments(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            })
        }

        return () => {
            unsubscribe()
        }
    }, [postId])

    const postComment = (e) => {
        e.preventDefault()
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setComment("")
    }

    return (
        <div className="post">
            {/* header => avatar + username */}
            <div className="post__header">
            <StyledBadge
                className="post__avatar"
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
                >
                <Avatar className={classes.small} >{username[0]}</Avatar>
            </StyledBadge>
                <h3>{username}</h3>
            </div>
            
            {/* post-image */}
            <img className="post__image" src={imageUrl} alt="" />
            {/* username: caption */}
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

            <div className="post__comments">
                {
                    comments.map(com => {
                        return <p key={com.id}>
                            <strong>{com.data.username}</strong>  {com.data.text}
                        </p>
                    })
                }
            </div>

            {user && 
                <form className="post__commentbox">
                    <input className="post__input"
                    placeholder="Add a comment..."
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}/>
                    <button type="submit" disabled={!comment} className="post__button" onClick={postComment}>Post</button>
                </form>
            }
        </div>
    )
}

export default Post
