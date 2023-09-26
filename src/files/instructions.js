import React from 'react';
import { moodThresholds } from './constants';

const Instructions = () => { // Assuming moodThresholds is passed as a prop
    return (
        <div className='instructions'>
            <h1>Instructions</h1>
            <ul>
                <li>Press Start.</li>
                <li>Press "Heat Up" button to increase the temperature.</li>
                <li>Press "Cool Down" button to decrease the temperature.</li>
                <li>The weather will change every 7 seconds.</li>
                <li>Your job is to keep the emoji alive till the end of the day.</li>
            </ul>

            <h1>Weather Modes</h1>
            <ul>
                <li>Super Hot: +5 degrees per second</li>
                <li>Hot: +2 degrees per second</li>
                <li>Cold: -2 degrees per second</li>
                <li>Super Cold: -5 degrees per second</li>
            </ul>

            <h1>Temperature Ranges</h1>
            <ul>
                <li>Super Hot: {moodThresholds[moodThresholds.length - 1].threshold}°F and above</li>
                <li>Hot: {moodThresholds[moodThresholds.length - 2].threshold}°F to {moodThresholds[moodThresholds.length - 1].threshold}°F</li>
                <li>Neutral: {moodThresholds[2].threshold}°F to {moodThresholds[3].threshold}°F</li>
                <li>Cold: {moodThresholds[1].threshold}°F to {moodThresholds[2].threshold}°F</li>
                <li>Super Cold: Below {moodThresholds[1].threshold}°F</li>
            </ul>

        </div>
    );
}

export default Instructions;
