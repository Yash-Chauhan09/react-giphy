import "./App.css";
import { Avatar, Button } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import Post from "./Post";
function App() {
  const [selectedgif, setSelectedGif] = useState("");
  const [searchedgif, setsearchedgif] = useState("");
  const [text, setText] = useState("");
  const [gifs, setGifs] = useState([]);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    setLoading(true);
    setsearchedgif(e.target.value);
    setSelectedGif("");
    const result = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=6zMcr6zKphIFS9tKAbSP5gPisXHuo58R&q=${e.target.value}`
    );
    setGifs(result.data.data);
    if (searchedgif === "") {
      setGifs([]);
    }
  };
  const handeSubmit = (e) => {
    e.preventDefault();
    let content = {
      text: text,
      image: selectedgif,
    };
    if (text === "" || selectedgif === "") {
      alert("please write something");
    } else {
      setPost((oldArr) => {
        setSelectedGif("");
        setsearchedgif("");
        return [...oldArr, content];
      });
    }
  };
  return (
    <div className="app">
      <header className="app__header">
        <h4>Giphyy</h4>
      </header>
      <div className="app__body">
        <div className="app__sender">
          <div className="app__senderTop">
            <Avatar />
            <form onSubmit={handeSubmit}>
              <input
                className="app__senderInput"
                type="text"
                placeholder="Share Something"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <input
                className="app__senderInput"
                type="text"
                placeholder="Search Gifs"
                value={searchedgif}
                onChange={handleChange}
              />
              <Button
                type="submit"
                size="small"
                color="primary"
                variant="contained"
              >
                Post
              </Button>
            </form>
          </div>
          {selectedgif && (
            <div className="app__senderBottom">
              <img src={selectedgif} alt="selected" />
            </div>
          )}
          {gifs &&
            gifs.map((item) => {
              return (
                <div className="app__sender">
                  <img
                    key={item.id}
                    src={item.images.fixed_height.url}
                    alt="searchedgif"
                    onClick={(e) => {
                      setGifs([]);
                      setsearchedgif("");
                      setSelectedGif(e.target.src);
                    }}
                  />
                </div>
              );
            })}
        </div>
        <div className="app__posts">
          {post.map((item) => (
            <Post key={item.id} text={item.text} imageUrl={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
