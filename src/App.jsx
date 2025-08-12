import { useState, useEffect } from 'react'
import cueLogo from './assets/idea.gif'
import btnLogo from './assets/pencil.png'
import Typewriter from 'typewriter-effect'
import Category from './Category.jsx'
import Complexity from './Complexity.jsx'
import Mood from './Mood.jsx'
import Footer from './Footer.jsx'
import './App.css'


function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [prompt, setPrompt] = useState(null);
  const [promptTyped, setPromptTyped] = useState(false);

  const [topic, setTopic] = useState(null);
  const [complexity, setComplexity] = useState(null);
  const [mood, setMood] = useState(null);

  const handleCueClick = () => {
    setPrompt("loading prompt ...")
    setPromptTyped(true);
    console.log("Calling API with topic:", topic);
    console.log("Calling API with complexity:", complexity);
    console.log("Calling API with mood:", mood);
    if (!topic || !complexity || !mood) {
      console.log("Make all selections first.");
      return;
    }
    fetch('http://127.0.0.1:5000/api/gen_prompt', {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ currTopic: topic, currComplexity: complexity, currMood: mood })
    }).then(res => res.json())
      .then(data =>  {
        console.log("Data: ", data);
        setPrompt(data["prompt"]);
        setPromptTyped(true);
      });
  };


  useEffect(() => { // Fetch Time API Call
    fetch('/api/time')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data);
        setCurrentTime(data.time);
      });
  }, []);

  // useEffect(() => { // Fetch Prompt API Call
  //   fetch('/api/prompt')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("Fetched prompt:", data);
  //       setPrompt(data[0]);
  //     });
  // }, []);

  return (
    <>
      <div className="page-container">
        <div className="content">
          <div className="title">
            <img src={cueLogo} className="cuelogo" alt="cuelogo" />
            <h1>DRAW<br/><span style={{color: '#32cccd'}}>CUE</span></h1>
          </div>
          <div className="card">

            <div className="select-card">
              <div className="select-container">
                <div className="select-item"><Category active={topic} setActive={setTopic}/></div>
                <div className="select-item"><Complexity active={complexity} setActive={setComplexity}/></div>
                <div className="select-item"><Mood active={mood} setActive={setMood}/></div>
              </div>
            </div>

            <div className="button-container">
              <button className="cue-btn" onClick={handleCueClick}>
                <p className="btn-text">CUE PROMPT ...</p>
                <img src={btnLogo} className="btnlogo" alt="cuelogo" />
              </button>
            </div>
            <div className="prompt-container">
              <p className="prompt">
                {promptTyped && prompt ? (
                  <Typewriter
                    key={prompt}
                    onInit={(typewriter) => {
                      typewriter.typeString('"' + prompt + '"').start();
                    }}
                    options={{
                      // strings: [prompt.text], autoStart: true, loop: false,
                      delay: 50
                    }}
                  />
                ) : ( ('loading prompt ...') ) }</p> 
            </div>      
          </div>
        </div>
      </div>
      <br></br>
      <div className="footer-wrapper"><Footer/></div>
    </>
  )
}

export default App
