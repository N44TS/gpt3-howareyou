import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState, useEffect } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [value, setValue] = useState(5);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI... ring ring")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
    console.log("Value", userInput)

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied... heeeey", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  }

  return (
    <div className="root">
      <Head>
        <title>Feel Better</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>just checking in...</h1>
          </div>
          <div className="header-subtitle">
            <h2>On a scale of 1 - 10, how is your mental health feeling today?</h2>
          </div>
        </div>

        <div className="prompt-container">
  {/* <Slider/> */}
        <input
        className="slider"
        type="range"
        min="1"
        max="10"
        value={userInput}
        onChange={onUserChangedText}
      />
       <div class="slider-text">
    <span>feel the total worst</span>
    <span>{userInput}</span>
    <span>I feel great</span>
  </div>
     {/* Textbox */}
          {/* <textarea 
          className="prompt-box"
          placeholder="insert number between 1 - 10 here. 1 = worst 10 = best"
          value={userInput}
          onChange={onUserChangedText}
          /> */}
          <div className="prompt-buttons">
            <a 
              className={isGenerating ? 'generate-button loading' : 'generate-button'} 
              onClick={callGenerateEndpoint}>
              <div className="generate">
                {/* //loading spinner */}
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Thanks for looking after your mental health</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
