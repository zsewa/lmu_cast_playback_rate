// ==UserScript==
// @name            LMU Cast Custom Playback Rate
// @namespace       https://github.com/zsewa
// @version         0.2
// @description     Set the playback rate for LMU Cast videos
// @author          Zeno Sewald

// @match           https://cast.itunes.uni-muenchen.de/*

// @grant GM_setValue
// @grant GM_getValue
// @grant GM_registerMenuCommand
// ==/UserScript==

function savePreferredPlaybackRate(factor) {
    // save last known playback rate
    GM_setValue('lmu_cast_playback_rate', factor)
    
    console.log("Set preferred playback rate to " + factor);
}

function setPlaybackRateTo(factor) {
    let video_element = document.getElementsByTagName("video")[0];
    video_element.playbackRate = factor;

    console.log("Changed playback rate to " + factor);
}

function setToSavedPlaybackRate() {
    // get default or saved playback rate value
    const DEFAULT_PLAYBACK_RATE = 1;
    let playback_rate = GM_getValue('lmu_cast_playback_rate', DEFAULT_PLAYBACK_RATE);

    setPlaybackRateTo(playback_rate);
}

function askForCustomRate() {
    let playback_rate = prompt("Playback rate", "1");
    return playback_rate;
}

(function() {
    'use strict';

    // set playback rate afer a short delay
    const DELAY = 2500; // delay in ms
    window.setTimeout(setToSavedPlaybackRate, DELAY);

    // register menu entries
    GM_registerMenuCommand('Set custom playback rate', function() {
        let playback_rate = askForCustomRate();
        setPlaybackRateTo(playback_rate);
    });
    GM_registerMenuCommand('Playback x0.75', function() {
        setPlaybackRateTo(0.75);
    });
    GM_registerMenuCommand('Playback x1', function() {
        setPlaybackRateTo(1);
    });
    GM_registerMenuCommand('Playback x1.25', function() {
        setPlaybackRateTo(1.25);
    });
    GM_registerMenuCommand('Playback x1.5', function() {
        setPlaybackRateTo(1.5);
    });
    GM_registerMenuCommand('Playback x2', function() {
        setPlaybackRateTo(2);
    });
    GM_registerMenuCommand('Set preferred playback rate', function() {
        let playback_rate = askForCustomRate();
        savePreferredPlaybackRate(playback_rate);
    });
})();
