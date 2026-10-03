import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';

// 7 phím đàn: tên nốt + màu sắc
const KEYS = [
  { label: 'Đô', color: '#E53935' },
  { label: 'Rê', color: '#FB8C00' },
  { label: 'Mi', color: '#FDD835' },
  { label: 'Fa', color: '#43A047' },
  { label: 'Sol', color: '#00ACC1' },
  { label: 'La', color: '#1E88E5' },
  { label: 'Si', color: '#8E24AA' },
];

// Bài "Twinkle Twinkle Little Star" (chỉ số phím, bắt đầu từ 0)
const SONG = [0, 0, 4, 4, 5, 5, 4, 3, 3, 2, 2, 1, 1, 0];
const NOTE_GAP = 450; // ms giữa 2 nốt

const haptic = (fn) => {
  try {
    fn();
  } catch (e) {}
};

export default function App() {
  // Mỗi phím một player. Gọi hook cố định 7 lần nên đúng quy tắc của React.
  const p0 = useAudioPlayer(require('./assets/note1.wav'));
  const p1 = useAudioPlayer(require('./assets/note2.wav'));
  const p2 = useAudioPlayer(require('./assets/note3.wav'));
  const p3 = useAudioPlayer(require('./assets/note4.wav'));
  const p4 = useAudioPlayer(require('./assets/note5.wav'));
  const p5 = useAudioPlayer(require('./assets/note6.wav'));
  const p6 = useAudioPlayer(require('./assets/note7.wav'));
  const players = [p0, p1, p2, p3, p4, p5, p6];

  const [activeKey, setActiveKey] = useState(null);
  const [playingSong, setPlayingSong] = useState(false);
  const timers = useRef([]);

  // Hàm phát âm thanh với đầu vào là số thứ tự của phím
  const playNote = useCallback(
    (index) => {
      const player = players[index];
      try {
        player.seekTo(0); // phát lại từ đầu để bấm nhanh vẫn nghe rõ
        player.play();
      } catch (e) {}

      haptic(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));

      setActiveKey(index);
      setTimeout(() => setActiveKey((cur) => (cur === index ? null : cur)), 200);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [p0, p1, p2, p3, p4, p5, p6]
  );

  // Tự chơi một bài hát mẫu
  const playSong = () => {
    if (playingSong) return;
    setPlayingSong(true);
    SONG.forEach((noteIndex, i) => {
      timers.current.push(setTimeout(() => playNote(noteIndex), i * NOTE_GAP));
    });
    timers.current.push(
      setTimeout(() => setPlayingSong(false), SONG.length * NOTE_GAP + 300)
    );
  };

  // Dọn timer khi thoát màn hình
  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#212121" />

      {/* AppBar */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Xylophone</Text>
        <Pressable
          onPress={playSong}
          disabled={playingSong}
          style={[styles.songButton, playingSong && styles.songButtonDisabled]}
        >
          <Text style={styles.songButtonText}>
            {playingSong ? 'Đang chơi...' : '▶ Bài mẫu'}
          </Text>
        </Pressable>
      </View>

      {/* Column + Expanded: mỗi phím chiếm đều chiều cao (flex: 1) */}
      <View style={styles.keys}>
        {KEYS.map((key, i) => (
          <Pressable
            key={key.label}
            onPress={() => playNote(i)}
            style={({ pressed }) => [
              styles.key,
              { backgroundColor: key.color },
              (pressed || activeKey === i) && styles.keyActive,
            ]}
          >
            <Text style={styles.keyText}>{key.label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  appBar: {
    height: 56,
    backgroundColor: '#212121',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 4,
  },
  appBarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  songButton: {
    backgroundColor: '#FFFFFF22',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  songButtonDisabled: {
    opacity: 0.5,
  },
  songButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  keys: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  key: {
    flex: 1, // tương đương Expanded
    marginVertical: 4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyActive: {
    opacity: 0.6,
    transform: [{ scale: 0.97 }],
  },
  keyText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowRadius: 4,
  },
});