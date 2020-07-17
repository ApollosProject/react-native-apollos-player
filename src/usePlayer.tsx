import { useContext } from 'react';
import { NowPlayingContext } from './context';

const usePlayer = () => useContext(NowPlayingContext);

export default usePlayer;
