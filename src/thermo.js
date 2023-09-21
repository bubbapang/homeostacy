import React, { useState, useEffect } from 'react';
import success from './sounds/success.mp3';
import failure from './sounds/failure.mp3';

const Thermo = () => {
    const [simRunning, setSimRunning] = useState(false);
    const [dayProgressValue, setDayProgressValue] = useState(0);
    const [girlTemp, setGirlTemp] = useState(98.6);
    const [girlMood, setGirlMood] = useState('neutral');
    const [weatherMode, setWeatherMode] = useState('neutral');
    const [isGameOver, setIsGameOver] = useState(false);

    const successSound = new Audio(success);
    const failureSound = new Audio(failure);

    // use effects
    // mood based on temp
    useEffect(() => {
        setGirlMood(getMoodBasedOnTemp(girlTemp));
    }, [girlTemp]);

    useEffect(() => {

        let dayProgressTimer;
        let weatherModeTimer;

        const dayRate = 1000;
        const weatherRate = 7000;

        if (simRunning) {
            dayProgressTimer = setInterval(() => {
                updateDayProgress();
                updateGirlTemp();
            }, dayRate);

            weatherModeTimer = setInterval(() => {
                changeWeather();
            }, weatherRate);
        }
        return () => {
            clearInterval(dayProgressTimer);
            clearInterval(weatherModeTimer);
        };
    }, [simRunning, weatherMode]);  // Notice the addition of weatherMode here

    useEffect(() => {
        setGirlMood(getMoodBasedOnTemp(girlTemp));
        if (girlMood === 'dead') {
            gameOver();
        }
    }, [girlTemp]);

    // sim funcs
    const toggleSimulation = () => {
        const newSimRunningState = !simRunning;
        setSimRunning(newSimRunningState);

        // pick a random weather mode and change it immediately when the sim starts
        if (newSimRunningState) {
            changeWeather();
        }
    };

    const updateDayProgress = () => {
        // progress the day
        const progVal = 2.0
        setDayProgressValue(prevValue => {
            const dayThreshold = 100;
            if (prevValue >= dayThreshold) {
                endOfDay();
                return 0;
            }
            return prevValue + progVal;
        });
        updateGirlTemp();
    };

    const resetSimulation = () => {
        setSimRunning(false);
        setDayProgressValue(0);
        setGirlTemp(98.6);
        setGirlMood('neutral');
        setWeatherMode('neutral');
    };

    const endOfDay = () => {
        const soundToPlay = ['super cold', 'cold', 'hot', 'super hot'].includes(girlMood) ? failureSound : successSound;
        soundToPlay.play().catch((e) => console.error(`Couldn't play sound:`, e));
        resetSimulation();
    };

    const gameOver = () => {
        setSimRunning(false);  // Stop the simulation
        setGirlMood('dead');  // Set the mood to dead
        alert('Game Over');  // Display a game-over message
    };

    // weather funcs
    const changeWeather = () => {
        // initialize weather modes
        // pick a random weather mode
        // set the weather mode

        const modes = ['super cold', 'cold', 'hot', 'super hot'];
        const randomIndex = Math.floor(Math.random() * modes.length);

        const newMode = modes[randomIndex]

        setWeatherMode(newMode);
    };

    // emojina funcs
    const updateGirlTemp = () => {
        const weatherHash = { 'super cold': -0.5, 'cold': -0.2, 'hot': 0.2, 'super hot': 0.5 };

        setGirlTemp(prevTemp => {
            const rateOfChange = weatherHash[weatherMode];
            const newTemp = prevTemp + rateOfChange;
            if (newTemp <= 80 || newTemp >= 120) {  // Adjust these values as you see fit
                gameOver();
            }
            return newTemp;
        });
    };

    const getMoodBasedOnTemp = (temp) => {
        const moods = [
            { min: -Infinity, max: 80, mood: 'dead' },  // Add "dead" condition
            { min: 80, max: 85, mood: 'super cold' },
            { min: 85, max: 90, mood: 'cold' }, 

            { min: 90, max: 100, mood: 'neutral' },

            { min: 100, max: 105, mood: 'hot' },
            { min: 105, max: 110, mood: 'super hot' },
            { min: 110, max: Infinity, mood: 'dead' }  // Add "dead" condition
        ];
        const mood = moods.find(({ min, max }) => temp >= min && temp < max).mood;
        return mood;
    };

    const regulateTemperature = action => {
        const rateOfChange = 0.2;
        setGirlTemp(prevTemp => prevTemp + (action === 'heat' ? rateOfChange : -rateOfChange));
    };

    return (
        <div className="Thermo-container">
            {/* Simulation and Temperature Control Buttons */}
            <div className='buttons'>
                <button className='cool' onClick={() => regulateTemperature('cool')}disabled={!simRunning}>Cool Down</button>
                <button onClick={toggleSimulation}>
                    {simRunning ? 'Stop Simulation' : 'Start Simulation'}
                </button>
                <button className='heat' onClick={() => regulateTemperature('heat')} disabled={!simRunning}>Heat Up</button>
            </div>

            {/* weather-temp-mood */}
            <div className="weather-temp-mood">
                {/* Weather Display */}
                <div className="weather-section">
                    <h2>Weather</h2>
                    <div style={{ fontSize: '3em' }}>
                        {{ 'neutral': '☁️', 'super cold': '❄️', 'cold': '⛷️', 'hot': '🏖️', 'super hot': '☀️' }[weatherMode]}
                    </div>
                </div>

                {/* Girl's Temperature */}
                <div className='temp-day'>
                    <h1>{girlTemp.toFixed(1)}°F</h1>
                </div>

                {/* Girl's Mood */}
                <div className="girl-section">
                    <h2>Homeostacy Emojina</h2>
                    <div style={{ fontSize: '5em' }}>
                        {{ 'neutral': '👧', 'super cold': '🧊', 'cold': '🥶', 'hot': '🥵', 'super hot': '🔥', 'dead': '💀'}[girlMood]}
                    </div>
                    {girlMood === 'dead' && <h3>Game Over</h3>}
                </div>
            </div>

            {/* Day Progress */}
            <div>Day Progress:</div>
            <div className="Day-progress-container">
                <div style={{ width: `${dayProgressValue}%` }} className="Day-progress-bar"></div>
            </div>
        </div>
    );
};

export default Thermo;