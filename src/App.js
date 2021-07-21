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

  const handleChange = async (e) => {
    setsearchedgif(e.target.value);
    setSelectedGif("");
    const result = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=6zMcr6zKphIFS9tKAbSP5gPisXHuo58R&limit=10&q=${e.target.value}`
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
      alert("please fill both fields");
    } else {
      setPost((oldArr) => {
        return [...oldArr, content];
      });
      setSelectedGif("");
      setsearchedgif("");
      setText("");
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
                style={{ backgroundColor: "#1c73e6", color: "white" }}
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
          <div className="app__posts">
            {gifs &&
              gifs.map((item) => {
                return (
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
                );
              })}
          </div>
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
