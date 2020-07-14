// Use external crate for WASM integration
extern crate wasm_bindgen;

// Import from the prelude directory
use wasm_bindgen::prelude::*;

// Use the WASM package to be able to call the JavaScript alert method from rust
#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

// Setup the button click method to use the JavaScript alert to display a message to the user
#[wasm_bindgen]
pub fn rust_alert() {
    alert("Hello World from Rust!");
}