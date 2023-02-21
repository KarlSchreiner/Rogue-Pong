//this file handles the observer pattern by allowing for 
//the creating of and subscription to events for any
//components to utilize on a global level

function subscribe(eventName : string, listener : any) {
    console.log("I sm the subscribe function")
    document.addEventListener(eventName, listener);
}

function unsubscribe(eventName : string, listener : any) {
    document.removeEventListener(eventName, listener);
}

// create a new event given a name and any params (passed into data as a JS object)
// todo make every event its own file with data object its own interface  
function publish(eventName : string, data : object) {
    const event = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe};