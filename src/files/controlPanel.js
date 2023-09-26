import React from 'react';
import { WEATHER_ICONS, MOOD_ICONS, weatherHash } from './constants';

const ControlPanel = ({
    simRunning,
    regulateTemp,
    toggleSim,
    testSubjectMood,
    testSubjectTemp,
    weatherMode,
    dayMinutes,
    showChange
}) => {

    console.log("Rendered Mood:", testSubjectMood);

    return (
        <div className="Big-container">

            {/* Day Progress */}
            <div id='day-title'>Day Progress:</div>
            <div className="Day-progress-container">
                <div style={{ width: `${dayMinutes * 2}%` }} className="Day-progress-bar"></div>
            </div>

            {/* weather-temp-mood */}
            <div className="weather-temp-mood">

                {/* Weather Display */}
                <div className="weather-section">
                    <h2>Weather</h2>
                    <div style={{ fontSize: '6em', position: 'relative' }}>
                        {WEATHER_ICONS[weatherMode]}
                        <span className={`temp-change ${showChange ? "fade-out" : ""}`}>
                            {weatherHash[weatherMode] > 0 ? `+${weatherHash[weatherMode]}` : weatherHash[weatherMode]}
                        </span>
                    </div>
                </div>

                {/* Test Subject's Temperature */}
                <div className='temp-day'>
                    <h1>{testSubjectTemp.toFixed(1)}°F</h1>
                </div>

                {/* Test Subject's Mood */}
                <div className="testsubject-section">
                    <h2>Test Subject</h2>
                    <div style={{ fontSize: '6em' }}>
                        {MOOD_ICONS[testSubjectMood]}
                    </div>
                </div>
            </div>

            {/* Simulation and Temperature Control Buttons */}
            <div className='buttons'>
                <button className='cool' onClick={() => regulateTemp('cool')} disabled={!simRunning}>Cool Down</button>
                <button onClick={toggleSim}>
                    {simRunning ? 'Stop Simulation' : 'Start Simulation'}
                </button>
                <button className='heat' onClick={() => regulateTemp('heat')} disabled={!simRunning}>Heat Up</button>
            </div>
        </div>
    );
};

export default ControlPanel;
