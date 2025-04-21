import { Button } from "@material-tailwind/react";
import PageNavigations from "../../components/PageNavigations";
import withEnterKeyHandler from '../../components/withEnterKeyHandler';

const InstructionsPage2 = ({ nextStep , previousStep}) => {

  const handleResponse = (response) => {
    nextStep();
  }

  return (
    <div className="max-w-6xl mx-auto p-8 text-left text-xl"
    style={{marginBottom: '1.2vw', fontSize: '1em', lineHeight: '1.3',  maxWidth: '60vw' }}
    >
      <div className="flex flex-col items-start"
      style={{ textAlign: 'left', marginBottom: '1.2vw', fontSize: '0.7em', lineHeight: '1.3',  maxWidth: '60vw' }}
      > 
      <p tabIndex= {0} className="mb-4">
        As you evaluate each image, you might consider different ways of maneuvering around a barrier depending on your ability and the perceived problem. So, to consider if something is passable, please think about what you would be capable of doing in real life. For example:
      </p>
      <ul tabIndex= {0} className="list-disc list-inside mb-4">
        <li>If you can <b>make it down the curb to the street</b>, then you might consider this a passable barrier</li>
        <li>If you can <b>squeeze by</b> to the left side of the pole, then you might also consider this a passable barrier</li>
        <li>But if you do not think you can comfortably pass this barrier, then you would mark <b>no</b>.</li>
      </ul>
      </div>
      <div className="mt-12 mb-16">
        <img src={`${process.env.PUBLIC_URL}/img/example-scenarios.png`} alt="Example barriers and whether people can pass them or not. " />
      </div>
      <div className="flex justify-end items-center">
        <Button  style={{fontSize: '0.7em'}} size="lg" color="teal" onClick={handleResponse}>Continue</Button>
        <span className="text-w ml-4 text-teal-700">press Enter ↵</span>
      </div> 
      <PageNavigations onPrevious={previousStep} onNext={nextStep} /> 
      </div>
  );
};

export default withEnterKeyHandler(InstructionsPage2);
