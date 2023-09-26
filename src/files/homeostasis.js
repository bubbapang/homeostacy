import React, { useState, useEffect } from 'react';
import { WEATHER_ICONS, moodRanges, weatherHash } from './constants';

// import Instructions from './instructions';
import ControlPanel from './controlPanel';

const Homeostasis = () => {
    // state
    const [simRunning, setSimRunning] = useState(false);
    const [dayMinutes, setDayMinutes] = useState(0);
    const [weatherMode, setWeatherMode] = useState('neutral');
    const [testSubjectTemp, setTestSubjectTemp] = useState(98.6);
    const [testSubjectMood, setTestSubjectMood] = useState('neutral');
    const [showChange, setShowChange] = useState(false);
    // const [gameOutcome, setGameOutcome] = useState(null); // "win", "lose", or null

    // weather without neutral
    const weatherModes = Object.keys(WEATHER_ICONS).filter(mode => mode !== 'neutral');
    const weatherFactor = 10; // how often weather changes, in minutes

    // day
    const dayLength = 50; // how long day is
    const dayMinuteRate = 3.0 // how MUCH each increment
    const simSpeed = 1000; // how FAST each increment comes, in milliseconds

    // player
    const playerInputRate = 1.0;

    ////////////////////////////////////////////////////////////////////////////////

    // weather funcs
    const changeWeather = () => {
        // pick out a random weather mode, not including the current weather mode
        const modes = weatherModes.filter(mode => mode !== weatherMode);
        // get a random index
        const randomIndex = Math.floor(Math.random() * modes.length);
        // set the new weather mode, based on the random index
        const newMode = modes[randomIndex]
        setWeatherMode(newMode);
    };

    // sim funcs
    const endGame = () => {
        // console.log("End Game Temperature:", testSubjectTemp);
        // console.log("Determined Game Outcome:", gameOutcome);

        // // set gameOutcome based on testSubjectTemp and show gameOutcome message
        // if (testSubjectTemp >= 90 && testSubjectTemp < 100) {
        //     setGameOutcome('win');
        // } else {
        //     setGameOutcome('lose');
        // }

        // stop simulation
        setSimRunning(false);

        // reset simulation
        setTimeout(() => resetSimulation(), 3000); // Reset after 3 seconds
    };

    const toggleSim = () => {
        resetSimulation();
        changeWeather();
        // toggle simRunning
        const newSimRunningState = !simRunning;
        setSimRunning(newSimRunningState);
    };

    const passTime = () => {
        // increment dayMinutes
        setDayMinutes(prevValue => {
            // init newTime
            const newTime = prevValue + dayMinuteRate;
            // check if day is over, if so, end day
            if (newTime >= dayLength) {
                endGame();
            }
            // check if weather needs to change, if so, change weather
            if (newTime % weatherFactor === 0) {
                changeWeather();
            }
            // return newTime
            return newTime;
        });
    };

    const resetSimulation = () => {
        // reset back to initial values
        setSimRunning(false);
        setDayMinutes(0);
        setWeatherMode('neutral');
        setTestSubjectTemp(98.6);
        setTestSubjectMood('neutral');
        setShowChange(false);
        // setGameOutcome(null);
    };

    const updateTemp = () => {
        // update testSubjectTemp based on weatherMode
        setTestSubjectTemp(prevTemp => {
            // find rateOfChange
            const rateOfChange = weatherHash[weatherMode] || 0;  // Fallback to 0 if undefined

            // get newTemp
            const newTemp = Math.round(prevTemp + rateOfChange);

            return newTemp;
            
        });

        setShowChange(false);
        setTimeout(() => setShowChange(true), 300);  // Hide after 1 second
    };

    const regulateTemp = action => {
        // update testSubjectTemp based on action
        setTestSubjectTemp(prevTemp => Math.round(prevTemp + (action === 'heat' ? playerInputRate : -playerInputRate)));
    };

    // emoji funcs
    const getMood = (temperature) => {
        for (let range of moodRanges) {
            if (temperature >= range.start && temperature <= range.end) {
                return range.mood;
            }
        }
        return 'unknown'; // fallback case, shouldn't be hit with properly defined ranges
    }

    ///////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        let timer;

        // if simRunning, start timer
        if (simRunning) {
            // set timer to passTime every simSpeed
            timer = setInterval(() => {
                passTime();
            }, simSpeed);
        }

        // Return a cleanup function that clears the timer
        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [simRunning]);

    useEffect(() => {
        updateTemp();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dayMinutes]);

    // // when temp changes, check if mood needs to change
    useEffect(() => {
        const newMood = getMood(testSubjectTemp);
        setTestSubjectMood(newMood);
    }, [testSubjectTemp]);

    ///////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className='ult'>

            <ControlPanel
                simRunning={simRunning}
                regulateTemp={regulateTemp}
                toggleSim={toggleSim}
                testSubjectMood={testSubjectMood}
                testSubjectTemp={testSubjectTemp}
                weatherMode={weatherMode}
                dayMinutes={dayMinutes}
                showChange={showChange}
            />

            {/* {gameOutcome && (
                <div className={`game-outcome ${gameOutcome}`}>
                    {gameOutcome === 'win' ? 'Congratulations! The Test Subject Survived!' : 'Sorry! You Lost the Test Subject!'}
                </div>
            )} */}
        </div>
    );
};

export default Homeostasis;