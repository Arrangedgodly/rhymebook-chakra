import { Spinner } from '@chakra-ui/react';

function Loading() {
    return (
        <div className='Loading'>
            <Spinner width={250} height={250} speed='0.25s'/>
        </div>
    );
}

export default Loading;