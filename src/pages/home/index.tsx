import MoodSelect from '@/components/MoodSelect';
import { useMoodSettingStore } from '@/store/store';
import { ReactNode, useEffect, useState } from 'react';

export default function Home() {
  const { mood, findPlace } = useMoodSettingStore();
  return mood !== '' && findPlace ? <div>home</div> : <MoodSelect />;
}
