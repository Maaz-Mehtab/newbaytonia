import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './reducer';


export const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['AuthReducers']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store)

export default store;