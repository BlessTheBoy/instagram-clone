import { useState } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [posts, setposts] = useState([    
    {
      username: "Faruq",
      imageUrl: ".\\images\\pedro-lastra-Nyvq2juw4_o-unsplash.jpg",
      caption: "Enjoying a beautiful view"
    },
    {
      username: "BlessTheBoy",
      imageUrl: ".\\images\\simon-zhu-4hluhoRJokI-unsplash.jpg",
      caption: "Building an instagram clone"
    }
  ])
  return (
    <div className="app">
      {/*Header */}
      <div className="app__header">
        <img className="app__headerImage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="logo"/>
      </div>
      <h1>Hello World</h1>      

      
      {/*Posts */}
      <div>
        {
          posts.map(post => {
            return <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          })
        }
      </div>



      {/*Add post */}
    </div>
  );
}

export default App;
