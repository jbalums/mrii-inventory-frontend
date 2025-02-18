
import { toast } from "react-toastify";

const ClickToCopy = ({text}) => {

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            console.log("Copied to clipboard!");
          }).catch(() => {
            console.log("Failed to copy!");
          });
    };
    return ( <div title={text} 
        onClick={handleCopy}>
            {text}
    </div> );
}
 
export default ClickToCopy;