'use client';

import { useRouter } from '@discussor/navigation';
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import './participantMediaVideo.css';

type Props = {
  conferenceToken: string;
};

export default function Conference({ conferenceToken }: Readonly<Props>) {
  const router = useRouter();

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={conferenceToken}
      serverUrl={process.env.NEXT_PUBLIC_LK_SERVER_URL}
      data-lk-theme='default'
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
      }}
      onDisconnected={() => {
        // @ts-ignore
        router.push('/');
      }}
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );

  return (
    <GridLayout tracks={tracks} style={{ minHeight: 0, gap: '24px' }}>
      <ParticipantTile />
    </GridLayout>
  );
}
