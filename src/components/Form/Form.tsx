import React, { useEffect, useState } from 'react';
import { IGrammarPoint } from '../../Utilities/interfaces';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import './Form.css';
import infoIcon from '../../assets/info_icon.svg';

// MOCK DATA
import mockPrompt from '../../sampleData/prompt';
import Instructions from '../Instructions/Instructions';

// MOCK PATH
const mockData = mockPrompt.data.attributes;
const mockGrammar = mockData.grammar_points;

const Form = () => {
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imgAlt, setImgAlt] = useState<string>('')
  const [verb, setVerb] = useState<string>('');
  const [engVerb, setEngVerb] = useState<string>('');
  const [grammarPoints, setGrammarPoints] = useState<IGrammarPoint[]>([]);
  const [sent1, setSent1] = useState<string>('');
  const [sent2, setSent2] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    //fetch new challenge someday
    setImgUrl(mockData.image_url);
    setImgAlt(mockData.image_alt_text);
    setVerb(mockData.verb);
    setEngVerb(mockData.eng_verb);
    setGrammarPoints(mockGrammar);
  }, []);

  return (
    <form>
      <img alt={imgAlt} src={imgUrl} className='prompt-img'/>
      <div className='form-container'>
        <h2>{verb}</h2>
        <h3>{engVerb}</h3>
        <img src={infoIcon} alt='instructions icon' onClick={() => setModal(true)} />
        {grammarPoints.length && <label htmlFor='sent1'>{grammarPoints[0].grammar_point} | {grammarPoints[0].eng_grammar_point}</label>}
        <textarea
          id='sent1'
          value={sent1}
          placeholder='Enter your sentence'
          onChange={event => setSent1(event.target.value)}
        />
        {grammarPoints.length && <label htmlFor='sent2'>{grammarPoints[1].grammar_point} | {grammarPoints[1].eng_grammar_point}</label>}
        <textarea
          id='sent2'
          value={sent2}
          placeholder='Enter your sentence'
          onChange={event => setSent2(event.target.value)}
        />
      <button>Submit</button>
      </div>
      <PureModal
        className='custom-modal'
        header="Instructions"
        width="50%"
        isOpen={modal}
        closeButton="X"
        closeButtonPosition="header"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <Instructions />
      </PureModal>
    </form>
  );
}

export default Form;