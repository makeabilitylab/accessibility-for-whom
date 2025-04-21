import { Button } from "@material-tailwind/react";
import withEnterKeyHandler from '../../components/withEnterKeyHandler';

const IntroPage = ({ nextStep }) => {

  return (
    <div className="max-w-6xl mx-auto p-8 text-left"
    style={{ textAlign: 'left', marginBottom: '1.2vw', fontSize: '0.75em', lineHeight: '1.3' }}
    >
     <h1 
     aria-live="assertive" 
     tabIndex={0}
     style={{ textAlign: 'left', marginBottom: '1.2vw', fontSize: '1.5em', fontWeight: '600' }}>
        Welcome to our study on mobility devices and sidewalk accessibility!
      </h1>
      <div className="mb-4" tabIndex={0} >
        <img src={`${process.env.PUBLIC_URL}/img/label-examples.png`} alt="Example images of sidewalk barriers" />
      </div>
      <p className="mb-4" tabIndex={0} >
        In this survey, we will ask you about <b>your perceptions of various sidewalk barriers</b> such as obstacles and surface similar to the images above. Our goal is to understand how people using different mobility devices perceive barriers in urban environments.
      </p>
      <p className="mb-4" tabIndex={0}>
        You may <b>save your responses</b> when prompted and come back at a later time. Your responses will be kept confidential and will be used for research purposes only.
      </p>
      <p className="mb-4" tabIndex={0}>
      Each valid survey response will be compensated with <b>$10</b>, available as either a Tango e-gift card or a check.
      </p>
      <p className="mb-16" tabIndex={0}>
        This work is led by researchers from the University of Washington. If you have any questions, please contact: <a href="mailto:chuchuli@cs.uw.edu" className="text-cyan-800 underline">chuchuli@cs.uw.edu</a>.
      </p>
      <div className="flex justify-end items-center">
        <Button style={{fontSize: '0.7em'}} size="lg" color="teal" onClick={nextStep}>Let’s get started</Button>
        <span className="text-w ml-4 text-teal-700">press Enter ↵</span>
      </div>
    </div>
  );
};

export default withEnterKeyHandler(IntroPage);
