import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { Devices } from '@phosphor-icons/react';

const MobileWarningModal = ({ onClose }) => (
  <Dialog open={true} handler={onClose} size="sm" className="max-w-sm mx-auto text-2xl">
    <DialogHeader>
      <span className="flex items-center">
        <Devices size={32} weight="bold" className="mr-2" />
        Looks like you're on your phone!
      </span>
    </DialogHeader>
    <DialogBody>
      For the best experience and most accurate results, we recommend completing this survey on a computer, laptop, or tablet. 
    </DialogBody>
    <DialogFooter>
      <Button color="teal" onClick={onClose}>
        Close
      </Button>
    </DialogFooter>
  </Dialog>
);

export default MobileWarningModal;
