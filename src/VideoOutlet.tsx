import * as React from 'react';
import { PortalDestination } from './portals';

import { NowPlayingContext } from './context';

let playerIdCount = 0;
let players: Array<string> = [];

const VideoOutlet: React.FunctionComponent = () => {
  const { setPlayerId } = React.useContext(NowPlayingContext);

  const playerId = React.useMemo(() => {
    playerIdCount += 1;
    return `videoOutlet-${playerIdCount}`;
  }, []);

  React.useEffect(() => {
    players.push(playerId);
    setPlayerId(playerId);
    return () => {
      players = players.slice(0, players.indexOf(playerId));
      setPlayerId(players[players.length - 1]);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <PortalDestination name={playerId} />;
};

export default VideoOutlet;
