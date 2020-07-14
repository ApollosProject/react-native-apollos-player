import { NativeModules } from 'react-native';

type ApollosPlayerType = {
  multiply(a: number, b: number): Promise<number>;
};

const { ApollosPlayer } = NativeModules;

export default ApollosPlayer as ApollosPlayerType;
