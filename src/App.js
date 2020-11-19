import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import {db} from './firebase'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

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
  const [modalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const list = db.collection("posts").onSnapshot(snapshot => {
      setposts(snapshot.docs.map(doc => ({id:doc.id, post:doc.data()})))
    })
    return list
  }, [])

  const signUp = (event) => {
    event.preventDefault()
    setOpen(false)
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes2.paper}>
          <form>
          <center>
            <img className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="logo"/>

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
            <Button type="submit" onClick={signUp}>Sign up</Button>
          </center>
        
          </form>
        </div>
      </Modal>
      {/*Header */}
      <div className="app__header">
        <img className="app__headerImage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="logo"/>
      </div>

      <Button onClick={() => setOpen(true)}>Sign up</Button>
      
      {/*Posts */}
      <div className="app__posts">
        {
          posts.map(({id, post}) => {
            return <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          })
        }
      </div>



      {/*Add post */}
    </div>
  );
}

export default App;
