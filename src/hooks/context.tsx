import { AppDispatch, RootState } from '../redux/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Edge } from 'react-native-safe-area-context';
import { createContext } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type SafeAreaEdges = Edge[];

export const SafeAreaEdgesContext = createContext<{
  safeAreaEdges: SafeAreaEdges;
  setSafeAreaEdges: React.Dispatch<React.SetStateAction<SafeAreaEdges>>;
} | null>(null);
