import useNoBugUseEffect from "@/hooks/useNoBugUseEffect";
import { useState } from "react";

const OrderStatus = ({
    status
}) => {
    const [className, setClassName] = useState('')
    useNoBugUseEffect({
        functions:()=>{
            switch (status) {
                case 'pending':
                    setClassName('text-orange-500')
                    break;
                case 'completed':
                    setClassName('text-green-600')
                    break;
                case 'approved':
                    setClassName('text-blue-500')
                    break;
                case 'declined':
                    setClassName('text-red-600')
                    break;            
                default:
                    break;
            }
        },
        params: [status]
    })
    return <span className={`uppercase font-bold ${className}`}>
        {status}
    </span>;
}
 
export default OrderStatus;