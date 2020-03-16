import {createContext} from 'react';

const CurrentUserContext = createContext(undefined);
/*undefined because there is no initial state for current user*/
export default CurrentUserContext;