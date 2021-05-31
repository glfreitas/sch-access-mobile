import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

import Main from './pages/Main';
import QrScaner from './pages/QrScaner';
import List from './pages/List';
import Sync from './pages/Sync';
//import SurveyCompleted from './pages/SurveyCompleted';

const Routes = createAppContainer(
    createAnimatedSwitchNavigator({
        Main,
        QrScaner,
        List,
        Sync
    },
        {
            transition: (
                <Transition.Together>
                    <Transition.Out
                        type="slide-bottom"
                        durationMs={400}
                        interpolation="easeIn"
                    />
                    <Transition.In type="fade" durationMs={500} />
                </Transition.Together>
            ),
        })
);

export default Routes;