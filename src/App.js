import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import {db, auth} from './firebase'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
// import InstagramEmbed from 'react-instagram-embed'; 

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles2 = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {  
  const classes2 = useStyles2();
  const [posts, setposts] = useState([])
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [modalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser){
        console.log(authUser)
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [user, username])

  useEffect(() => {
    const list = db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setposts(snapshot.docs.map(doc => ({id:doc.id, post:doc.data()})))
    })
    return () => {
      list()
    }
  }, [])

  const signUp = (event) => {
    event.preventDefault()

    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch(error => alert(error.message))
    setOpen(false)
  }

  const signIn = (event) => {
    event.preventDefault()

    auth.signInWithEmailAndPassword(email, password)
    .catch(error => alert(error.message))

    
    setOpenSignIn(false)
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes2.paper}>
          <form className="app__signup">
          <center>
            <img className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="logo"/>
          </center>
          
          <Input
            type='text'
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}  />
            <Input
            type='email'
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  />
            <Input
            type='password'
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  />
            <Button type="submit" onClick={signUp}>Sign Up</Button>        
          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes2.paper}>
          <form className="app__signup">
          <center>
            <img className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="logo"/>
          </center>
          
          <Input
            type='email'
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  />
            <Input
            type='password'
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  />
            <Button type="submit" onClick={signIn}>Sign In</Button>        
          </form>
        </div>
      </Modal>
      
      
      {/*Header */}
      <div className="app__header">
        <img className="app__headerImage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="logo"/>

        {user ?
        <Button onClick={() => auth.signOut()}>Logout</Button> :
        <div>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>}
      </div>
      
      
      {/*Posts */}
      <div className="app__posts">
        <div className="app__postsleft">
          {
            posts.map(({id, post}) => {
              return <Post key={id} user={user} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            })
          }
        </div>
        {/* <div className="app__postsright">
          <InstagramEmbed
            url='https://instagr.am/p/Zw9o4/'
            clientAccessToken='123|456'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div> */}

      </div>


      {/*Add post */}
      {user?.displayName ?
      <ImageUpload username={user.displayName} /> :
      <h3 style={{textAlign: "center"}}>You need to login to upload</h3>}
    </div>
  );
}

export default App;
