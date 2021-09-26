import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [text, setText] = useState('Intuitive design happens when target knowledge.');
  const [author, setAuthor] = useState('Jared Spool');

  function generateQuote() {
    axios.get("http://localhost:5000/", { crossdomain: true }).then(response => {
      setText(response.data.text);
      setAuthor(response.data.author);
    });
  }

  function copyQuote() {
    let element = document.getElementById("quote");
    var range, selection;

    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    try {
      document.execCommand('copy');
    }
    catch (err) {
      alert('An Error Occured While Copying Text');
    }
  }

  return (
    <div className="App">
      <div className="blockquote-wrapper">
        <div className="blockquote">
          <h1>
            <span id={'quote'}>{text}</span>
          </h1>
          <h4>—{author}<br /><em></em></h4>
          <div className={'center'}>
            <button onClick={generateQuote} className={'button'}>GENERATE</button>
            <a href={`https://twitter.com/intent/tweet/?text=` + text} target={'_blank'} className={'button m-0 mt-1'}>Twitter&nbsp;</a>
            <button onClick={copyQuote} className={'button m-0 mt-1'}>COPY IT!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;