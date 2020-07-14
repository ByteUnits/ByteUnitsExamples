// HelloWorld.rs

// Import threading packages
use std::thread;
use std::time::Duration;

// Main function
fn main() {
    // Create a new thread
    let handle = thread::spawn(|| {
        // Inside of a closure count from 1 to 10 and print the message
        for i in 1..10 {
            println!("Hello World! {} from spawned thread!", i);
            thread:: sleep(Duration::from_millis(1)); // Wait for a milisecond
        }
    });

    // On the main thread count from 1 to 5 at the same time
    for i in 1..5 {
        println!("Hello World! {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }

    // This holds the main thread until the spawned thread has completed
    handle.join().unwrap();
}